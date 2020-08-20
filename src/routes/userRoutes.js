const express = require('express');
const axios = require('axios');
const config =  require('../config/config.js')

const router = express.Router();


const url = `${config.api_url}/users`;
console.log(url);
// let configAxios = {
//   withCredentials: true,
// };


router.get('/', (req, res, next) => {
  res.render("index");
});

router.post('/login', async (req, res, next) => {
  dataUser = req.body;
  if (dataUser){
    console.log('data =>', dataUser);
    res.render('userProfile', dataUser);
    try {
      let userResult = await axios.post(`${url}/login`,
        {
          id: req.body.id,
          email: req.body.email,
          password: req.body.password
        }, confiAxios);
      let data = userResult.data;
      // await axios.interceptors.request.use((configAxios) => {
      // let token = userResult.headers['set-cookie'][0].replace('token=','');
      // token = token.replace('; Path=/','');
      // if (token) {
      //     configAxios.headers.Authorization = token;
      // }
      //   return configAxios;
      // });

      let userVerification = data.code;
      if (!userVerification){
        res.render('profile', data)
      }
      else{
        res.render('index', data);
      }
    } catch (err) {
      console.error('[ERROR: post /login] - ', err);
      next(err);
    }
  }
  else {
    res.render('index');
  }
});

router.post('/sign', async (req, res, next) => {
  let userData = req.body;
  if (userData){
    try{
      let userResult = await axios.post(`${url}/signin`, req.body);
      res.render("index", userResult.data);

    }
    catch(err){
      console.error('[ERROR: post /signin] - ', err);
      next(err);
    }
  }
});

router.get('/update:id', async (req, res, next) => {
  if(req.body){
    try{
      let id = req.params.id;
      let userResult = await axios.put(`${url}/update/${id}`, req.body);
      res.render('profile', userResult.data);
    }catch{
      console.error('[ERROR: put /updateUser] - ', err);
      next(err);
    }
  }
});

module.exports = router;
