import dotenv from 'dotenv'
import minio from 'minio'
import aws from 'aws-sdk'

dotenv.config()

const S3_PORT = Number(process.env.S3_PORT)
const S3_ACCESS_KEY = String(process.env.S3_ACCESS_KEY)
const S3_SECRET_KEY = String(process.env.S3_SECRET_KEY)

aws.config.update({
  s3ForcePathStyle: true,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION,
  signatureVersion: 'v4'
});

// if (process.env.BACKEND === 1 ) 
let s3 = new aws.S3()

// s3 = new minio.Client({
//   endPoint: process.env.S3_ENDPOINT,
//   port: S3_PORT,
//   useSSL: false,
//   accessKey: S3_ACCESS_KEY,
//   secretKey: S3_SECRET_KEY
// })

export default s3
