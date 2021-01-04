const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');

const adminAccountController = require('../controllers/adminAccountController');

/* GET home page. */
router.get('/', (req, res, next) => {
    if (req.user){
        res.render('index');
    } else res.redirect('/login');
});

// router.get('/', (req, res, next) => {
//                     res.render('index');
// });

router.get('/login', adminAccountController.displayLogin);

router.post('/login', 
    passport.authenticate('local', {successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: true })
);

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
