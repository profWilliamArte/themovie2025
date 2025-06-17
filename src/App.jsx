import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

import Tendencias from "./pages/Tendencias"
import Generos from "./pages/Generos"
import Detalle from "./pages/Detalle"
import Peliculas from "./pages/Peliculas"
import Error404 from "./pages/Error404"
import Actores from "./pages/Actores"
import Busquedas from "./pages/Busquedas"


const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
          <Routes>
              <Route path="/" element={<Tendencias />} />
              <Route path="/tendencias/:tipo" element={<Tendencias />} />
              <Route path="/generos/:tipo/:genero/:id" element={<Generos />} />
              <Route path="/detalle/:tipo/:id" element={<Detalle/>} />
              <Route path="/peliculas/:id/:actor" element={<Peliculas/>} />
               <Route path="/actores" element={<Actores/>} />
                <Route path="/busquedas" element={<Busquedas/>} />
              <Route path="*" element={<Error404 />} />


          </Routes>
        <Footer/>
      </div>
    
    </BrowserRouter>
  )
}

export default App