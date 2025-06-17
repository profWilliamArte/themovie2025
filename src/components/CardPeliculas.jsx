
import { Link } from "react-router-dom";
import ModalPeliculas from "./ModalPeliculas";


const CardPeliculas = ({item, tipo}) => {

function formatDateToLocal(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
}
    return (
        <div  className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-lg" >
                <div className="card-header p-0">
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="" />
                </div>
                <div className="card-body text-center bg-dark ">
                    <p>{item.title || item.name}</p>
                    <p className="text-danger">{item.popularity}</p>
                    <p><b>Estreno:</b> {formatDateToLocal(item.release_date || item.first_air_date)}</p>
                </div>
                <div className="card-footer text-center ">
                    <a href="#" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={`/detalle/${tipo}/${item.id}`} href="#" className="btn btn-primary">Detalle</Link>
                </div>
            </div>

            <ModalPeliculas item={item} />


        </div>
    )
}

export default CardPeliculas