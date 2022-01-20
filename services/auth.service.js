const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService{
  constructor(mongoDbContext){
    if(!mongoDbContext)
      throw new Error("missing mongoDbContext");

    this.mongoDbContext = mongoDbContext;
    this.passwordSalt = process.env.SALT;
  }

  login = async (loginData) => {
    if(!loginData)
      throw new Error("loginData cannot be empty");

    const user = await this.mongoDbContext.user.findOne({
      userName: loginData.userName
    });    

    if(!user)
      throw new Error("User not found!");

    let compare = await bcrypt.compare(loginData.password, user.password);
    if(compare){
      let token = jwt.sign({
        iss: 'nodejs-demo',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
        userName: user.userName,
        id: user.id,
        role: user.role
      }, 'supersecretpass123')
      return token;
    }
    throw new Error("something went wrong");
  }

  register = async (registerData) => {
    if(!registerData)
      throw new Error("registerData cannot be empty");

    const user = await this.mongoDbContext.user.findOne({
      userName: registerData.userName
    });    

    if(user)
      throw new Error("user arleady used!");

    let newUser = {
      userName: registerData.userName,
      password: await bcrypt.hash(registerData.password, 10),
      role: registerData.role
    }

    this.mongoDbContext.user.create(newUser, (err) => {
      if(err)
        throw new Error("something went wrong on create: ", err);
    })

    return "done";
  }
}

module.exports = AuthService;