import { db } from '../models/index.js'

import nodemailer from 'nodemailer';

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

function sendMailWithContent(url, mail, subject) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    }
  });


  var mailOptions = {
    from: "Playfield",
    to: mail,
    subject: subject,
    text: url
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Not able to send mail.')
    } else {
      console.log('Able to send mail.')
    }
  });
}

const helper = {
  addUserLoginLog,
  addDeletedUserToLogs,
  sendMailWithContent,
};

export { helper }