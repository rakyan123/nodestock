const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
	res.sendFile(__dirname + '/form.html');
})

app.post('/login', (req,res)=>{
   const firstname = req.body.firstname;
   const lastname = req.body.lastname;
   res.send(firstname + ' ' + lastname);
});

app.listen(5000, ()=>{console.log('Listening on port 5000')});