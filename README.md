Quick Start


//Install packages

//create .env file with bellow variables

PORT=//port to run project<br />
BUCKET_NAME= //firebase bucket name<br />
CLIENT_EMAIL= //firebase email<br />
PRIVATEKEY= //firebase private key<br />
PROJECT_ID= //firebase project id<br />
JWT_SECRET= //jwt secret key<br />
MONGO_URL= //mongodb url <br />


API STRUCTURE 

1. SIGN UP


url : {DOMAIN}/auth/sign-up<br />
Media type :  multipart/form-data<br />
method : post<br />
sample data : {<br />
mobile:"777777777"<br />
email:"email19@test.test"<br />
password:"Staff##01@1"<br />
dob:"2012-12-21"<br />
gender:"Male"<br />
name:"subhash"<br />
}

validation rules : {<br />
mobile: required, start with 7/6/8/9 and 10 degit <br />
email: required, valid email Id<br />
password: required, Minimum eight characters, with at least a symbol, upper and lower case letters and a number<br />
dob: required, valid date<br />
gender: required, should be male, female or transgender<br />
name: required<br />
file : file <br />
}<br />


2. LOGIN

url : {DOMAIN}/auth/sign-in<br />
method : post<br />
sample data : {<br />
email:"email19@test.test"<br />
password:"Staff##01@1"<br />
}

//save token from response to get profile

3. PROFILE

url : {DOMAIN}/user/profile<br />
method : get<br />
header {<br />
x-access-token : [TOKEN FROM LOGIN API]<br />
}<br />

