const Post = require('../database/models/Post')
const path = require('path');


module.exports =  (req,res)=> {
    console.log(req.session.userId)
    const{image } =req.files;
    image.mv(path.resolve(__dirname,'..', 'public/posts',image.name), ()=> {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
            //  author reqsession.userId  
            // to save image related to which userId
    })
        .then( ()=>{

            res.redirect('/');
        })
        .catch( (err)=> console.log(err))
    })  
};