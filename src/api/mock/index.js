import Promise from 'bluebird'
import installRoutes from './routes'
import installSeeds from './seeds'

const install = () => {
  return installSeeds()
    .then(() => {
      installRoutes()
      return Promise.resolve()
    })
}

export default install
