import { useEffect, useState } from "react";

import Paginador from "../components/Paginador";
import { Link, useParams } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";
import CardActores from "../components/CardActores";


const Actores = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams()
    const id = params.id;

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);




    const API = `https://api.themoviedb.org/3/person/popular?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&page=${page}`;;
    const getDatos = async () => {
        try {

            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Ordenar por popularidad descendente
            const sortedCast = [...data.results].sort((a, b) =>
                b.popularity - a.popularity
            );


            setDatos(sortedCast);
            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, [page]);


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
                <p class="text-center my-5">{API}</p>

            </div>
        );
    }

    return (
        <div class="container-fluid bg-dark text-secondary px-5">

            <h1 class=" text-secondary text-center my-5">Actores </h1>

            <div className="container">
                <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                <div className="row row-cols-lg-6 m-2 justify-content-center">
                    {datos.map((item, index) => (
                        item.profile_path && item.profile_path !== "" ? (
                        <CardActores key={index} item={item} />
                         ) : null
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Actores