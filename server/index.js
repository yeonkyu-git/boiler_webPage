const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config/key');
const app = express();

const port = process.env.PORT || 5000;
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => app.listen(port, () => console.log(`Server Listening on ${port}`)))
  .catch(err => console.log(err));

app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// to not get any deprecation warning or error 
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// to get json data 
// support parsing of application/json type post data 
app.use(bodyParser.json());
app.use(cookieParser());


// Route 
app.use('/api/users', require('./routes/users'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('../uploads'));
if (process.env.NODE_ENV === 'production') {
  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}