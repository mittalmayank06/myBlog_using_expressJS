const express = require('express');
const dotenv = require('dotenv').config();
const expressEdge = require('express-edge');
const edge1  = require('edge.js')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const Post = require('./database/models/Post'); to store form-data into mongooseDB now,used in controllers only...
const fileUpload = require('express-fileupload');  //package to store images on mongoDB
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash')


const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const contactPageController = require('./controllers/contactPage')
const aboutPageController = require('./controllers/aboutPage')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const app = new express();
mongoose.connect(process.env.mongo_uri)

// const mongoStore = connectMongo(expressSession);
app.use(expressSession ({
    secret: 'secret',
    cookie: {
        // Session expires after 1 min of inactivity.
        expires: 60000
    },
    store: MongoStore.create({
        mongoUrl : process.env.mongo_uri
    }),
    
}))


app.use(express.static('public'))
app.use(expressEdge);
app.set('views',`${__dirname}/views`);
//global middleware
app.use('*', (req,res,next) => {
    app.locals.auth = req.session.userId;
    //edge.global('auth', req.session.userId) //not working here..

    next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
app.use(express.json())
app.use(connectFlash());



const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


app.use('/posts/store',storePost)
app.use('/posts/new', auth);

app.get('/',homePageController)
app.get('/posts/new',auth, createPostController);
app.post('/posts/store',auth, storePost, storePostController);
    // console.log(req.files);
    // console.log(req.body);  //body-parser stores all form-data into body..
    // Post.create(req.body).then( (post)=>{console.log('post saved to DB')}).catch( (err)=>{console.log(err)});
    // res.redirect('/');
app.get('/post/:id',getPostController );
app.get('/contact',contactPageController);
app.get('/about', aboutPageController);

app.get('/auth/register',redirectIfAuthenticated, createUserController);
app.post('/users/register',redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.get('/auth/logout',auth, logoutController);

app.use( (req,res) => res.render('not-found'));

const PORT=3000;
app.listen(PORT,()=>{
    
    console.log(`Server started on ${PORT}`);
});