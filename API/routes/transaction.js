var express = require('express');
var router = express.Router();
var passport = require('passport');
var Accountmodels = require('../models/account');
var Transaction = require('../models/transaction');

/* GET transaction page */
router.get('/',function(req,res,next) {
  res.render('pug-bootstrap/transaction',{title:'Bank of RNGesus',user : req.session.passport.user});
});

/* GET transaction details */
router.get('/:transactionNumber', function(req,res,next){
  //console.log(req.session);
  var rec;
  Transaction
  .find({sourceWallet: req.user.wallet._wallet_id})
  .skip(req.params.transactionNumber-1)
  .limit(1)
  .exec( (err,record) => { if(err) return handleError(err); else res.render('pug-bootstrap/transactiondetails',{record:record[0]});  } 
  );    
});

/* POST transaction page*/
router.post('/',function(req,res,next){  
  let recipient_username = req.body.recipient;
  let amount = req.body.amount;
  let sender = req.user;
  //console.log(req.user);

  
  Accountmodels.Account.findOne({'username':recipient_username}, 'username wallet', function(err,dbuser_target) {
    if(err) return handleError(err);
    //console.log('DBUSER '+dbuser_target);
  
  let chance = Math.random();
  if(chance <= 0.5){
    // a normal transaction    
    dbuser_target.wallet.balance += amount;
    req.user.wallet.balance -= amount;    
    //Accountmodels.Account.findOneAndUpdate({'username':recipient_username}, { $inc : { 'wallet.balance' : amount }});
    //Accountmodels.Account.findOneAndUpdate({'username':req.session.passport.user}, { $inc : { 'wallet.balance' : -amount }});    
    insertTransactionInDb(req.user.wallet._wallet_id, dbuser_target.wallet._wallet_id, amount, 'normal');
    req.flash('info','kind of boring, a regular transaction');    
  }
  else if(chance >0.5 && chance <= 0.6) {
   // double transaction amount   
   dbuser_target.wallet.balance += 2*amount;
   req.user.wallet.balance -= 2*amount; 
   insertTransactionInDb(req.user.wallet._wallet_id, dbuser_target.wallet._wallet_id, amount, 'double');
   req.flash('info', 'A transaction was made worth twice the amount');
  }
  else if(chance > 0.6 && chance <= 0.7){
    Accountmodels.Account.findOne().exec(function(err,dbuser_target){
      // target a random user, you may even target yourself for a NOP      
      dbuser_target.wallet.balance += amount;
      req.user.wallet.balance -= amount;      
      insertTransactionInDb(req.user.wallet._wallet_id, dbuser_target.wallet._wallet_id, amount, 'random');
      req.flash('warning','your transaction was sent to a random user');
    });
  }  
  
  else if(chance > 0.7 && chance <= 0.8){
    // DOGECOINS
    req.user.wallet.balance -= amount;    
    insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0', amount, 'doge');
    req.flash('info','congratulations you have invested in dogecoins');
  }
  else if(chance > 0.8 && chance <= 0.85){
    // Bank present
    req.user.wallet.balance += 2*amount;
    dbuser_target.wallet.balance += amount;
    insertTransactionInDb(req.user.wallet._wallet_id, dbuser_target.wallet._wallet_id, amount, 'bankpresent');
    req.flash('success','the bank of RNGesus loves its customers, the transaction amount was added to your balance again');
  }
  else if(chance > 0.85 && chance <= 0.9){
    // Vanish
    req.user.wallet.balance -= amount;
    insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'vanish');
    req.flash('error','we regret to inform you that the money has vanished, no clue where it went');
  }
  else if(chance > 0.9 && chance <= 0.95){
    // Charity
    req.user.wallet.balance -= amount;
    insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'charity');
    req.flash('success','your kind heart warms the world, thank you for donating to charity');
  }
  else if(chance > 0.95 && chance <= 0.97){
    // Pay in random foreign money
    req.user.wallet.balance -= amount;
    dbuser_target.wallet.balance += (Math.random() * (2 - 0.15) + 0.15)*amount;
    insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'foreigncurrency');
    req.flash('info','the intended recipient received the amount in a foreign currency');
  }
  else if(chance > 0.97 && chance <= 0.99){
    // wikipedia
    req.user.wallet.balance -= amount;
    insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'wikipedia');
    req.flash('info','dear reader, the transaction amount was used to fund wikipedia')
  }
  else if(chance > 0.99 && chance <= 1){    
    let c = Math.random();
    if(c<=.25){
      // the easiest lottery in the world
      insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'lottery');
      req.user.wallet.balance += 125000000;
      req.flash('success','CONGRATULATIONS you won the lottery');
    }
    else if(c>.25 && c<=.50){
      // kickstarter
      insertTransactionInDb(req.user.wallet._wallet_id, '0ffffffffffffffffffffff0' , amount, 'kickstarter');
      req.user.wallet.balance += 125000000;
      req.flash('info','the amount was used to fund a random Kickstarter project');
    }
    else if(c>.50 && c<=.75){
      // nothing happens
      req.flash('info','nothing happened');
    }
    else if(c>.75 && c<=1){
      // room for more
    }
  }
}); 
  res.redirect(302,'/dashboard');
});

function handleError(err){
  console.log(err);
  throw err;
}

function insertTransactionInDb(sender_wallet_id,receiver_wallet_id,amount,type){
  Transaction.create({
    sourceWallet: sender_wallet_id,
    targetWallet: receiver_wallet_id,
    amount: amount,
    action: type
  }, function(err,transaction){
    if(err){
      return handleError(err);
    }
   // else console.log(transaction);
  });
}

module.exports = router;