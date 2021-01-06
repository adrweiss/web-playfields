import mongoose from 'mongoose';
import { mongodbConfig } from '../config/mongo.db.config.js'
import blogPost from '../models/blog.model.js';

const mongo = mongoose.connect(mongodbConfig.connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

function getPost(req, res, next) {
  blogPost.find((err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(200).send(data)
    }
  })
}

function getAmount(req, res, next) {
  blogPost.countDocuments({}, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })
}

function deletePost(req, res, next) {
  return res.status(200).send({ message: "Delte Post." });
}

function writePost(req, res, next) {
  const dbCard = req.body;

  blogPost.create(dbCard, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(201).send(data)
    }
  })
}

const homeController = {
  getPost,
  getAmount,
  deletePost,
  writePost
};

export default homeController;