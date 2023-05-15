import React from 'react'
import { useParams, Link  } from 'react-router-dom'

const Details = () => {

    const params = useParams();

  return (
    <>
    <div className='detailsHeader'>
        <div>Producto</div>
         <Link to="/"><i className="fa-solid fa-chevron-left"></i></Link> {/*tambien se puede usar useNavigate para volver para atrás */}
    </div>
    <div>Details of {params.id}</div>
    </>
  )
}

export default Details