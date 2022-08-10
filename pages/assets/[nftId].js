import Header from '../../pieces/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../pieces/nft/NFTImage'
import Details from '../../pieces/nft/Details'
import ItemAction from '../../pieces/nft/ItemAction'
import Purchase from '../../pieces/nft/Purchase'

const style = {
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
    container: `container p-6`,
    topContent: `flex`,
  }

const Nft = () => {
    const { provider } = useWeb3()
    const [selectedNft, setSelectedNft] = useState()
    const [listings, setListings] = useState([])
    const router = useRouter()

    const nftModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getNFTModule('0x74bAE7d2532b5cFc5faE494330DBaC2fFC3F9037')
    }, [provider])

    useEffect(() =>{
        if(!nftModule) return
        ;(async () => {
            const nfts = await nftModule.getAll()

            const selectedNftItem= nfts.find(
                (nft) => nft.id === router.query.nftId
            )

            setSelectedNft(selectedNftItem)
        })()
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if(!provider) return
        
        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getMarketplaceModule('0x289E1753253a4eE657A884B2f3c1E2e773750167')

    }, [provider])

    useEffect(() => { 
        if(!marketPlaceModule) return
        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })()
    }, [marketPlaceModule])

    return (
      <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <Details selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemAction />
        </div>
      </div>
    </div>
  )
    }

export default Nft