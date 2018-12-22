
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const postRoutes = require('./backend/routes/posts');
const userRoutes = require('./backend/routes/users');


const app = express();

// connect database
mongoose.connect('mongodb://localhost:27017/anonymous_notes', {
  useCreateIndex: true,
  useNewUrlParser: true,
}
).then(() => console.log("conneted to db"))
  .catch(() => console.log("errors occured"));


app.use('/api/', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Accept, Content-Type, X-Requested-With, Authorization ,Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.resolve('dist/mean-course')));

// add database config here
//require('./server/config/database');

//app.use('/api',require('./server/routes'));
//app.use(require('./server/routes/catch-all.route'));
app.listen(port, () => console.log(`listening on port ${port}`))
