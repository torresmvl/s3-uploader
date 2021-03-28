import express, { urlencoded } from 'express'
import logger from 'morgan'
import rotas from './routes/index.js'
import s3 from './config/index.js'

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3000

const app = express()
app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(rotas)

s3.bucketExists(process.env.S3_BUCKET, (err) => {
  if (err) {
    return console.log(err)
  }
  app.listen(process.env.PORT || 3000, process.env.HOST, () => {
    console.log(`api rodando em: http://${HOST}:${PORT}`)
  })
})

export default app
