import React from 'react'
import { Link } from 'react-router-dom'

const CardActores = ({ item }) => {
    return (
        <div className="col-6 col-sm-6 col-md-4 col-ls-3 col-xl-2 mb-4">
            <div className="card  text-center text-black-50 h-100 ">
                <div className="card-header p-0">
                    <img src={`https://image.tmdb.org/t/p/original/${item.profile_path}`} alt={item.profile_path} className="card-img-top " />
                </div>
                <div className="card-body  text-black">
                    <p className="small">
                        {item.name}
                        <br />
                        <span className="small text-black">{item.character}</span> <br />
                        <span className="small text-dark"><b>Popularidad: {item.popularity}</b></span>
                    </p>
                </div>

                <div className="card-footer">
                    <Link to={`/peliculas/${item.id}/${item.name}`} href="#" className="btn btn-danger d-grid btn-sm">Peliculas</Link>
                </div>
            </div>
        </div>

    )
}

export default CardActores