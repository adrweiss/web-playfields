import { db } from '../models/index.js'

const User = db.user
const Logs = db.logs
const DeletedUser = db.deletedUser

const getLoginData = (req, res, next) => {
  Logs.findAll({
    include: [{
      model: User, as: 'user',
    }]
  }).then(logs => {
    if (logs) {
      const resObj = logs.map(log => {
        return Object.assign(
          {},
          {
            id: log.id,
            status: log.successfull,
            date: log.createdAt,
            user: log.user ? log.user.username : null
          }
        )
      })
      res.status(200).send(resObj)
    } else {
      res.status(400).send({ message: "No data available." });
    }
  })
}

const getDeleteData = (req, res, next) => {
  DeletedUser.findAll().then(deleted => {
    if (deleted) {
      const resObj = deleted.map(usr => {

        return Object.assign(
          {},
          {
            id: usr.id,
            usr_mail: usr.mail,
            usr_username: usr.username,
            date: usr.createdAt
          }
        )
      })
      res.status(200).send(resObj)
    } else {
      res.status(400).send({ message: "No data available." });
    }
  })
}

const views = {
  getLoginData,
  getDeleteData
}

export default views 