
const postContactForm = (req, res, next) => {
  console.log(req.body)
  res.status(200).send({ message: "get in contact." });
}

const postBug = (req, res, next) => {
  console.log(req.body)
  res.status(200).send({ message: "post a bug." });
}

const footer = {
  postContactForm,
  postBug,
}

export default footer 