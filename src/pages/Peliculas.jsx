import { useEffect, useState } from "react";
import CardPeliculas from "../components/CardPeliculas";
import { useParams } from "react-router-dom";
const API  ='https://api.themoviedb.org/3/person/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc'; 

const Peliculas = () => {
    const [datos, setDatos] = useState([]);
    const [datosActor, setDatosActor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const param=useParams();
    const id = param.id; // id de la
    const actor= param.actor; // nombre del actor
    const API  =`https://api.themoviedb.org/3/person/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`; 
    const API2 =`https://api.themoviedb.org/3/person/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`; // datos del actor

    // pekiculas del actor
    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

             // ORDENAR POR POPULARIDAD DESCENDENTE (aquí está la clave)
                const sortedCast = [...data.cast].sort((a, b) =>
                    b.popularity - a.popularity
                );
            setDatos(sortedCast);
            
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    const getActor = async () => {
        try {
            const response = await fetch(API2);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatosActor(data);

            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
        getActor();
    }, [id]);
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
       
        <div className="container">
        <div className="row border-bottom my-5 pb-3">
            <div className="col-md-2">
                <img src={`https://image.tmdb.org/t/p/w500/${datosActor.profile_path}`} alt={datosActor.name} className="img-fluid rounded" width={'300'} />
            </div>
            <div className="col-md-10">
                <h2 className="text-white"><strong>Nombre: </strong> {datosActor.name}</h2>
                <p><strong>Popularidad: </strong> {datosActor.popularity}</p>
                <p><strong>Fecha de Nacimiento: </strong> {datosActor.birthday || "No date available."}</p>
                <p><strong>Biografia: </strong> {datosActor.biography || "No biography available."}</p>
                
            </div>
        </div>
        <h1 class=" text-secondary text-center my-5">Peliculas de {actor} ({datos.length})</h1>
        <div className="row">
            {datos.map((item) => (
                <CardPeliculas key={item.id} item={item} tipo={'cine'} />
            ))}
        </div>
        </div>

    </div>
  )
}

export default Peliculas