import { Link } from "react-router-dom"
import FiltroGenerosCine from "./FiltroGenerosCine"
import FiltroGenerosTv from "./FiltroGenerosTv"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const Header = () => {
  const [txtbuscar, setTxtbuscar] = useState('');
  const navigate = useNavigate();
   const menejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    
    const manejoEnvio = (event) => {
        event.preventDefault();
        navigate('/busquedas', {
            state: txtbuscar,
        });

    };
  return (
<div className="container-fluid bg-dark px-0">
  <div className="row gx-0 wow fadeIn" data-wow-delay="0.1s">
    <div className="col-lg-3 bg-primary d-none d-lg-block">
      <a href="index.html" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
        <h1 className="m-0 display-6 text-white text-uppercase">Ar Movie</h1>
      </a>
    </div>
    <div className="col-lg-9">
      <div className="row gx-0 d-none d-lg-flex bg-dark">
       
   <form className="d-flex p-3" onSubmit={manejoEnvio}>
        <input value={txtbuscar} onChange={menejoTxt} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

       
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark p-3 p-lg-0 px-lg-5" style={{background: '#111111'}}>
        <a href="index.html" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-6 text-primary text-uppercase">Ar Movie</h1>
        </a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-nav mr-auto py-0">

            <Link to={"/tendencias/tendenciasCine"} href="#" className="nav-item nav-link">Tendencias Cine</Link>
            
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Generos Cine</a>
              <div className="dropdown-menu rounded-0 m-0">
                <FiltroGenerosCine/>
              </div>
            </div>
                        <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Generos Tv</a>
              <div className="dropdown-menu rounded-0 m-0">
                <FiltroGenerosTv/>
              </div>
            </div>
            <Link to={"/actores"} href="#" className="nav-item nav-link">Actores</Link>
          </div>
          <div className="d-none d-lg-flex align-items-center py-2">
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-twitter" />
            </a>
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>

  )
}

export default Header