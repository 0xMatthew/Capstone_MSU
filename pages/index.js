import { useWeb3 } from '@3rdweb/hooks'
import Head from 'next/head'
import { useEffect } from 'react'
import Header from '../pieces/Header.js'
import Homepage_Graphic from '../pieces/homepage_graphic.js'
import { client } from '../lib/sanity_client'
import toast, { Toaster } from 'react-hot-toast' 

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#267DFA] bg-[#267DFA] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

export default function Home() {
  //using web3hook
  const{ address, connectWallet } = useWeb3()

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome ${userName !== 'unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#080808',
          color: '#fff',
        },
      }
    )
  }

  //useEffect will only trigger when a user logs in
  //passes username and wallet address from MetaMask
  //id is wallet address, so only one entry into sanity database exists per wallet address
  useEffect(() => {
    if(!address) return
    ;(async() => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: "unknown username",
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc)

      //react-hot-toast pop-up
      welcomeUser(result.userName)
    })()
  }, [address])
  
  return (
  <div className={style.wrapper}>
    <Toaster position='bottom-center' reverseOrder={false} />
    {address ? (
    //conditionally renders either the header/Homepage_Graphic OR loads the button to connect MetaMask wallet
    <>
      <Header />
      <Homepage_Graphic />
    </>
    ) : (
      <div className ={style.walletConnectWrapper}>
        <button
          className={style.button}
          onClick={() => connectWallet('injected')}
        >
          Connect your MetaMask wallet
        </button>
        <div className={style.details}>
          Connect using your MetaMask wallet. Make sure that the Chrome extension for MetaMask is installed.
        </div>
      </div>
    )}
  </div>
  )
}