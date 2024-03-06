let express = require('express')
let router = express.Router()

const userMiddleware = require('../middlewares/userMiddleware')
const { verifyPayload } = require('../controllers/jwt');
const { userAuth } = require('../middlewares/Auth');

router.post('/register', userMiddleware.register);
router.post('/login', userMiddleware.login);
router.post('/verify', verifyPayload, userAuth)
router.post('/uploadImage', userMiddleware.upload.single('image'), userMiddleware.afterUpdate)
router.post('/updateProfile', userMiddleware.changeProfile)



module.exports = router;



