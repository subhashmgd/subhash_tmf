const collection_users = require("../mongo/models/collection_users")
var jwt = require('jsonwebtoken');

const sign_up = async (req, res) => {

    try {

        let image_link = "";
        //get uploaded image link
        if (req.file) {
            image_link = req.file.fileRef.metadata.mediaLink
        }

        //get data from req body
        let { name, email, password, mobile, dob, gender } = req.body;

        //encript password
        password = require('crypto').createHash('sha1').update(password).digest('base64');

        //create new entry
        let new_entry = new collection_users({
            name,
            email : email.toLowerCase(),
            password,
            mobile,
            dob,
            gender,
            image_link
        })

        //save entry 
        await new_entry.save()

        //send new registered user details;
        res.send("Registerd successfully")
    } catch {
        //internal error
        res.status(500).send("Internal Error")
        
    }
}

const sign_in = async (req, res) => {

    try {

        let email = req.body.email.toLowerCase();
        let password = require('crypto').createHash('sha1').update(req.body.password).digest('base64');
        
        // get user details 
        let result = await collection_users.findOne({ email }, { password: 1 })
        
        if (result) {

            if (result.password == password) {
                let token = jwt.sign({
                    user_id: result._id
                }, process.env.JWT_SECRET, { expiresIn: '1d' });
                
                res.send({ token })
                
            } else {
                res.status(401).send("Invalid email or password")
            }
            
        } else {
            res.status(401).send("Account does not exist")
        }

    } catch {
        //internal error
        res.status(500).send("Internal Error")
        
    }
    
}

module.exports = { sign_up, sign_in }
