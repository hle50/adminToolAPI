const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/shops', shopController.getShop);

router.get('/shop/:shopId', shopController.getShopById);

router.post('/shop', shopController.createShop);

router.put('/shop/:shopId', shopController.editShop);

module.exports = router;
