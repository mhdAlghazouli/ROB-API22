var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "moe's secret", {
    expiresIn: maxAge,
  });
}



/* User Login. */
router.post('/', async function(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({where: {email: email}});
  
  if( user ){
    if(user.password === password) {
      
      const token = createToken(user.id);
      res.json({status: "ok", data: token})
    }else{
      res.json({error: "incorrect password" })
    }
  }else {
     res.json({error: "this email is not registered" })
  }
});

/* User Sign up. */
router.post("/signup", async function (req, res, next){
  console.log(req.body)
  const {firstName, lastName ,email, password} = req.body;
  const user = await User.create({ firstName: firstName, lastName: lastName, email: email, password: password });
  res.json({ user: user.id })
});

// user detail
router.post("/userDetail", async (req,res,next) => {
  const { token } = req.body;
  console.log(token)
  try {
    const user = jwt.verify(token, "moe's secret");
    const userId = user.id;
    User.findByPk(userId)
    .then(data => {
      res.send({ status: "ok", data: data})
    })
    .catch(error => {
      res.send({ status: "error", data: error})
    })
  } catch (error) {
    
  }
})



module.exports = router;
