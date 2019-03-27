const jwt = require('jsonwebtoken');
const Users = require('./../models/mongoose/users');

const auth = async (req,res, next) => {
  console.log('req.path', req.path);
  try {
    // if no header will catch error
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'putinenvvariable');
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