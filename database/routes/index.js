var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var temp = "fff";
//var test = require('test');

var testSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    credentials :{
        Username: String,
        Password : String
    },
    
    name : String

});
var test = mongoose.model("Test", testSchema);

//module.exports = test;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://new-user_31:QdfjeamJQeqlIaMK@cluster0-dmkh2.mongodb.net/test?retryWrites=true&w=majority', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
    var fakeModel = new test({
        _id: new mongoose.Types.ObjectId(),
        credentials : {
            Username: temp,
            Password : "delladmin"        
        
        }    
    });
    fakeModel.save(function(err) {
        if (err) throw err;
         
        console.log('fake successfully saved.');

    
    });
    
    
   test.findOne({"credentials.Password" : "delladmin"} ,function(err , t){
      if (err) throw err; 
       console.log(t.credentials);
       console.log("nudes");
   });
    
    test.find({"credentials.Password" : "delladmin"},function(err , t){
      if (err) throw err;
        console.log(t);
    });
    
    
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
