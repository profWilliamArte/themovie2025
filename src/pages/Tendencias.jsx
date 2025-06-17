import { useEffect, useState } from "react";

import Paginador from "../components/Paginador";
import CardPeliculas from "../components/CardPeliculas";
import { Link, useParams } from "react-router-dom";



const Tendencias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    

    const param = useParams();
    let tipo = param.tipo; 
    if(!tipo) {
        tipo="tendenciasCine"
    }
    let titulo = "Tendencias en el Cine";
    let API='https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'
    let cineoTv = 'cine';
    if(tipo=="tendenciasCine") {
        API = `https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Tendencias en el Cine";
        cineoTv = 'cine'
        
    }    
    if(tipo=="tendenciasTv"){
        API = `https://api.themoviedb.org/3/tv/on_the_air?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Tendencias en el Televisión"; 
        cineoTv = 'tv'
         
    }
    if(tipo=="proximamente"){
        API = `https://api.themoviedb.org/3/movie/upcoming?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Proximamente en el Cine"; 
        cineoTv = 'cine'
        
    }
    if(tipo=="recientes"){
        API = `https://api.themoviedb.org/3/movie/now_playing?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Recientes en el Cine"; 
        cineoTv = 'cine'
        
    }
    if(tipo=="mejorvaloradasCine"){
        API = `https://api.themoviedb.org/3/movie/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Mejor valoradas en Cine"; 
        cineoTv = 'cine'
        
    } 
    if(tipo=="mejorvaloradasTv"){
        API = `https://api.themoviedb.org/3/tv/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&page=${page}`;
        titulo="Mejor valoradas en Tv";
        cineoTv = 'tv'
        
    }         
  
    
    

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.results);
            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, [tipo, page]);

    useEffect(() => {
        setPage(1);
    }, [tipo]);
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div class="container-fluid bg-dark text-secondary px-5">
            <h1 class=" text-secondary text-center my-5">{titulo}</h1>
            <div className="tab-class text-center">
                <ul className="nav nav-pills d-inline-flex justify-content-center bg-dark text-uppercase rounded-pill mb-5 " >
                    <li className="nav-item">
                        <Link to ={'/tendencias/tendenciasCine'} className={`nav-link rounded-pill text-white ${tipo === 'tendenciasCine' ? 'active' : ''}`}  >Tendencias Cine</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ={'/tendencias/tendenciasTv'} className={`nav-link rounded-pill text-white ${tipo === 'tendenciasTv' ? 'active' : ''}`} >Tendencias Tv</Link>
                    </li>
                    <li className="nav-item">
                        <Link to ={'/tendencias/proximamente'} className={`nav-link rounded-pill text-white ${tipo === 'proximamente' ? 'active' : ''}`}  >Próximamente Cine</Link>
                    </li>
                     <li className="nav-item">
                        <Link to ={'/tendencias/recientes'} className={`nav-link rounded-pill text-white ${tipo === 'recientes' ? 'active' : ''}`}  >Recientes</Link>
                    </li>
                     <li className="nav-item">
                        <Link to ={'/tendencias/mejorvaloradasCine'} className={`nav-link rounded-pill text-white ${tipo === 'mejorvaloradasCine' ? 'active' : ''}`}  >Mejor Valoradas Cine</Link>
                    </li>
                     <li className="nav-item">
                        <Link to ={'/tendencias/mejorvaloradasTv'} className={`nav-link rounded-pill text-white ${tipo === 'mejorvaloradasTv' ? 'active' : ''}`}  >Mejor Valoradas Tv</Link>
                    </li>
                </ul>

            </div>







            <div className="container">
                <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                <div className="row">
                    {datos.map((item) => (
                        <CardPeliculas key={item.id} item={item} tipo={cineoTv} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Tendencias