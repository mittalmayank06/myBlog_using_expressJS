const express = require('express');

const expressEdge = require('express-edge');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const Post = require('./database/models/Post'); to store form-data into mongooseDB now,used in controllers only...
const fileUpload = require('express-fileupload');  //package to store images on mongoDB
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

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


const app = new express();
mongoose.connect('mongodb+srv://mittalmayank036:hf3nPuKOhd2KtXw8@nodeexpressproject1.wrswebo.mongodb.net/myBlogProject?retryWrites=true&w=majority')

// const mongoStore = connectMongo(expressSession);
app.use(expressSession ({
    secret: 'secret',
    cookie: {
        // Session expires after 1 min of inactivity.
        expires: 60000
    },
    store: MongoStore.create({
        mongoUrl : 'mongodb+srv://mittalmayank036:hf3nPuKOhd2KtXw8@nodeexpressproject1.wrswebo.mongodb.net/myBlogProject?retryWrites=true&w=majority'
    }),
    
}))


app.use(express.static('public'))
app.use(expressEdge);
app.set('views',`${__dirname}/views`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(fileUpload());
app.use(express.json())



const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');


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

app.get('/auth/register', createUserController);
app.post('/users/register',storeUserController);
app.get('/auth/login', loginController)
app.post('/users/login', loginUserController);


const PORT=3000;
app.listen(PORT,()=>{
    
    console.log(`Server started on ${PORT}`);
});