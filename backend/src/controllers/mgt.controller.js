import request from 'request'

function buildProd(req, res, next) {
  request.get('http://192.168.0.58:8080/git/notifyCommit?url=github.com:adrweiss/playfield.git')
    .on('response', function (response) {
      return res.status(200).send({ message: "Build is triggered." });
    })
    .on('error', function (err) {
      return res.status(200).send({ message: "Build is not available." });
    })
}

const mgtController = {
  buildProd,
};

export default mgtController;