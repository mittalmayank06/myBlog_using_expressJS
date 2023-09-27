const Post = require('../database/models/Post')

module.exports =  async (req,res)=> {
    const posts = await Post.find({}).populate('author')
    
    console.log(posts);
    console.log(req.session)  //to check user logged-in or not...
    res.render('index', {
        posts
    })





    // .then( (posts) => {
    //     console.log(req.session)  //to check user logged-in or not...
    //     res.render('index', {
    //         posts
    //     })
    // })
    // .catch( (err)=> console.log(err));





    // console.log(posts);
    
}
