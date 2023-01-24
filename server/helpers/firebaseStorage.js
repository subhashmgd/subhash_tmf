
const Multer = require('multer')
const FirebaseStorage = require('multer-firebase-storage')

const uploadFile = Multer({
  
  storage: FirebaseStorage({
    bucketName: process.env.BUCKET_NAME,
    unique:true,
    credentials: {
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATEKEY,
      projectId: process.env.PROJECT_ID
    }
  })
})

module.exports = { uploadFile }