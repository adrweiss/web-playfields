import { mongodb } from '../models/index.js'
import { helper } from '../middleware/index.js'

const InternalMessage = mongodb.internalMessage;

const postContactForm = (req, res, next) => {
  if (!req.body.reason) {
    return res.status(400).send({ message: "No reason was provided." })
  }

  if (!req.body.body) {
    return res.status(400).send({ message: "No description was provided." })
  }
  
  InternalMessage.create({
    "type": "Contact",
    "mail": req.body.mail,
    "reason": req.body.reason,
    "body": req.body.body
  }, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      helper.sendMailWithContent("You got one contact request", "weiss.adrian@outlook.com", "Playfields Contact Request")
      return res.status(201).send({ message: "Thank you for the contact message." })
    }
  })
}

const postBug = (req, res, next) => {
  if (!req.body.reason) {
    return res.status(400).send({ message: "No reason was provided." })
  }

  if (!req.body.body) {
    return res.status(400).send({ message: "No description was provided." })
  }

  InternalMessage.create({
    "type": "Bug",
    "reason": req.body.reason,
    "body": req.body.body
  }, (err, data) => {
    if (err) {
      return res.status(500).send(err)
    } else {
      return res.status(201).send({ message: "Thank you for reporting this bug." })
    }
  })
  
}

const footer = {
  postContactForm,
  postBug,
}

export default footer 