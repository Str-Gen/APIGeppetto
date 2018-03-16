var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET login page */
router.get('/',function(req,res,next) {
    res.render('pug-bootstrap/error_login',{title:'Geppetto API',user : req.user});
});

/* POST login page*/
router.post('/',passport.authenticate('local',{
    successRedirect : '/dashboard',
    failureRedirect: '/error_login'
}));

module.exports = router;
