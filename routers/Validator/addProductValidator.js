const {check} = require('express-validator')

module.exports=[
    check('name')
    .exists().withMessage('Please insert product`s name')
    .notEmpty().withMessage('Please do not leave product`s name field empty'),

    check('price')
    .exists().withMessage('Please insert valid product`s price')
    .notEmpty().withMessage('Please do not leave product`s price field empty')
    .isNumeric().withMessage('Invalid product`s price, Numeric is required'),

    check('desc')
    .exists().withMessage('Please insert valid product`s description')
    .notEmpty().withMessage('Please do not leave product`s description field empty'),
]