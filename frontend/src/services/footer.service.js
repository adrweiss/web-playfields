import axios from '../config/axios';

const postContact = (mail, reason, body) => {
  return axios.post("/footer/contact",
    {
      mail,
      reason, 
      body
    }
  );
};

const postBug = (reason, body) => {
  return axios.post("/footer/bug",
    {
      reason,
      body
    }
  );
};

const FooterService = {
  postContact,
  postBug,
}

export default FooterService;