const http = require('http')
const fs = require('fs')
const path = require('path')

function static(req, res) {
  const filePath = path.join(__dirname, req.url)

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return res.end(fs.readFileSync(filePath))
  }

  return res.end(fs.readFileSync(path.join(__dirname, 'index.html')))
}

http
  .createServer(static)
  .listen(4000, () => console.log(`listening on port 4000`))
