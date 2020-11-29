import express from "express"
import Cors from 'cors';
//import pgClient from './pgQueries.js'
import {getUsers} from './pgQueries.js'
import {getUserById} from './pgQueries.js'
import {getUserIdByEmail} from './pgQueries.js'
import {createUser} from './pgQueries.js'
import {updatePassword} from './pgQueries.js'
import {deleteUser} from './pgQueries.js'
import {closePool} from './pgQueries.js'



// APP Config 
import Mongo from "mongodb";
import bodyParser from 'body-parser';
import { time } from "console";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8001;

// Middlewares
app.use(Cors());
app.use(express.json());


// DB config 

const MongoClient = Mongo.MongoClient;
const uri = "mongodb+srv://admin:admin@cluster0.anvgz.mongodb.net/Posts?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useNewUrlParser: true });
// API Endpoints
app.get('/', (req, res) => res.status(200).send('Health'));
  // For PostgreSQL
app.get('/users', getUsers)//(req, res) => {console.log('Test-1');getUsers})
app.get('/usersId', getUserById)
app.get('/usersIdByEmail', getUserIdByEmail)
app.post('/users', createUser)
app.put('/users', updatePassword)
app.delete('/users', deleteUser)
app.put('/shutdown', closePool)

app.get('/getPage', (req, res)=>{
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    mongoClient.connect(err =>{
        const collection = mongoClient.db("Posts").collection("Posts");
        const cursor = collection.find().skip(query.skip).limit(query.limit).toArray(function(err, docs){
            res.status(200).send(docs);
        });
    });
app.get('/countPosts', (req, res)=>{
});
    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.countDocuments(function(err, countData){
            res.status(200).send(countData.toString());
        });
    });
});
app.delete('/delete', (req, res)=>{
    let id = new Mongo.ObjectID(req.query.id);
    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.deleteOne({"_id": id}, function(err, result){
            if (err) {
                res.status(500).send();
            }
            res.status(200).send("Successfully deleted Object");
        });
    });
});

app.get('/getOne', (req, res)=>{
    let id = new Mongo.ObjectID(req.query.id);
    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.findOne({"_id": id}, function(err, result){
            if (err) {
                res.status(500).send();
            }
            res.status(200).send(result);
        });
    });
});

app.post('/addPost', (req, res) => {
    let title = req.query.title;
    let content = req.query.content;
    let ID_USR = parseInt(req.query.ID_USR);
    let creationDate = new Date().toString();
    console.log("title: "+title);
    mongoClient.connect(err => {
        console.log(creationDate);
        const collection = mongoClient.db("Posts").collection("Posts");
        // perform actions on the collection object
        let obj = new Object();
        obj.title = title;
        obj.content = content;
        obj.ID_USR = ID_USR;
        obj.creationDate = creationDate;

        let string = JSON.stringify(obj);
        let json = JSON.parse(string);
        collection.insertOne(json);
      });
      res.status(201).send("created");
});


// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));