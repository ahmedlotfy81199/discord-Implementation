const router = require('express').Router();
const authController = require('../../controller/auth/auth');
const verify = require('../../helper/auth/verifytoken');


router.post('/register',
    async (req, res, next) => {
        return next()
    }, authController.register
)
router.post('/login',
    async (req, res, next) => {
        return next()
    }, authController.login
)
router.post('/resetpassword',
    async (req, res, next) => {
        return next()
    }, verify, authController.resetPassword
)
router.post('/sendverifycode',
    async (req, res, next) => {
        return next()
    }, verify ,authController.sendVerifyCode
)
router.post('/activeEmail',
    async (req, res, next) => {
        return next()
    }, verify ,authController.activeEmail
)
router.post('/sendforgetpasswordcode',
    async (req, res, next) => {
        return next()
    } ,authController.forgetPasswordCode
)
router.post('/forgetpassword',
    async (req, res, next) => {
        return next()
    } ,authController.forgetPassword
)
module.exports = router;