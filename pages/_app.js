import '../styles/globals.css'
//using thirdweb assets
import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

//using the rinkeby testnet chain
const supportedChainIds = [4]
//metamask is the connection method used by metamask
const connectors = {
  injected: {},
}
function MyApp({ Component, pageProps }) {

  //wrapping application in thirdweb3provider
  return(
  <ThirdwebWeb3Provider
    supportedChainIds={supportedChainIds}
    connectors={connectors}
  >
    <Component {...pageProps} />
  </ThirdwebWeb3Provider>
  )
  //wrapping application in thirdweb3provider
}

export default MyApp
