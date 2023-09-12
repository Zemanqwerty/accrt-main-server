module.exports = app => {
    const user = require('../controllers/user.controller.js');
    const {body, param} = require('express-validator');
    const authMiddleware = require('../middlewares/auth.middleware.js');

    const router = require("express").Router();

    router.get('/all', authMiddleware, user.usersList);
    router.put("/:id/block", authMiddleware,
        param('id').isInt(),
        user.block
    );
    router.get('/:id', authMiddleware,
        param('id').isInt(),
        user.getById
    );
    router.post('/:id/invite', authMiddleware,
        param('id').isInt(),
        user.inviteToGuild
    )
    router.delete('/:id/delete', authMiddleware,
        param('id').isInt(),
        user.deleteById
    );
  
    app.use('/users', router);
};