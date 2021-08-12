import { Info, InfoOutlined, PlayArrow } from '@material-ui/icons'
import React from 'react'
import './featured.scss'

const Featured = () => {
    return (
        <div className="featured">
            <img src="https://c4.wallpaperflare.com/wallpaper/382/113/229/tv-show-suits-amanda-schull-dule-hill-wallpaper-preview.jpg" alt="salvation"/>

            <div className="info">
                <img src="https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABYx84qfMRn7AFsQJpeezLI7t8QBQm3FqeiXfYv_v0v946Gc9tTgDoWB6EHodrsDsSIyjY5OHiq1yCGkFdyh2u1OAWIv8xHdRajJG.png?r=581" alt='movie info'/>
                <span className='desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum nulla labore, molestiae natus excepturi repellat ipsam perferendis quibusdam aperiam quos ea, sit suscipit magni distinctio iste impedit error qui saepe!</span>

                <div className="buttons">
                    <button className="play"> 
                        <PlayArrow /> 
                        <span>Play</span> 
                    </button>
                    <button className="more"> 
                        <InfoOutlined style={{color:'white'}}/> 
                        <span>More  info</span>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Featured
