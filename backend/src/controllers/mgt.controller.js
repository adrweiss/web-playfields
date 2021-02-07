import request from 'request'

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
  res.status(200).send({ message: "get the contact messages." });
}

const setSolvedStatusContactMessages = (req, res, next) => {
  res.status(200).send({ message: "get the contact messages." });
}

const getPostedBugs = (req, res, next) => {
  res.status(200).send({ message: "get the bug messages." });
}

const getAmountPostedBugs = (req, res, next) => {
  res.status(200).send({ message: "get reported Posts." });
}

const setSolvedStatusPostedBugs = (req, res, next) => {
  res.status(200).send({ message: "get the contact messages." });
}

const getReportedPosts = (req, res, next) => {
  res.status(200).send({ message: "get reported Posts." });
}

const getAmountReportedPosts = (req, res, next) => {
  res.status(200).send({ message: "get reported Posts." });
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