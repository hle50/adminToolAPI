const Sequeliz = require('sequelize');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const Shop = require('../models/shop');
const Admin = require('../models/admin');

const Op = Sequeliz.Op;
exports.getShop = (req, res, next) => {
    Shop.findAll({
        where: { adminId: 1 },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Admin,
                attributes: { exclude: ['password'] },
            }
        ]
    })
        .then(result => {
            res.status(200).json({
                data: result,
            })
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}
exports.createShop = (req, res, next) => {
    // todo need to do validation 
    const { email, name, phoneNumber, avatarUrl } = req.body;
    const shop = {
        email,
        name,
        password: bcrypt.hashSync('1Password$$$$'),
        phoneNumber,
        avatarUrl,
        adminId: req.userId
    };
    // find email and phonenumber 
    Shop.findAll({
        where: {
            [Op.or]: [{ 'email': email.toLowerCase() }, { 'phoneNumber': phoneNumber }]
        }
    })
        .then(existedItems => {
            if (!existedItems.length) {
                Shop.create(shop)
                    .then(result => {
                        res.status(200).json({
                            data: _.pick(result, ['email', 'name', 'phoneNumber', 'id']),
                            message: 'OK'
                        })
                    })
            } else {
                res.status(403).json({
                    message: 'Email or Phone number existed'
                })
            }
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}

exports.editShop = (req, res, next) => {
    const shopId = req.params.shopId;
    //todo check validation
    const { phoneNumber, avatarUrl, name } = req.body;
    Shop.findByPk(shopId)
        .then(shop => {
            if (!shop) {
                const error = new Error('Shop not found');
                error.statusCode = 4004;
                throw error;
            }
            shop.phoneNumber = phoneNumber;
            shop.avatarUrl = avatarUrl;
            shop.name = name;
            return shop.save();
        })
        .then(result => {
            res.status(200).json({
                data: result,
                message: 'OK',
            })
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}

exports.getShopById = (req, res, next) => {
    const shopId = req.params.shopId;
    //todo check validation
    Shop.findByPk(shopId)
        .then(shop => {
            if (!shop) {
                const error = new Error('Shop not found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                data: shop,
                message: 'OK',
            })
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}

exports.changeStatus = (req, res, next) => {
    const shopId = req.params.postId;
    //todo check validation
    Shop.findById(shopId)
        .then(shop => {
            if (!shop) {
                const error = new Error('Shop not found');
                error.statusCode = 404;
                throw error;
            }
            shop.status = req.body.status;
            shop.save();
        })
        .then(result => {
            res.status(200).json({
                data: shop,
                message: 'OK'
            })
        })
        .catch(error => {
            if (error.statusCode) {
                error.statusCode = 500;
            }
            next(error);
        })
}