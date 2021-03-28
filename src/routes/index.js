import express from 'express'
import multer from 'multer'
import s3 from '../config/index.js'

const router = express.Router()

let storage = multer.memoryStorage()
const upload = multer({ storage: storage }).single('file')

router.get('/status', (req, res) => {
  res.status(200).json('OK')
})

router.post('/upload', upload, (req, res) => {
  s3.putObject(
    process.env.S3_BUCKET,
    req.file.originalname,
    req.file.buffer,
    (err, etag) => {
      if (err) {
        return console.log(err)
      }
      s3.presignedUrl(
        'GET',
        process.env.S3_BUCKET,
        req.file.originalname,
        4 * 60 * 60,
        (err, presignedUrl) => {
          if (err) {
            return console.log(err)
          }
          res.status(200).json({ fileUrl: presignedUrl })
          console.log(req.file.buffer)
        }
      )
    }
  )
})

export default router
