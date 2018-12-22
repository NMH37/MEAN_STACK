const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded_token = jwt.verify(token, 'Reallylongstringtogeneratethetoken');
    console.log(decoded_token, ' From check Auth');
    req.userData = { email: decoded_token.email, userId: decoded_token._id };
    next();
  }
  catch (error) {
    res.status(401).json({ message: 'You are not authenticated' });
  }
};
