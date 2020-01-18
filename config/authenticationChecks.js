const checkAuthenticated = (req, res, next)=>{
  if (req.isAuthenticated()){
    return next();
  }
  req.flash('warning', "Please log inn to view resource");
  res.redirect('/')
}
const checkNotAuthenticated = (req, res, next)=>{
  if (req.isAuthenticated()){
    return res.redirect('/dashboard');
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
}
