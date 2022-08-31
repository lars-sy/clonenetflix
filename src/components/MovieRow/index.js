import React, {useState} from 'react'
import './MovieRow.css'

export default ({ title, item }) => {
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX+ Math.round(windows.innerWidth/2)
        if (x>0){
            x= 0
        }
        setScrollX(x)
    }
    const handleRightArrow = () => {
        let x = scrollX- Math.round(windows.innerWidth/2)
        let listW = items.results.length * 150
        if((window.innerWidth - listW) > x) {
            x = (windows.innerWidth - listW) - 60
        }
        setScrollX(x)
    }

    return (
        <div className='movieRow'>
            <h2>{title}</h2>
            <div className='movieRow--left' onClick={handleLeftArrow}>
                <span style={{fontSize: 50}}> L </span>
            </div>
            <div className='movieRow--right' onClick={handleRightArrow}>
               <span style={{fontSize: 50}}> R </span>
            </div>
            <div className='movieRow--listarea'>
                <div className='movieRow--list' style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.result.map((item, key) => {
                        <div className='movieRow--item' key={key}>
                            <img src={`https://image.tmdb.org/y/p/w300${item.poster_path}`}
                                alt={item.original_title} />
                </div>    
                })}
                </div>
            </div>
        </div>
    )
}