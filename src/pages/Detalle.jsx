import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import CardActores from "../components/CardActores";
import ReactMarkdown from 'react-markdown';

const Detalle = () => {
    const [datos, setDatos] = useState([]);

    const [datareparto, setDatareparto] = useState({});
    const [dataproduccion, setdProduccion] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [trailers, setTrailers] = useState([]);
    const [selectedTrailer, setSelectedTrailer] = useState(null);




    const navigate = useNavigate();
    const params = useParams()
    let tipo = params.tipo;
    let id = params.id;
    let API = "";
    let APIVideos = "";
    if (tipo == "cine") {
        API = `https://api.themoviedb.org/3/movie/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
        APIVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=en-US`
    } else {
        API = `https://api.themoviedb.org/3/tv/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
        APIVideos = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=en-US`
    }

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data);
            console.log("Datos de la película/serie:", data);

            const Pelicula = data.original_title || data.name;
            console.log("Pelicula:", data.original_title || data.name);



            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleHiddenModal = () => {
            setSelectedTrailer(null); // Limpiar selección
        };

        const modalEl = document.getElementById('modalVerTrailer');
        if (modalEl) {
            modalEl.addEventListener('hidden.bs.modal', handleHiddenModal);
        }

        return () => {
            if (modalEl) {
                modalEl.removeEventListener('hidden.bs.modal', handleHiddenModal);
            }
        };
    }, []);

    const [isLoading, setIsLoading] = useState(false);


    const getVideo = async () => {
        try {
            const response = await fetch(APIVideos);
            const data = await response.json();
            const ytTrailers = data.results.filter(
                (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            setTrailers(ytTrailers);
            if (ytTrailers.length > 0) {
                setTrailers(ytTrailers); // solo guardamos los tráilers
            }
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const APICredits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`;
    const getReparto = async () => {
        try {
            const response = await fetch(APICredits);
            const data = await response.json();


            const sortedCast = [...data.cast].sort((a, b) =>
                b.popularity - a.popularity
            );

            setDatareparto(sortedCast);
            setdProduccion(data.crew);



            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };


    useEffect(() => {
        getDatos();
        getReparto();
        getVideo();
        // Limpiar selectedTrailer cuando se cierre el modal
        const modalEl = document.getElementById("modalTrailers");
        if (modalEl) {
            modalEl.addEventListener("hidden.bs.modal", () => {
                setSelectedTrailer(null);
            });
        }

        return () => {
            if (modalEl) {
                modalEl.removeEventListener("hidden.bs.modal", () => { });
            }
        };
    }, []);



    const ruta = "https://image.tmdb.org/t/p/original/";


    function formatDateToLocal(dateString) {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options);
    }








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



    const parseResponse = (text) => {
        if (!text) return null;

        // Dividir en párrafos
        const paragraphs = text.split(/\n\s*\n/);

        return paragraphs.map((paragraph, i) => {
            // Convertir *palabras* en <strong>
            const strongText = paragraph.replace(/\*(.+?)\*/g, '<strong>$1</strong>');

            return (
                <p key={i} dangerouslySetInnerHTML={{ __html: strongText }} />
            );
        });
    };
    const handleTrailerClick = (trailer) => {
        setSelectedTrailer(trailer);
        // Usamos setTimeout para asegurar que el modal esté listo
        setTimeout(() => {
            const modal = new window.bootstrap.Modal(document.getElementById('modalVerTrailer'));
            modal.show();
        }, 100);
    };

    return (
        <div className="bg-dark text-white">
            <div className="banner" style={{ backgroundImage: "url(" + ruta + datos.backdrop_path + ")" }}>



                <div className="sombra">
                    <h1 className="pt-5 display-1 banner_titulo">{datos.title || datos.name}</h1>
                    <h5 className="pt-5 display-4 banner_titulo">{datos.tagline}</h5>

                    {datos.genres && datos.genres.length > 0 && (
                        <h5 className="display-5 banner_titulo">Genero: {datos.genres[0].name}</h5>
                    )}

                    <h5 className="display-5">Titulo Original: {datos.original_title} </h5>
                    <h5 className="display-5">Lenguaje Original: {datos.original_language} </h5>

                    {datos.vote_average && datos.vote_average > 0 && (
                        <h2 className="my-4">Average: <span className=" badge lg-ba bg-warning p-2">{datos.vote_average.toFixed(1)}%</span></h2>
                    )}

                    <p className="banner_descripcion">{datos.overview}</p>

                    <div className="my-3">

                        <div className="d-flex ">
                            {trailers.length > 0 ? (
                                trailers.slice(0, Math.min(trailers.length, 5)).map((t, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-danger me-2"
                                        onClick={() => handleTrailerClick(t)}
                                    >
                                        Ver Trailer {index + 1}
                                    </button>
                                ))
                            ) : (
                                <p className="text-warning">No hay trailers disponibles</p>
                            )}

                        </div>
                        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
                            Regresar
                        </button>

                    </div>
                    {datos.release_date && (
                        <h5 className="py-3">Fecha de Lanzamiento:  {formatDateToLocal(datos.release_date || datos.first_air_date)}</h5>
                    )}
                </div>
            </div>

            {Array.isArray(datareparto) && (

                <section className="container  py-5">

                    <h3 className="text-center text-white py-4">Reparto de la pelicula ({Array.isArray(datareparto) && datareparto.length}) actores</h3>
                    <div className="row row-cols-lg-6 m-2 justify-content-center">
                        {datareparto.map((item, index) => (
                            item.profile_path && item.profile_path !== "" ? (
                                <CardActores key={index} item={item} />
                            ) : null
                        ))}
                    </div>
                </section>
            )}
            <hr className="py-1" />
            {Array.isArray(dataproduccion) && (
                <section className="container py-5 ">

                    <h3 className="text-center text-white py-4">Producción</h3>
                    <div className="row">
                        {Array.isArray(dataproduccion) && dataproduccion.map((item, index) => (
                            item.profile_path && item.profile_path !== "" ? (
                                <div className="col-6 col-sm-6 col-md-4 col-ls-3  mb-4" key={index}>
                                    <div className="card mb-3 bg-secondary"  >
                                        <div className="row g-0">
                                            <div className="col-md-4 m-0">
                                                <img src={ruta + item.profile_path} className="card-img-top" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <p className="text-dark">
                                                        <b> {item.name}</b><br /><br />
                                                        <b>Departamento: </b>
                                                        {item.department}<br /><br />
                                                        <b>Cargo:</b> {item.job}<br /><br />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>

                </section>
            )}




            {/* Modal para mostrar el tráiler seleccionado */}
            {/* Modal del reproductor */}
            {selectedTrailer && (
                <div className="modal fade" id="modalVerTrailer" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedTrailer.name || 'Reproduciendo Trailer'}</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-center p-0">
                                <YouTube
                                    key={selectedTrailer.key}
                                    videoId={selectedTrailer.key}
                                    opts={{
                                        width: "100%",
                                        height: "500px",
                                        playerVars: {
                                            autoplay: 1,
                                            modestbranding: 1,
                                            rel: 0,
                                        },
                                    }}
                                    onStateChange={(event) => {
                                        // Si el video está terminado o pausado, lo limpiamos al cerrar el modal
                                        const modalEl = document.getElementById("modalVerTrailer");
                                        if (modalEl) {
                                            modalEl.addEventListener("hidden.bs.modal", () => {
                                                event.target.stopVideo(); // Detiene el video cuando se cierra el modal
                                                setSelectedTrailer(null); // Opcional: resetear selección
                                            });
                                        }
                                    }}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Detalle