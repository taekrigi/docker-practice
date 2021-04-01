const express = require('express')
const app = express()
const path = require('path')

const PORT = 8080 || process.env.PORT

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use(express.json())

const visitingList = []

app.get('/visit', (req, res) => {
  res.json(visitingList)
})

app.post('/visit', (req, res) => {
  const { name } = req.body
  const data = { name, createdAt: new Date() }
  visitingList.push(data)
  res.json(data)
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../', 'frontend', 'build', 'index.html'))
)

app.listen(PORT, () => console.log(`Server Ruuning on Port: ${PORT}`))
