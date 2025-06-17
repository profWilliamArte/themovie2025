import React from 'react'

const Paginador = ({page, setPage, totalPages}) => {
  return (
            <div className=" d-flex justify-content-between border-bottom border-secondary pb-1 mb-4">
                <div>
                    <p>Pagina {page} de {totalPages}</p>
                </div>
         
               <nav className=''>
                    <ul className="pagination pagination-sm">
                       <li className={`page-item ${page === 1 ? 'disabled' : ''}`}
                              onClick={() => {
                                if (page > 1) setPage(page - 1);
                            }}
                        >
                        <span className="page-link">&laquo;</span>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">{page}</a></li>
                        <li
                            className="page-item"
                            onClick={() => setPage(prevPage => prevPage + 1)}
                            >
                            <a className="page-link" href="#">&raquo;</a>
                            </li>
                    </ul>
                </nav>
          
        </div>
  )
}

export default Paginador