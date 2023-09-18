const Post = require('../database/models/Post')
const path = require('path');


module.exports =  (req,res)=> {
    const{image } =req.files;
    image.mv(path.resolve(__dirname,'..', 'public/posts',image.name), (err)=> {
        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
    })
        .then( ()=>{

            res.redirect('/');
        })
        .catch( (err)=> console.log(err))
    })  
};