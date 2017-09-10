import installRoutes from './routes'
import installSeeds from './seeds'

const install = () => {
  installRoutes()
  installSeeds()
}

export default install
