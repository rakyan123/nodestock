const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

/* Handlebars are basically used so that the changes we make in Backend is reflected 
on the frontend and hence its very useful */

//API Key pk_caaa4f0fbf954c0a80fab2fabe67e7d6 
//Will output entire details of FB on the console
//function call_api
function call_api(finishedAPI, ticker){
	request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_caaa4f0fbf954c0a80fab2fabe67e7d6', {json:true}, (err,res,body) => {
	if(err) return console.log(err);
	if(res.statusCode === 200) {
		//console.log(body);
		finishedAPI(body);
	};
});

}

//Set Handlebar's middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//Middleware
app.use(bodyParser.urlencoded({extended:false}));

//Set Handlebar index GET routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    	stock: doneAPI, // Prints out object Object on the screen
    });

	}, 'fb');
    
});

app.post('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    	stock: doneAPI, // Prints out object Object on the screen
    });

	}, req.body.stock_ticker);
    
});

app.get('/about.html', function(req,res){
	res.render('about');
})

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))
/* This statement points the server to public directory and so without using any router
the server is able to serve up the webpage and that is because of express
But we can only use it for static web pages*/

 

app.listen(port, () => console.log(`Listening on port ${port}`))