import React from 'react'
import { useParams, Link, useNavigate  } from 'react-router-dom'

const Details = () => {

    const params = useParams();
    const navigate = useNavigate();

  return (
    <>
    <div className='detailsHeader'>
        <div>Producto</div>
        <Link to="/"><i className="fa-solid fa-chevron-left"></i></Link> {/*tambien se puede usar useNavigate para volver para atrás */}
        <button onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left"></i></button>
    </div>
    <div>Details of {params.id}</div>
    </>
  )
}

export default Details