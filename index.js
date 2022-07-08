import express from "express"
const app = express()

import PasswordRoutes from './routes/password.js'




// app.use(bodyParser.json({ limit: "30mb", extended: true }))
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors());

app.use('/password', PasswordRoutes)





  const PORT = 3001
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })