const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv').config();
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./models');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRouter = require('./router/user.router')(app);
const guildRouter = require('./router/guild.router')(app);
const authRouter = require('./router/auth.router')(app);
const carRouter = require('./router/car.router')(app);

app.use(errorMiddleware)

const start = async() => {
    try {
        app.listen(port, () => console.log(`app started on port ${port}`));
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true })
    } catch (e) {
        console.log(e);
    }
}

start()
