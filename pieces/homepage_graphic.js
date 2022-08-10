import React from 'react'
import Link from 'next/link'

const Homepage_Graphic = () => {
    return <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
            Check out some Catty NFT collections!
            </div>
            <div className={style.description}>
              Go on, we won't judge.
            </div>
            <div className={style.ctaContainer}>
              <Link href='collections/0x74bAE7d2532b5cFc5faE494330DBaC2fFC3F9037'>
                <button className={style.accentedButton}>Investigate</button>
              </Link>
            </div>
          </div>
          <div className={style.cardContainer}>
            <img className="rounded-t-lg" 
            src='https://i.imgur.com/mjrjYS8.png'
            alt=""
            />
            <div className={style.infoContainer}>
              <img
                className="h-[3.5rem] rounded-full"
                src="https://i.imgur.com/ufjtTob.png"
                alt=""
              />
              <div className={style.author}>
                <div className={style.name}>Bean</div>
                <a
                  className="text-[#1868b7]"
                  href='/'>
                    Matthew
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
}

//styling from tailwind CSS
const style = {
  wrapper: `relative`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem]`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  //bit of a hack here -- made a container -- before any content, show the image first
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://images.unsplash.com/photo-1618022325802-7e5e732d97a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
  copyContainer: `w-1/2`,
  title: `relative text-white text-[46px] font-semibold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}
//styling from tailwind CSS

export default Homepage_Graphic