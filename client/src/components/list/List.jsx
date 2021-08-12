import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useRef, useState } from 'react'
import './list.scss'
import ListItem from '../../listItem/ListItem'

const List = () => {

    const [ slideNumber, setSlideNumber ] =  useState(0);
    const listRef = useRef();

    const handleClick = (direction) =>{
        let distance = listRef.current.getBoundingClientRect().x - 50; //50 is 50px from the Arrow
        //distance declaration can only be in handleClick function, otherwise current return undefined

        if( direction === 'left' && slideNumber >0){
            setSlideNumber(slideNumber-1)
            listRef.current.style.transform = `translateX(${distance + 230}px)`
            console.log(slideNumber)

        }else if(direction === 'right' && slideNumber <5) {

            setSlideNumber(slideNumber+1)
            listRef.current.style.transform = `translateX(${distance - 230}px)`
            console.log(slideNumber)
        }
    }

    return (
        <div className='list'>
            <span className="listTitle">Continue to Watch</span>
            <div className="wrapper">
                {slideNumber ? <ArrowBackIosOutlined className="sliderArrow left" onClick={() =>handleClick('left')}/> : <></>}
                <div className="container" ref={listRef}>
                    <ListItem index={0}/>
                    <ListItem index={1}/>
                    <ListItem index={2}/>
                    <ListItem index={3}/>
                    <ListItem index={4}/>
                    <ListItem index={5}/>
                    <ListItem index={6}/>
                    <ListItem index={7}/>
                    <ListItem index={8}/>
                    <ListItem index={9}/>
                    <ListItem index={10}/>


                </div>
                <ArrowForwardIosOutlined className="sliderArrow right" onClick={() =>handleClick('right')} style={{display: slideNumber === 5  && 'none'}}/>
            </div>
        </div> 
    )
}

export default List
