import React from 'react'

const ModalPeliculas = ({item}) => {
function formatDateToLocal(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}
    return (
        <div className="modal fade" id={item.id} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl ">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title text-white" id="exampleModalLabel">Detalle de la Pelicula</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="img-fluid img-thumbnail" alt="" />
                            </div>
                            <div className="col-8">
                                <h3 className="text-white">{item.title || item.name}</h3>
                                <p><b>Popularidad:</b> {item.popularity}</p>
                                <p><b>Calificacion:</b> {item.vote_average}</p>
                                <p><b>Fecha de Estreno:</b> {formatDateToLocal(item.release_date || item.first_air_date)}</p>
                                <p>{item.overview}</p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalPeliculas