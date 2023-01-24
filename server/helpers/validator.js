const validator = require('validatorjs');
const collection_users = require("../mongo/models/collection_users")
var jwt = require('jsonwebtoken');

let sign_up_validation_rules = {
    name: 'required',
    email: 'required|email|email_used',
    password: ['required', 'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/'],
    dob: 'required|date',
    gender: ['required', 'gender'],
    mobile: ['required', 'regex:/^(7|6|8|9)[0-9]{9}$/'],
};

let sign_in_validation_rules = {
    email: 'required|email',
    password: 'required',
};

validator.register('gender', value => ["male", "female", "transgender"].includes(value.toLowerCase()),
    'Gender should be male, female or transgender');

//check if image is already used
validator.registerAsync('email_used', async function (value, attribute, req, passes) {

    let result = await collection_users.findOne({ email: value.toLowerCase() }, { _id: 1 })
    return !result ? passes() : passes(false, 'Email ID already registered')

});

//validate 
const signup_form_validator = async (req, res, next) => {

    try {
        
        //call validation rulse
        let validation = new validator(req.body, sign_up_validation_rules, {
            "regex.password": {
                string: 'Minimum eight characters, with at least a symbol, upper and lower case letters and a number'
            },
            "regex.mobile": {
                string: 'Invaid mobile'
            }
        }
        );
    
        let passes = () => { };
        let fails = () => { };

        const promise = new Promise((resolve) => {
            
            passes = () => { resolve(true); };
            fails = () => { resolve(false); };
        });

        validation.checkAsync(passes, fails);

        const result = await promise;

        if (result === false) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                error: validation.errors.all()
            });
        } else {
            next();
            
        }

    } catch {
        res.status(500).send("Internal erro sdr");
    }

}

const signin_form_validator = async (req, res, next) => {
    try {

        //call validation rulse
        let validation = new validator(req.body, sign_in_validation_rules);
        
        //validation success
        validation.passes(() => {
            next();
        })

        //validation failed
        validation.fails(() => {

            res.status(412).send({
                success: false,
                message: 'Validation failed',
                error: validation.errors
            });
        });


    } catch {
        res.status(500).send("Internal erro");
    }
}

const token_validation = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded, "decoded")
        req.user_id = decoded.user_id
        next()

    } catch (err) {
        // err
        // console.log(err)
        res.status(500).send("Failed to authenticate token.");

    }
}

module.exports = { signup_form_validator, signin_form_validator, token_validation }