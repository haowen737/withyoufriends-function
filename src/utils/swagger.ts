
import * as Swagger from 'swagger-client'
// import * as https from "https"

// declare const Swagger: any

interface I {
  init: () => Promise<any>,
  apis: any
}

// const httpsAgent = new https.Agent({ rejectUnauthorized: false })
const url = `/swagger.json`
const isDev = process.env.NODE_ENV === 'development'
// const url = `${window.location.protocol}//localhost:3002/swagger.json`
const apiWrappper = function (apis: any) {
  if (!apis) {
    throw new Error('api should be array')
  }
  const wrapped = {}
  Object.keys(apis).forEach(k => {
    const routes = apis[k]
    wrapped[k] = {}
    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        const route = routes[key]
        wrapped[k][key] = routeWrapper(route)
      }
    }
  })

  return wrapped
}

const routeWrapper = function (route: any) {
  return (params: any) => new Promise((resolve, reject) => {
    route(params)
      .then((res: any) => {
        console.log('res----', res)
        const body = res.body
        resolve(body)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

const internals: I = {
  init: (): Promise<any> => {
    return new Promise((resolve, reject) => {
      Swagger({ url })
        .then((client: any) => {
          
          client.spec.schemes = !isDev
            ? ['https']
            : ['http']
          client.spec.host = isDev && 'localhost:3000'

          internals.apis = apiWrappper(client.apis)
          resolve(internals.apis)
        })
        .catch((err: any) => {
          internals.apis = {}
          reject(err)
        })
    })
  },
  apis: {},
}

// Object.definePropertie(internals, 'apis', {
//   get: function () {
//     return c
//   }
// })

export {
  internals as default
}
