import request from 'request'
import { mongodb } from '../models/index.js'

const InternalMessage = mongodb.internalMessage;
const BlogPost = mongodb.blogPost;

function buildProd(req, res, next) {
  request.get('http://192.168.0.59:8080/git/notifyCommit?url=github.com:adrweiss/playfield.git')
    .on('response', function (response) {
      return res.status(200).send({ message: "Build is triggered." });
    })
    .on('error', function (err) {
      return res.status(200).send({ message: "Build is not available." });
    })
}

const getContactMessages = (req, res, next) => {
  res.status(200).send({ message: "get the contact messages." });
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
  res.status(200).send({ message: "get the contact messages." });
}

const getPostedBugs = (req, res, next) => {
  res.status(200).send({ message: "get the bug messages." });
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
  res.status(200).send({ message: "get the contact messages." });
}

const getReportedPosts = (req, res, next) => {
  res.status(200).send({ message: "get reported Posts." });
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
  

  BlogPost.countDocuments( query , function (err, data) {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).send({ amount: data });
    }
  })
}

const setSolvedStatusReportedPosts = (req, res, next) => {
  res.status(200).send({ message: "get the contact messages." });
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
};

export default mgtController;