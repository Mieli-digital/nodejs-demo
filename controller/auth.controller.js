const AuthService = require('../services/auth.service');

class AuthController{
  constructor(mongoDbContext){
    if(!mongoDbContext)
      throw new Error("mongoDbContext missing!");
    
    this.authService = new AuthService(mongoDbContext);
  }

  login = async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    try {
      res.send(await this.authService.login(req.body));
      return;
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    }
  }

  register = async (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    
    try {
      res.send(await this.authService.register(req.body));
      return;
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    }
  }
}

module.exports = AuthController;