const {check} = require('express-validator')

module.exports=[
    check('username')
    .exists().withMessage('Please insert valid username')
    .notEmpty().withMessage('Please do not leave username field empty'),

    check('password')
    .exists().withMessage('Please insert valid password')
    .notEmpty().withMessage('Please do not leave password field empty')
    // .isLength({min:6}).withMessage('Invalid password - At least 6 characters or above is required for password field'),
]
