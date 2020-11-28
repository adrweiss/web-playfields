import express from "express"
import Cors from 'cors';
//import pgClient from './pgQueries.js'
import {getUsers} from './pgQueries.js'
import {getUserById} from './pgQueries.js'
import {createUser} from './pgQueries.js'
import {updateUser} from './pgQueries.js'
import {deleteUser} from './pgQueries.js'



// APP Config 
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());


// DB config 
//const  getUsers = pgClient.getUsers

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Health'));
  // For PostgreSQL
app.get('/users', getUsers)//(req, res) => {console.log('Test-1');getUsers})
app.get('/users/:id', getUserById)
app.post('/users', createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));
