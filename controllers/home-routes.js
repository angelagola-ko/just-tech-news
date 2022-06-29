const { DATE } = require('sequelize');
const sequalize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll ({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequalize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).then(dbPostData => {
        console.log(dbPostData[0]);
        const posts = dbPostData.map(post => post.get({ plain: true }));
        //pass a single post object into the homepage template
        res.render('homepage', { posts });
       // res.render('homepage', dbPostData[0].get({ plain: true }));
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login');
});

// router.get('/', (req, res) => {
//   res.render('homepage', {
//   id: 1,
//   post_url: 'https://handlebarsjs.com/guide/',
//   title: 'Handlebards Docs',
//   created_at: new Date(),
//   vote_count: 10,
//   coments: [{}, {}],
//   user: {
//     username: 'test_user'
//   }
//   });
// });

module.exports = router;