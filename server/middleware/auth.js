const jwt = require('jsonwebtoken');
const Users = require('./../models/mongoose/users');
// https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
const auth = async (req,res, next) => {

  try {
  
    // if no header will catch error
    const token = req.header('Authorization').replace('Bearer ', '');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //search for user based on jwt id we mmde same as server and search for matching 
    // token in array (used for differnt device log ins)
    const user = await Users.findOne({ _id: decoded._id, 'tokens.token': token });
    if(!user){
      throw new Error();
    }
    req.user = user;
   // req.jwt.user = user;
    next();
  } catch (error) {
    res.status(401).send({error: "please authenticate"})
  }

}


module.exports = auth;