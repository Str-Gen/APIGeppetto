var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET login page */
router.get('/',function(req,res,next) {
  res.render('pug-bootstrap/login');
});

/* POST login page*/
router.post('/',passport.authenticate('local',{
    successRedirect : '/ping',
    failureRedirect: '/error_login'
}));

module.exports = router;

