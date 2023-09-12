module.exports = app => {
    const auth = require('../controllers/auth.controller.js');
    const {body} = require('express-validator');

    const router = require("express").Router();

    router.post("/sign-up",
        body('username').isLength({min: 2, max: 40}),
        body('password').isLength({min: 6, max: 40}),
        auth.registration
    );
    router.post("/sign-in",
        body('username').isLength({min: 2, max: 40}),
        body('password').isLength({min: 6, max: 40}),
        auth.login
    );
    router.get("/logout", auth.logout);
    router.get("/refresh", auth.refresh);
  
    app.use('/auth', router);
};