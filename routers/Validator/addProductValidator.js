const {check} = require('express-validator')
// name, import_price, retail_price, category, creation_date
module.exports=[
    check('name')
        .exists().withMessage('Please insert product`s name')
        .notEmpty().withMessage('Please do not leave product`s name field empty'),

    check('import_price')
        .exists().withMessage('Please insert valid product`s import price')
        .notEmpty().withMessage('Please do not leave product`s import price field empty')
        .isNumeric().withMessage('Invalid product`s import price, Numeric is required'),

    check('retail_price')
        .exists().withMessage('Please insert valid product`s retail price')
        .notEmpty().withMessage('Please do not leave product`s retail price field empty')
        .isNumeric().withMessage('Invalid product`s retail price, Numeric is required'),

    check('category')
        .exists().withMessage('Please insert valid product`s category')
        .notEmpty().withMessage('Please do not leave product`s category field empty'),

    check('creation_date')
        .notEmpty().withMessage('Please do not leave product`s creation date field empty')
        .isISO8601().withMessage('Invalid date format. Please use YYYY-MM-DD (ISO8601 format) for the date field.'),

    check('quantity')
        .exists().withMessage('Please insert valid product`s quantity')
        .notEmpty().withMessage('Please do not leave product`s quantity field empty')
        .isNumeric().withMessage('Invalid product`s quantity, Numeric is required'),
        
]