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
})

let s3 = new aws.S3()

export default s3
