import express from "express"
import Cors from 'cors';

// APP Config 
const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors());


// DB config 

// API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello thats a health endpoint test.'));

// Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));
