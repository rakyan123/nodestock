const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');
const request = require('request');

const port = process.env.PORT || 5000;

/* Handlebars are basically used so that the changes we make in Backend is reflected 
on the frontend and hence its very useful */

//API Key pk_caaa4f0fbf954c0a80fab2fabe67e7d6 
//Will output entire details of FB on the console
//function call_api
function call_api(finishedAPI){
	request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_caaa4f0fbf954c0a80fab2fabe67e7d6', {json:true}, (err,res,body) => {
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



//Set Handlebar routes
app.get('/', function (req, res) {
	call_api(function(doneAPI){
		res.render('home', {
    	stock: doneAPI,
    });

	});
    
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