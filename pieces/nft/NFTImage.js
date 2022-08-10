import React from 'react';
import { IoMdSnow } from 'react-icons/io'
import { AiOutlineHeart } from 'react-icons/ai'

const style = {
    topBarContent: `flex items-center`,
    likesCounter: `flex-1 flex items-center justify-end`,
}

const NFTImage = ({ selectedNft }) => {
    return (
        <div>
            <div className={style.topBar}>
                <div className={style.topBarContent}></div>
            </div>
            <div>
                <img src={selectedNft?.image} />
            </div>
        </div>
    )
}
export default NFTImage