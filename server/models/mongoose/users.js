var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    // unique: true,

  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  // tokens: [{
  //   access: {
  //     type: String,
  //     required: true,
  //   },
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }]

});

userSchema.methods.generateAuthToken = async function(){
  const user = this;
  console.log('process.env.JWT_SECRETaaaaaaaa', process.env.JWT_SECRET );
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' });

  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
}
// .toJSON
userSchema.methods.getPublicProfile =  function () {
  const user = this;
              // from mongoose turns it into regular object
  let publicProfile = user.toObject();
  delete publicProfile.password;
  delete publicProfile.tokens;
  return publicProfile;
}


// this binding will not play a roll so arrow ok
userSchema.statics.findByCredentials = async (password, username) => {
  // mongoose method to find document
  const user = await Users.findOne({username});
  
  if(!user){
    throw new Error('unable to log in');
  }

    // compare typed in password vs password on server
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch){
    throw new Error('unable to log in');
  }

  return user;
}


//for hashing plain text password
userSchema.pre('save', async function(next) {
  
  // check if password is changed if so do new hash if not
  // skip hashing
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 8)
  }

  next();
}) 


var Users = mongoose.model('User', userSchema);


module.exports = Users;