var express = require('express');
var router = express.Router();
var Users = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res,next) {
    Users.getAllUsers((err,data)=>{
        if (err){
            res.json({
                success: false,
                msg: err  
            })
          }
          else{
              res.json({ 
                  success: true,
                  msg: data
              })
            }
    })
});



router.get('/interval', (req, res) => {
  arr = req.url.split('=')
  res.send("changing interval to "+arr[1]+" seconds");
  client.publish('interval',arr[1])
})



router.post("/", (req, res) => {
  if (!req.body.name || !req.body.userName || !req.body.password)
      res.json({
          success: false,
          msg: 'incomplete data'
      });
  else {
      let DATA = {
          name: req.body.name,
          userName: req.body.userName,
          password: req.body.password,
          apikey:req.body.userid
      }
      Users.addUser(DATA, (err,DATA)=> {
          if (err)
              res.json({
                  success: false,
                  msg: err
              })
          else{
              console.log(DATA)
              res.json({
                  success: true,
                  msg: 'added' + DATA
              })
            }
      })
  }
})


module.exports = router;