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
      skip: parseInt(req.query.skip),
      limit: parseInt(req.query.limit),
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
            mail: doc.mail,
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
    '_id': req.body.id,
    'type': "Contact"
  },
    {
      solved: req.body.solvedStatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No contact status in database found.' }) };
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
      skip: parseInt(req.query.skip),
      limit: parseInt(req.query.limit),
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
    '_id': req.body.id,
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
  if (req.query.blocked === "blocked") {
    query["blocked"] = true
  }
  if (req.query.blocked === "unblocked") {
    query["blocked"] = false
  }

  User.findAll({
    attributes: ['id', 'username']
  }).then(user => {
    const users = user.map(user => {
      return [user.id, user.username]
    })

    BlogPost.find(query,
      ['userid', 'title', 'date', 'body', 'solved', 'blocked', 'changed'],
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
              body: doc.body,
              title: doc.title,
              solved: doc.solved,
              blocked: doc.blocked,
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
  if (req.query.blocked === "blocked") {
    query["blocked"] = true
  }
  if (req.query.blocked === "unblocked") {
    query["blocked"] = false
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
    '_id': req.body.id,
  },
    {
      solved: req.body.solvedStatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No post in database found.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const setBlockedStatusReportedPosts = (req, res, next) => {
  BlogPost.updateOne({
    '_id': req.body.id,
  },
    {
      blocked: req.body.blockedstatus,
    },
    { upsert: false },
    function (err, doc) {
      if (err) { return res.status(500).send({ message: 'An error has occurred.' }) };
      if (doc.nModified === 0 && doc.n === 0) { return res.status(400).send({ message: 'No Post in database found.' }) };
      return res.status(200).send({ message: 'Succesfully edited.' });
    });
}

const deleteBugReport = (req, res, next) => {
  InternalMessage.deleteOne({
    _id: req.body.id, 
    type: "Bug"
  }, function (err) {
    if (!err) {
      return res.status(200).send({ message: "Bug successfull deleted." });
    }
    return res.status(400).send({ message: "Deletion was not successfull." })
  });
}

const deleteContactRequest = (req, res, next) => {
  InternalMessage.deleteOne({
    _id: req.body.id, 
    type: "Contact"
  }, function (err) {
    if (!err) {
      return res.status(200).send({ message: "Bug successfull deleted." });
    }
    return res.status(400).send({ message: "Deletion was not successfull." })
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
  setBlockedStatusReportedPosts,
  deleteBugReport,
  deleteContactRequest,
};

export default mgtController;