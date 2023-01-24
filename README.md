Quick Start


Intall packages

create .env file with bellow variables

PORT=//port to run project
BUCKET_NAME= //firebase bucket name
CLIENT_EMAIL= //firebase email
PRIVATEKEY= //firebase private key
PROJECT_ID= //firebase project id
JWT_SECRET= //jwt secret key
MONGO_URL= //mongodb url 


API STRUCTURE 

1. SIGN UP


url : {DOMAIN}/auth/sign-up
Media type :  multipart/form-data
method : post
sample data : {
mobile:"777777777"
email:"email19@test.test"
password:"Staff##01@1"
dob:"2012-12-21"
gender:"Male"
name:"subhash"
}

validation rules : {
mobile: required, start with 7/6/8/9 and 10 degit 
email: required, valid email Id
password: required, Minimum eight characters, with at least a symbol, upper and lower case letters and a number
dob: required, valid date
gender: required, should be male, female or transgender
name: required
file : file 
}


2. LOGIN

url : {DOMAIN}/auth/sign-in
method : post
sample data : {
email:"email19@test.test"
password:"Staff##01@1"
}

//save token from response to get profile

3. PROFILE

url : {DOMAIN}/user/profile
method : get
header {
x-access-token : [TOKEN FROM LOGIN API]
}

