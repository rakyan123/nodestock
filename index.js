const express = require('express');
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');

const port = process.env.PORT || 5000;

/* Handlebars are basically used so that the changes we make in Backend is reflected 
on the frontend and hence its very useful */

//Set Handlebar's middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



//Set Handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
    	stuff:"This is my stuff.."
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