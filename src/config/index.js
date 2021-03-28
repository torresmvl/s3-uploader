import dotenv from 'dotenv'
import minio from 'minio'

dotenv.config()

const S3_PORT = Number(process.env.S3_PORT)
const S3_ACCESS_KEY = String(process.env.S3_ACCESS_KEY)
const S3_SECRET_KEY = String(process.env.S3_SECRET_KEY)

const s3 = new minio.Client({
  endPoint: process.env.S3_ENDPOINT,
  port: S3_PORT,
  useSSL: false,
  accessKey: S3_ACCESS_KEY,
  secretKey: S3_SECRET_KEY
})

export default s3
