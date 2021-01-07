import mongoose from 'mongoose';
import { mongodbConfig } from '../config/mongo.db.config.js'
import blogPost from '../models/blog.model.js';
import { db } from '../models/index.js'
import { format } from 'date-fns';

const User = db.user;

const mongo = mongoose.connect(mongodbConfig.connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

function getPost(req, res, next) {
  User.findAll({
    attributes: ['id', 'username']
  }).then(user => {
    const users = user.map(user => {
      return [user.id, user.username]
    })

    blogPost.find({},
      ['title', 'date', 'userid'],
      {
        skip: req.body.skip,
        limit: req.body.limit,
        sort: {
          date: -1
        },
      },
      function (err, docs) {
        const resObj = docs.map(doc => {
          let username = users.find(element => element[0] === doc.userid)
          if (username) {
            username = username[1]
          } else {
            username = null
          }

          return Object.assign(
            {},
            {
              id: doc._id,
              userid: username,
              title: doc.title,
              date: format(doc.date, 'dd.MM.yyy hh:mm')
            }
          )
        })
        res.status(200).send(resObj)
      })
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
  blogPost.findById(req.body.postId,
    function (err, doc) {
      if (err) {
        return res.status(400).send({ message: "Post not found." })
      }
      if (!req.userId === doc.userid) {
        return res.status(400).send({ message: "The user has not the right to delete a post from another user." })
      }

      blogPost.remove({ _id: req.body.postId }, function (err) {
        if (!err) {
          return res.status(200).send({ message: "Post was deleted." });
        }
        return res.status(400).send({ message: "Deletion was not successfull." })
      });
    }
  )
}

function deleteAnyPost(req, res, next) {
  blogPost.remove({ _id: req.body.postId }, function (err) {
    if (!err) {
      return res.status(200).send({ message: "Post was deleted." });
    }
    return res.status(400).send({ message: "Deletion was not successfull." })
  });
}

function writePost(req, res, next) {
  if (!req.body.title) {
    return res.status(400).send({ message: "No Title was provided." })
  }

  if (!req.body.body) {
    return res.status(400).send({ message: "No Post was provided." })
  }

  var dbCard = {}
  if (req.userId) {
    dbCard = {
      "userid": req.userId,
      "title": req.body.title,
      "body": req.body.body
    }
  } else {
    dbCard = {
      "userid": null,
      "title": req.body.title,
      "body": req.body.body
    }
  }

  blogPost.create(dbCard, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(201).send({ message: "Successfull posted." })
    }
  })
}

const homeController = {
  getPost,
  getAmount,
  deletePost,
  deleteAnyPost,
  writePost
};

export default homeController;