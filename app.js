
var express = require('express');
var indexRouter = require('./routes/fetchRoutes');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use('/admin', indexRouter);
app.listen(3000,()=>{
  console.log("Running")
})
module.exports = app;
