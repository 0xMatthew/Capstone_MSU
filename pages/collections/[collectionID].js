import React, { useEffect, useState, useMemo } from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { ThirdwebWeb3Provider, useWeb3 } from '@3rdweb/hooks'
import { isReturnStatement, SymbolDisplayPartKind } from 'typescript'
import { client } from '../../lib/sanity_client'
import {ThirdwebSDK } from '@3rdweb/sdk'
import Header from '../../pieces/Header'
import NFT_card from '../../pieces/NFT_card'

const Collection = () => {
    const router = useRouter()
    const { provider } = useWeb3()
    const { collectionID } = router.query
    const [collection, setCollection] = useState({})
    const [nfts, setNfts] = useState([])
    const [listings, setListings] = useState([])
  
    const nftModule = useMemo(() => {
        if (!provider) return

        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getNFTModule(collectionID)
    }, [provider])

    //return all NFTs in our collection
    useEffect(() => {
        if (!nftModule) return
            ; (async () => {
                const nfts = await nftModule.getAll()

                setNfts(nfts)
            })() //immediately invoked function
    }, [nftModule])

    const marketPlaceModule = useMemo(() => {
        if(!provider) return

        const sdk = new ThirdwebSDK(provider.getSigner())
        return sdk.getMarketplaceModule(
            '0x289E1753253a4eE657A884B2f3c1E2e773750167'
        )
    }, [provider])

    //get every item in an NFT collection
    useEffect(() => {
        if(!marketPlaceModule) return
        ;(async () => {
            setListings(await marketPlaceModule.getAllListings())
        })() //immediately invoked function

    }, [marketPlaceModule])

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "${collectionID}" ] {
          "imageUrl": profileImage.asset->url,
          "bannerImageUrl": bannerImage.asset->url,
          volumeTraded,
          createdBy,
          contractAddress,
          "creator": createdBy->userName,
          title, floorPrice,
          "allOwners": owners[]->,
          description
        }`
    
        const collectionData = await sanityClient.fetch(query)
    

      await setCollection(collectionData[0])

    }

    useEffect(() => {
        fetchCollectionData()
    }, [collectionID])



    console.log(router.query)
    console.log(router.query.collectionID)
    return (
      <div className="overflow-hidden">
        <Header />
        <div className={style.bannerImageContainer}>
          <img
            className={style.bannerImage}
            src={
              collection?.bannerImageUrl
                ? collection.bannerImageUrl
                : 'www.google.com'
            }
            alt="banner"
          />
        </div>
        <div className={style.infoContainer}>
          <div className={style.midRow}>
            <img
              className={style.profileImg}
              src={
                collection?.imageUrl
                  ? collection.imageUrl
                  : 'www.google.com'
              }
              alt="profile image"
            />
          </div>
          <div className={style.midRow}>
            <div className={style.title}>{collection?.title}</div>
          </div>
          <div className={style.midRow}>
            <div className={style.createdBy}>
              Created by{' '}
              <span className="text-[#2081e2]">{collection?.creator}</span>
            </div>
          </div>
          <div className={style.midRow}>
            <div className={style.statsContainer}>
              <div className={style.collectionStat}>
                <div className={style.statValue}>{nfts.length}</div>
                <div className={style.statName}>items</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  {collection?.allOwners ? collection.allOwners.length : ''}
                </div>
                <div className={style.statName}>owner(s)</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.floorPrice}
                </div>
                <div className={style.statName}>floor price</div>
              </div>
              <div className={style.collectionStat}>
                <div className={style.statValue}>
                  <img
                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                    alt="eth"
                    className={style.ethLogo}
                  />
                  {collection?.volumeTraded}.5K
                </div>
                <div className={style.statName}>volume traded</div>
              </div>
            </div>
          </div>
          <div className={style.midRow}>
            <div className={style.description}>{collection?.description}</div>
          </div>
        </div>
        <div className="flex flex-wrap ">
          {nfts.map((nftItem, id) => (
            <NFT_card
              key={id}
              nftItem={nftItem}
              title={collection?.title}
              listings={listings}
            />
          ))}
        </div>
      </div>
    )
  }

  const style = {
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    bannerImageContainer: `h-[30vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
  }

  export default Collection