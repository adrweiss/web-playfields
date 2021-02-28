import { db, mongodb } from '../models/index.js'
import { format } from 'date-fns';

const User = db.user;
const BlogPost = mongodb.blogPost;
const Description = mongodb.description;

function getPost(req, res, next) {
  User.findAll({
    attributes: ['id', 'username']
  }).then(user => {
    const users = user.map(user => {
      return [user.id, user.username]
    })

    BlogPost.find({blocked: false},
      ['title', 'date', 'body', 'userid', 'reported', 'solved'],
      {
        skip: parseInt(req.query.skip),
        limit: parseInt(req.query.limit),
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
              username: username,
              userid: doc.userid,
              body: doc.body,
              title: doc.title,
              reported: doc.reported,
              solved: doc.solved,               
              date: format(doc.date, 'dd.MM.yyy HH:mm')
            }
          )
        })
        res.status(200).send(resObj)
      })
  })
}

function getDescriptions(req, res, next) {
  Description.find({}, 
    ['_id', 'serial_number', 'title', 'body'],
    {sort: {
      serial_number: 1
    }}, 
  function (err, docs) {
    if (!err) {
      return res.status(200).send(docs)
    }
    else {
      return res.status(400).send({ message: "An error has occurred." })
    }
  });
}

function getAmount(req, res, next) {
  BlogPost.countDocuments({blocked: false}, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })
}

function deletePost(req, res, next) {
  BlogPost.findById(req.body.postId,
    function (err, doc) {
      if (err) {
        return res.status(400).send({ message: "Post not found." })
      }
      if (!req.userId === doc.userid) {
        return res.status(400).send({ message: "The user has not the right to delete a post from another user." })
      }

      BlogPost.deleteOne({ _id: req.body.postId }, function (err) {
        if (!err) {
          return res.status(200).send({ message: "Post was deleted." });
        }
        return res.status(400).send({ message: "Deletion was not successfull." })
      });
    }
  )
}

function deleteAnyPost(req, res, next) {
  BlogPost.deleteOne({ _id: req.body.postId }, function (err) {
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

  BlogPost.create(dbCard, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(201).send({ message: "Successfull posted." })
    }
  })
}

function EditAnyPost(req, res, next) {
  if (!req.body.title) {
    return res.status(400).send({ message: "No Title was provided." })
  }

  if (!req.body.body) {
    return res.status(400).send({ message: "No Post was provided." })
  }

  BlogPost.updateOne({
    '_id': req.body.postId,
  },
    {
      'body': req.body.body,
      'title': req.body.title,
      'changed': true
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No post in database found.' }) };
      if (doc.nModified === 0 && doc.n === 1) { return res.status(400).send({ message: 'Post already updated.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

function EditPost(req, res, next) {
  if (!req.body.title) {
    return res.status(400).send({ message: "No Title was provided." })
  }

  if (!req.body.body) {
    return res.status(400).send({ message: "No Post was provided." })
  }

  BlogPost.updateOne({
    $and: [{
      '_id': req.body.postId,
      'userid': req.userId,
      'solved': false,
      'changed': false
    }]
  },
    {
      body: req.body.body,
      title: req.body.title
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'Its not allowed to edit posts which are marked as solved or post not found.' }) };
      if (doc.nModified === 0 && doc.n === 1) { return res.status(400).send({ message: 'Post already updated.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const putReportPost = (req, res, next) => {
  BlogPost.updateOne({
    $and: [{
      '_id': req.body.postId,
    }]
  },
    {
      reported: true,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'Post not found.' }) };
      if (doc.nModified === 0 && doc.n === 1) { return res.status(400).send({ message: 'Post already reported.' }) };
      return res.status(200).send({ message: 'Succesfully reported.' });
    });
}

const homeController = {
  getPost,
  getAmount,
  getDescriptions,
  deletePost,
  deleteAnyPost,
  writePost,
  EditAnyPost,
  EditPost,
  putReportPost
};

export default homeController;