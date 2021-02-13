import request from 'request'
import { db, mongodb } from '../models/index.js'
import { format } from 'date-fns';

const User = db.user;
const InternalMessage = mongodb.internalMessage;
const BlogPost = mongodb.blogPost;

function buildProd(req, res, next) {
  request.get('http://192.168.0.59:8080/git/notifyCommit?url=github.com:adrweiss/playfield.git')
    .on('response', function (response) {
      return res.status(200).send({ message: "Build is triggered." });
    })
    .on('error', function (err) {
      return res.status(400).send({ message: "Build is not available." });
    })
}

const getContactMessages = (req, res, next) => {
  var query = {};
  query["type"] = "Contact";

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }

  InternalMessage.find(query,
    ['_id', 'solved', 'mail', 'reason', 'body', 'date'],
    {
      skip: 0,
      limit: 5,
      sort: {
        date: -1
      },
    },
    function (err, docs) {
      const resObj = docs.map(doc => {

        return Object.assign(
          {},
          {
            id: doc._id,
            reason: doc.reason,
            body: doc.body,
            mail: doc.maiö,
            solved: doc.solved,
            date: format(doc.date, 'dd.MM.yyy HH:mm')
          }
        )
      })
      res.status(200).send(resObj)
    })
}

const getAmountContactMessages = (req, res, next) => {
  var query = {};
  query["type"] = "Contact";

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }

  InternalMessage.countDocuments(query, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })
}

const setSolvedStatusContactMessages = (req, res, next) => {
  InternalMessage.updateOne({
    '_id': req.body.BugPost,
    'type': "Contact"
  },
    {
      solved: req.body.solvedStatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No Bug in database found.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const getPostedBugs = (req, res, next) => {
  var query = {};
  query["type"] = "Bug";

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }

  InternalMessage.find(query,
    ['_id', 'solved', 'mail', 'reason', 'body', 'date'],
    {
      skip: 0,
      limit: 5,
      sort: {
        date: -1
      },
    },
    function (err, docs) {
      const resObj = docs.map(doc => {

        return Object.assign(
          {},
          {
            id: doc._id,
            reason: doc.reason,
            body: doc.body,
            mail: doc.maiö,
            solved: doc.solved,
            date: format(doc.date, 'dd.MM.yyy HH:mm')
          }
        )
      })
      res.status(200).send(resObj)
    })
}

const getAmountPostedBugs = (req, res, next) => {
  var query = {};
  query["type"] = "Bug";

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }

  InternalMessage.countDocuments(query, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })

}

const setSolvedStatusPostedBugs = (req, res, next) => {
  InternalMessage.updateOne({
    '_id': req.body.BugPost,
    'type': "Bug"
  },
    {
      solved: req.body.solvedStatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No Bug in database found.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const getReportedPosts = (req, res, next) => {
  var query = {};
  query["reported"] = true;

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }
  if (req.query.deleted === "deleted") {
    query["deleted"] = true
  }
  if (req.query.deleted === "undeleted") {
    query["deleted"] = false
  }

  User.findAll({
    attributes: ['id', 'username']
  }).then(user => {
    const users = user.map(user => {
      return [user.id, user.username]
    })

    BlogPost.find(query,
      ['title', 'date', 'body', 'userid', 'reported', 'solved', 'deleted', 'changed'],
      {
        skip: 0,
        limit: 5,
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
              deleted: doc.deleted,
              changed: doc.changed,
              date: format(doc.date, 'dd.MM.yyy HH:mm')
            }
          )
        })
        res.status(200).send(resObj)
      })
  })
}

const getAmountReportedPosts = (req, res, next) => {
  var query = {};
  query["reported"] = true;

  if (req.query.filter === "solved") {
    query["solved"] = true;
  }
  if (req.query.filter === "unsolved") {
    query["solved"] = false;
  }
  if (req.query.deleted === "deleted") {
    query["deleted"] = true
  }
  if (req.query.deleted === "undeleted") {
    query["deleted"] = false
  }


  BlogPost.countDocuments(query, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })
}

const setSolvedStatusReportedPosts = (req, res, next) => {
  BlogPost.updateOne({
    '_id': req.body.BugPost,
  },
    {
      solved: req.body.solvedStatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No Bug in database found.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const editReportedPost = (req, res, next) => {
  BlogPost.updateOne({
    '_id': req.body.postId,
  },
    {
      body: req.body.body,
      title: req.body.title,
      changed: true
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No post in database found.' }) };
      if (doc.nModified === 0 && doc.n === 1) { return res.status(400).send({ message: 'Post already updated.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const mgtController = {
  buildProd,
  getReportedPosts,
  getPostedBugs,
  getContactMessages,
  getAmountReportedPosts,
  getAmountPostedBugs,
  getAmountContactMessages,
  setSolvedStatusContactMessages,
  setSolvedStatusPostedBugs,
  setSolvedStatusReportedPosts,
  editReportedPost,
};

export default mgtController;