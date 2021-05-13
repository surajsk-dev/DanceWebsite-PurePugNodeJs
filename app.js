// Import Express
const express = require('express'); 

// Import Path for for working with file and directory paths
const path = require('path'); 

// Making Express App
const app = express(); 

// getting-started mongoose import and connect
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/danceContact', {useNewUrlParser: true, useUnifiedTopology: true});

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

// mongoose schema to model
const Contact = mongoose.model('Contact', contactSchema);

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

// post - form data to database
app.post('/contact',(req,res)=>{
    // getting datta
    var myData= new Contact(req.body);
    // saving data
    myData.save().then(()=>{
        console.log('data sent')
    }).catch(()=>{
        res.status(400).send('data not sent')
    })


    res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port,()=>{
    console.log(`Server is starting at http://localhost:${port}`)
});
