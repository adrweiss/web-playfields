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

const helper = {
  addUserLoginLog,
  addDeletedUserToLogs,
};

export { helper }