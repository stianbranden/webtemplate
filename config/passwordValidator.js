const pattern =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
const requireStrongPassword = process.env.STRONG_PASSWORD;

module.exports = password=>{
  if (requireStrongPassword) {
    if (password.match(pattern)) {
      return {
        validated: true
      }
    }
    else {
      return {
        validated: false,
        msg: 'Password must be8 to 15 characters and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'
      }
    }
  }
  else {
    if (password.length > 0) {
      return {
        validated: true
      }
    } else {
      return {
        validated: false,
        msg: 'Password cannot be blank'
      }
    }
  }
}
