const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');

const app = new express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', ()=> new Date().getFullYear());
hbs.registerHelper('formatMessage', (text)=> {
  return text.toUpperCase();
})

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  const log = `${new Date().toString()} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', `${log} \n`, (err)=>{
    if(err) throw err;
  })
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintaince.hbs');
// });

app.get('/', (req,res)=>{
  res.render('home.hbs',{
    pageTitle : 'Home Page',
    welcomeMsg : 'Welcome to Home Page' 
  });
});

app.get('/about', (req,res)=>{
  res.render('about.hbs', {
    pageTitle : 'About Page',
    welcomeMsg : 'Welcome to About Page'
  });
});

app.get('/help', (req,res) => {
  res.sendFile(path.join(`${__dirname}/public/help.html`));
});

app.listen(3000, ()=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  console.log('Server listening on port 3000');
});