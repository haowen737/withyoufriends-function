const fs = require('fs')
const path = require('path')


export default (request, response) => {
  const { id } = request.query
  const res = fs.readFileSync(path.join(__dirname, '../../doc', `${id}.md`), 'utf-8')
  response.status(200).send({ content: res })
}