const fs = require('fs')
const path = require('path')


export default (request, response) => {
  const res = fs.readFileSync(path.join(__dirname, '../../doc', 'index.json'), 'utf-8')
  response.status(200).send(JSON.parse(res))
}