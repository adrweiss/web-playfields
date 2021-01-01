import express from "express"
import Cors from 'cors';
import bodyParser from 'body-parser';

import { db, dataDevInit, dataProdInit } from './src/models/index.js'

import { routsUsr } from './src/routes/user.routes.js';
import { authRoutes } from './src/routes/auth.routes.js';
import { routsMgtRoles } from './src/routes/mgt.role.routes.js';
import { routsMgtUsers } from './src/routes/mgt.users.routes.js';
import { routsViews } from './src/routes/view.routes.js';

//import pgClient from './pgQueries.js'
//import { getUsers, getUserById, getUserIdByEmail, createUser, updatePassword, deleteUser } from './src/pgQueries.js'
//import Mongo from "mongodb";
//import { format } from 'date-fns';
//import { time } from "console";

// APP Config 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8001;

console.log(process.env.PLAYFIELD)

// Middlewares
app.use(Cors());
app.use(express.json());

// DB config 
//const MongoClient = Mongo.MongoClient;
//const uri = "mongodb+srv://admin:admin@cluster0.anvgz.mongodb.net/Posts?retryWrites=true&w=majority";
//const mongoClient = new MongoClient(uri, { useNewUrlParser: true });

/*
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop table and Resync Db');
    dataDevInit(db.role, db.right, db.user, db.logs, db.deletedUser);
});
*/

db.sequelize.sync({force: true}).then(() => {
    console.log('Load data fro production mode');
    dataProdInit(db.role, db.right, db.user);
});


// API Endpoints
app.get('/api/', (req, res) => res.status(200).send('Health'));

routsUsr(app)
authRoutes(app)
routsMgtRoles(app)
routsMgtUsers(app)
routsViews(app)






/*
//For MongoDB
//Get Page NR {pagoNo} with {size} results.
app.get('/getPage', (req, res)=>{
    console.log("called getPage");
    
    let {pageNo, size}= req.query;
    pageNo = parseInt(pageNo);
    size = parseInt(size);
    //var pageNo = parseInt(req.body.pageNo);
    //var size = parseInt(req.body.size);
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response);
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    mongoClient.connect(err =>{
        const collection = mongoClient.db("Posts").collection("Posts");
        const cursor = collection.find().skip(query.skip).limit(query.limit).toArray(function(err, docs){
            res.status(200).send(docs);
        });
    });
});

app.get('/countPosts', (req, res)=>{

    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.countDocuments(function(err, countData){
            let obj = new Object();
            obj.count = countData;
            let string = JSON.stringify(obj);
            let json = JSON.parse(string);
            res.status(200).send(json);
        });
    });
});
//Delete Post with Database ID {id}
app.delete('/delete', (req, res)=>{
    const {id} = req.body;
    console.log(id);
    if(id == undefined){
        res.status(400).send();
        return;
    }
    let mongoId = new Mongo.ObjectID(id);
    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.deleteOne({"_id": mongoId}, (err, collection)=>{
            if (err) {
                res.status(500).send();
                return;
            }
            if(collection.deletedCount==1){
                res.status(200).send("Successfully deleted Object");
            }else{
                res.status(406).send("No Post with this Id found.")
            }
        });
    });
});

//Get one Post with Database Id {id}
app.get('/getOne', (req, res)=>{
    const {id} = req.body;
    if(id == undefined){
        res.status(400).send();
        return;
    }
    let mongoId = new Mongo.ObjectID(id);
    mongoClient.connect(err => {
        const collection = mongoClient.db("Posts").collection("Posts");
        collection.findOne({"_id": mongoId}, function(err, result){
            if (err) {
                res.status(500).send();
                return;
            }
            res.status(200).send(result);
        });
    });
});

//addPost {title}, {content}, {ID_USR}
app.post('/addPost', (req, res) => {
    let {title, content, ID_USR} = req.body;
    ID_USR = parseInt(ID_USR);
    let now = new Date();
    let creationDate = format(now, 'dd.MM.yyy');
    creationDate += " "+now.toLocaleTimeString()+"Uhr";
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
        collection.insertOne(json, function(err){
            if (err){
                console.log("Error while inserting new Post");
                console.log(err);
                res.status(500).send();
                return;
            }
            console.log("Successfully created Post");
            res.status(201).send("created");
        });
    
    });
});

*/
// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));