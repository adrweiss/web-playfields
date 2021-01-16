import { db } from '../models/index.js'

const Logs = db.logs
const DeletedUser = db.deletedUser

function addUserLoginLog(userId, successStatus) {
  Logs.create({
    successfull: successStatus,
    userId: userId,
  })
}

function addDeletedUserToLogs(mail, username) {
  DeletedUser.create({
    mail: mail,
    username: username
  })
}

function sendMailWithContent(url, mail) {
  console.log(url)
  console.log(mail)
}

const helper = {
  addUserLoginLog,
  addDeletedUserToLogs,
  sendMailWithContent,
};

export { helper }