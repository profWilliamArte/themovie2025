import { useEffect, useState } from "react";
import CardPelCine from "./CardPeliculas";
import Paginador from "../components/Paginador";
import { Link } from "react-router-dom";
const API  ='https://api.themoviedb.org/3/genre/tv/list?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE';

const FiltroGenerosTv = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.genres);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);
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
   <>
    {datos && datos.map((item) => (
         <Link  to={`/generos/tv/${item.name}/${item.id}`} key={item.id} href="feature.html" className="dropdown-item">{item.name}</Link>
     ))}
 
 </>
  )
}

export default FiltroGenerosTv