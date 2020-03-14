// Requires NPM
const router = require('express').Router();

// Requires INTERNAL
const Article = require('../models/article');

// GET ARTICLE
router.get('/article', async(req, res) => {
    try {
        // Access MongoDb To Get Articles
        let articles = await Article.find();
        
        // Send HTTP Response in 200 case
        res.status(200).json({
            success: true,
            articles: articles
        })

    } catch(err) {
        // Send HTTP Response in 500 case
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${err}` 
        })
    }
})


// POST ARTICLE
router.post('/article', async(req, res) => {
    try {
        // Create DB Entry
        let article = new Article;
        let missingParams = [];
        article.author = req.body.author ? req.body.author : missingParams.push("author");
        article.title = req.body.title ? req.body.title : missingParams.push("title");
        article.content = req.body.content ? req.body.content : missingParams.push("content");

        // Structure Response
        if(missingParams.length !== 0) {
            // Send HTTP Response in missing params case
            res.status(422).json({
                success: false,
                message: `Missing Params: ${missingParams}` 
            })
        } else {
            // Save article in DB
            await article.save();
            // Send HTTP Response in ok case
            res.status(204).json({});
        }
    } catch(err) {
        // Send HTTP Response in 500 case
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${err}` 
        })
    }
})



module.exports = router;