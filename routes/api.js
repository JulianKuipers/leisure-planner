var express = require('express');
var router = express.Router();

/* GET api routes */
router.get('/', function(req, res, next) {
  res.send('General API node');
});

module.exports = router;
