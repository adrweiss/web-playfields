import express from "express"
import Cors from 'cors';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';
import Cards from './post.js';

import { db, dataDevInit, dataProdInit } from './src/models/index.js'

import { routsUsr } from './src/routes/user.routes.js';
import { authRoutes } from './src/routes/auth.routes.js';
import { routsMgtRoles } from './src/routes/mgt.role.routes.js';
import { routsMgtUsers } from './src/routes/mgt.users.routes.js';
import { routsViews } from './src/routes/view.routes.js';
import { routsMgt } from './src/routes/mgt.routes.js';

// APP Config 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8001;
const mode = process.env.PLAYFIELD || 'dev'
const connection_url = `mongodb+srv://admin:Txnn7Uls6PrchoYG@cluster0.geqdu.mongodb.net/playfield`

// Middlewares
app.use(express.json());
app.use(Cors());

// DB config 
mongoose.connect(connection_url, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
  })


if (mode === 'dev') {
    db.sequelize.sync({ force: true }).then(() => {
        console.log('Drop table and Resync Db');
        dataDevInit(db.role, db.right, db.user, db.logs, db.deletedUser);
    });
} else if (mode === 'prod') {
    db.sequelize.sync({ force: false }).then(() => {
        console.log('Load data fro production mode');
        dataProdInit(db.role, db.right, db.user);
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



app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;
  
    Cards.create(dbCard, (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(201).send(data)
      }
    })
  })
  
  app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send(data)
      }
    })
  })

// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));