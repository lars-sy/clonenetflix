import React from 'react' 
import './FeaturedMovie.css'

export default ({ item }) => {

    let firstDate = new Date(item.first_air_date)
    let description = item.overview
    let genres = []  
    
    for (let indice in item.genres){
        genres.push(item.genres[indice].name)
    }

    return(
        <section className="featured" style={{
            backgroundsize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `URL(https://image.tmd.org/t/p/original${item.backdrop_path})` 
        }}>
            <div className="featured--vertical" >
                <div className='featured-horizontal'>
                    <div className='featured--name'>{item.name}</div>
                    <div className='featured-info'>
                        <div className='featured--points'>{item.vote_average}</div>
                        <div className='featured--year'>{firstDate.getFullYear()}</div>
                        <div className='featured--seasons'>
                            {item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className='featured--description'>
                        {description}
                    </div>
                    <div className='featured--buttons'>
                        <a 
                        href={`/watch/${item.id}`}
                        className="featured--watchButton">
                            Assistir
                        </a>
                        <a
                            href={`/list/add/${item.id}`}
                            className="featured--mylistbutton">
                                Minha Lista
                        </a>
                    </div>
                    <div className='featured--genres'>
                        <sytrong>Gêneros: </sytrong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )

}