const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerPartials(__dirname+'/views/partial');
app.set('view engine','hbs');


app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err)
			console.log('Unable to append to server.log');
	});
	console.log(`${now} : ${req.method} ${req.url}`);
	next();
});

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle:'Home Page',
		currentYear: new Date().getFullYear(),
		welcomeMessage:'Hey there i am new to this and i am loving it.'
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'unable to hadle request',
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
	});
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs');
});

app.listen(port,()=>{
	console.log(`Server running on port ${port}`);
});