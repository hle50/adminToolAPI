require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const sequelize = require('./utils/database');

const Admin = require('./models/admin');
const Shop = require('./models/shop');

const shopRoute = require('./routes/shop');
const authRoute = require('./routes/auth');

const isAuth = require('./middlewares/isAuth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/admin', isAuth, shopRoute);
app.use('/auth', authRoute);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
  });

Shop.belongsTo(Admin, {constraints: true, onDelete: 'CASCADE'});
Admin.hasMany(Shop);

sequelize
    .sync({
        //  force: true
    })
    .then (res => {
        return Admin.findAll()
    })
    .then(all => {
        if(!all.length){
            Admin.create({
                email: 'admin1@vn.vn',
                password: bcrypt.hashSync('1Password$$$$', bcrypt.genSaltSync(10)),
                status: true,
            })
        }
    })
    .then(result => {
        app.listen(9000);
})
.catch (err => {
    console.log(err)
})
