class RoleValidator{
  checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
      return res.redirect('/login')
    }
  
    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
      return res.status(401).send("Unauthorized");
    }
  
    return next()
  }
}

module.exports = RoleValidator;