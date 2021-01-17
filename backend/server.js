import express from "express"
import Cors from 'cors';
import bodyParser from 'body-parser';

import { db, dataDevInit, dataProdInit } from './src/models/index.js'

import { routsUsr } from './src/routes/user.routes.js';
import { authRoutes } from './src/routes/auth.routes.js';
import { routsMgtRoles } from './src/routes/mgt.role.routes.js';
import { routsMgtUsers } from './src/routes/mgt.users.routes.js';
import { routsViews } from './src/routes/view.routes.js';
import { routsMgt } from './src/routes/mgt.routes.js';
import { routsHome } from './src/routes/home.routes.js'

import { initialNoSQLLoad } from './src/models/initial.noSQL.load.js'

// APP Config 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8001;
const mode = process.env.PLAYFIELD

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config 
if (mode === 'dev') {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop table and Resync Db');
        dataDevInit();
    });
    initialNoSQLLoad.insertPosts()
} else if (mode === 'prod') {
    db.sequelize.sync({ force: false }).then(() => {
        console.log('Load data for production mode');
        dataProdInit();
    });
} else {
    console.log('No database mode set.')
}

// API Endpoints
app.get('/api/', (req, res) => res.status(200).send('Health'));

routsUsr(app)
authRoutes(app)
routsMgtRoles(app)
routsMgtUsers(app)
routsViews(app)
routsMgt(app)
routsHome(app)

// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));