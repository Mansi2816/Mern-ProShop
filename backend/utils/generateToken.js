const jwt = require ('jsonwebtoken')


const generateToken = (res,userId) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })
      console.log(token);
    
      //set JWT as http-only-cookie
    
      res.cookie('jwt', token, {
        httpOnly: true,
      //   secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        MaxAge: 30 * 24 * 60 * 60 * 1000
      })
}
module.exports=generateToken