var express = require('express');
var router = express.Router();
var Accountmodels = require('../models/account');
var passport = require('passport');
var mongoose = require('mongoose');

/* GET register page */
router.get('/',function(req,res){
    res.render('pug-bootstrap/register', {});
});

/* POST to register page */
router.post('/',function(req,res){    
    Accountmodels.Account.register(
        new Accountmodels.Account( 
            {
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                city: req.body.city,
                zip_code: req.body.zip_code,
                address: req.body.address,
                telephone: req.body.telephone,
                 wallet: new Accountmodels.Wallet( 
                     {_wallet_id: new mongoose.Types.ObjectId,
                         balance: Math.floor(Math.random()*1000000),
                         transactions_made: 0
                        })
            }),req.body.password,function(err,account) {
        if(err){            
            console.log("error in the registry phase");
            console.log(err);
            return res.render('pug-bootstrap/register', {account : account, err:err});
        }
        passport.authenticate('local')(req,res,function() {
            res.redirect('/login');
        });
    });
});

module.exports = router;