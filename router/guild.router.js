module.exports = app => {
    const guild = require('../controllers/guild.controller.js');
    const authMiddleware = require('../middlewares/auth.middleware.js');

    const router = require("express").Router();

    router.post("/create", authMiddleware,  guild.create);
    router.get('/all', authMiddleware, guild.getGuildsList);
    router.put('/:id/increase-score', authMiddleware, guild.increaseScore); 
    router.get('/:id', authMiddleware, guild.getById);
    router.delete('/:id/delete', authMiddleware, guild.deleteById);
    router.post('/:id/apply', authMiddleware, guild.apply);
  
    app.use('/guilds', router);
};