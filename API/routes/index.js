var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pug-bootstrap/index', { title: 'Geppetto API' });
});

module.exports = router;