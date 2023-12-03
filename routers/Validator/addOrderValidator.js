const { check } = require('express-validator');

module.exports = [
    check('orderId')
        .exists().withMessage('Please insert order ID')
        .notEmpty().withMessage('Please do not leave order ID field empty'),

    check('customerName')
        .exists().withMessage('Please insert customer name')
        .notEmpty().withMessage('Please do not leave customer name field empty'),

    check('saler')
        .exists().withMessage('Please insert saler')
        .notEmpty().withMessage('Please do not leave saler field empty'),

    check('products')
        .isArray().withMessage('Products should be an array')
        .notEmpty().withMessage('Please provide at least one product'),

    check('products.*.productId')
        .exists().withMessage('Please insert product ID for each product')
        .notEmpty().withMessage('Please do not leave product ID field empty'),

    check('products.*.quantity')
        .exists().withMessage('Please insert quantity for each product')
        .notEmpty().withMessage('Please do not leave quantity field empty')
        .isNumeric().withMessage('Invalid product quantity. Numeric is required'),

    check('date')
        .notEmpty().withMessage('Please do not leave date field empty')
        .isISO8601().withMessage('Invalid date format. Please use YYYY-MM-DD (ISO8601 format) for the date field.'),

    check('totalPrice')
        .exists().withMessage('Please insert total price')
        .notEmpty().withMessage('Please do not leave total price field empty')
        .isNumeric().withMessage('Invalid total price. Numeric is required'),
];
