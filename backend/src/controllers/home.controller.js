import mongoose from 'mongoose';
import blogPost from './blog.model.js';

const connection_url = `mongodb+srv://admin:Txnn7Uls6PrchoYG@cluster0.geqdu.mongodb.net/playfield`

const mongo = mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})