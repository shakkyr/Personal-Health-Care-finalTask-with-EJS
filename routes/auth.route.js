const router = require('express').Router();

const bodyParser = require("body-parser");

const check = require('express-validator').check

authGuard =require('./guards/auth.guard')

const authController = require('../controllers/auth.controller')


router.get('/signup',authGuard.notAuth, authController.getSignup)

router.post('/signup', 
bodyParser.urlencoded({extended: true}),
check("username")
.not()
.isEmpty()
.withMessage("username is required"),
check("email")
.not()
.isEmpty()
.withMessage("email is required")
.isEmail()
.withMessage("invalid format"),
check("password")
.not()
.isEmpty()
.withMessage("password is required")
.isLength({ min: 6 })
.withMessage("password must be at least 6 charachters"),
check("confirmPassword").custom((value, { req }) => {
if (value === req.body.password) return true;
    else throw "Passwords is not identical"
}),
authController.postSignup
);


router.get('/login',authGuard.notAuth, authController.getLogin);

router.post(
    "/login",
    
    bodyParser.urlencoded({ extended: true }),
    check("email")
        .not()
        .isEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid format"),
    check("password")
        .not()
        .isEmpty()
        .withMessage("password is required")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 charachters"),
    authController.postLogin
);

router.all('/logout',authGuard.isAuth, authController.logout)

module.exports = router;