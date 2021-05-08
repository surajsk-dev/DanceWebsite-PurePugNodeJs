const express = require('express'); // Import Express
const path = require('path'); // Import Path for for working with file and directory paths
const app = express(); // Making Express App
const port = 8000; // Port Number to run server on


// EXPRESS SPECIFIC 
// serving static file. Static here is folder name also
app.use('/static',express.static('static')); 
// used to send data through url
app.use(express.urlencoded());


// PUG SPECIFIC
// set the template engine as pug
app.set('view engine','pug'); 
// set views directory
app.set('views',path.join(__dirname,'views')); 


// END POINT
app.get('/',(req,res)=>{
    res.status(200).render('home.pug');
});

app.get('/contact',(req,res)=>{
    res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`Server is starting at http://localhost:${port}`)
});
