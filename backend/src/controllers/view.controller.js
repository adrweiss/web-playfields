const getLoginData = (req, res, next) => {
  res.status(200).send({ message: 'get login view' });
}

const getDeleteData = (req, res, next) => {
  res.status(200).send({ message: 'get delete view' });
}

const views = {
  getLoginData,
  getDeleteData
}

export default views 