var express = require('express');
var router = express.Router();
const fetchController=require('../controller/fetchController')

router.post('/fetchRecordsWithMssql', function(req, res) {
  fetchController.fetchRecordsWithMysql(req,res)
});

router.post('/registerUser',function(request,response){
  fetchController.registerUser(request,response)
})

router.post('/validateUser',function(request,response){
  fetchController.validateUser(request,response)
})

router.get('/downloadCSV', function(req, res) {
  fetchController.downloadCSV(req,res)
});
router.get('/getTotal', function(req, res) {
  fetchController.getTotal(req,res)
});

module.exports = router;
