
var express = require('express');

var app = express();
bodyParser = require('body-parser');

var PORT = 3001;

var data=[];



var csvWriter = require('csv-write-stream')
const fs = require('fs');
var writer = csvWriter()


  app.use(express.json());
  app.use(bodyParser.urlencoded({extended: true}));



  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 

 var Id= makeid(10);


app.get('/', function(req, res) {
    res.status(200).send('Hello world');
});

app.post('/', function(req,res){
  //  console.log(req.body);
    data=req.body;
    res.jsonp({data: 'your data'});
});



app.post('/csv', function(req,res){


    len = data.length;

    
    writer.pipe(fs.createWriteStream(Id+'.csv', {flags: 'a'}))

    for(var i=0;i<len;i++){

        writer.write({id:data[i]});
  


    }

    
    
    
   // writer.end();
    
    
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});
