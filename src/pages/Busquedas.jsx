import { useEffect, useState } from "react";

import Paginador from "../components/Paginador";
import { Link, useLocation  } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";
import CardActores from "../components/CardActores";



const Busquedas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const txtBuscar = location.state;


    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);




   
    const API = `https://api.themoviedb.org/3/search/multi?api_key=ecbcdcf9044928d12b179d9153f5a269&query=${txtBuscar}&language=es-VE`
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
    }, [txtBuscar,page]);


    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando las Peliculas...</p>


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

            <h1 class=" text-secondary text-center my-5">Busquedas {txtBuscar} </h1>
   
            <div className="container">
                <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                <div className="row row-cols-lg-6 m-2 justify-content-center">
                    {datos.map((item, index) => {
                        // Si es una persona, muestra CardActores, si no, muestra CardPeliculas
                        if (item.media_type === "person") {
                            return <CardActores key={index} item={item} />;
                        } else {
                            return <CardPeliculas key={index} item={item} tipo={item.media_type} />;
                        }
                    })}
                </div>
            </div>

        </div>
    )
}

export default Busquedas