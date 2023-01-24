const express     =   require("express");
const router = express.Router();
const controller_users = require('../controllers/auth');
const { signup_form_validator, signin_form_validator } = require('../helpers/validator');
const { uploadFile } = require('../helpers/firebaseStorage');

const handle_image_upload = (req, res, next) => {
    const lmage_upload = uploadFile.single('file');
    
    lmage_upload(req, res, function (err) {
        if (err) {
             
            res.status(500).send("Image upload error")
            // An unknown error occurred when uploading.
        } else {
            next()
        }
        // Everything went fine and save document in DB here.
    })
}
router.post('/sign-up', handle_image_upload, signup_form_validator, controller_users.sign_up);
router.post('/sign-in', signin_form_validator, controller_users.sign_in);

module.exports = router;