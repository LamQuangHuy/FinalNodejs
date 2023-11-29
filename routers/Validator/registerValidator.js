const {check} = require('express-validator')

module.exports=[
    check('email')
    .exists().withMessage('Please insert valid email')
    .notEmpty().withMessage('Please do not leave email field empty')
    .isEmail().withMessage('Invalid email'),

    check('password')
    .exists().withMessage('Please insert valid password')
    .notEmpty().withMessage('Please do not leave password field empty')
    .isLength({min:6}).withMessage('Invalid password - At least 6 characters or above is required for password field'),

    check('username')
    .exists().withMessage('Please insert valid username')
    .notEmpty().withMessage('Please do not leave username field empty')
    .isLength({min:6}).withMessage('Invalid password - At least 6 characters or above is required for password field')
]