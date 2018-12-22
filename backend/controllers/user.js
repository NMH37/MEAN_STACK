const User = require('./../models/user');
const bcrypt = require('bcrypt');
const WebToken = require('jsonwebtoken');

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hashword => {
      const user = new User({
        email: req.body.email,
        password: hashword
      });
      user.save()
        .then((added_user) => {
          res.status(201).json(added_user)
        })
        .catch(error => {
          res.status(500).json({ message: 'Invalid Authentication Credentials' });
        });
    });
}
exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      console.log(user, ' from inside then');
      if (!user) {
        return res.status(401).json({
          message: ' email not found'
        });
      }
      return bcrypt.compare(req.body.password, user.password)
        .then(result => {
          console.log(result, 'from result')
          if (!result) {
            return res.status(401).json({
              message: ' Invalid Authentication Credentials'
            });
          }
          const token = WebToken.sign({ email: user.email, _id: user._id },
            'Reallylongstringtogeneratethetoken',
            { expiresIn: "1h" });
          console.log(token, 'generated token');
          res.status(200).json({ token: token, message: ' user found', userId: user._id });
        })
    })
    .catch(error => {
      console.log('no token')
      return res.status(401).json({
        message: 'Invalid Authentication Credentials from ctach'
      });
    });
}
