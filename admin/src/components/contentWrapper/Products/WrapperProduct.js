import React from 'react'

function WrapperProduct(props) {
  return (
    <React.Fragment>

      <div className="contenido">
        <div className=" contenido1 card shadow mb-1">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto incorporado</h5>
          </div>
          <div className="contenido2 card-body">
            <div className="text-center">
              <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" src={props.imagen}  alt=""/>
            </div>
            <p className=" font-weight-bold text-black" >{props.description}</p>
            <a className="btn btn-danger" target="_blank" rel="nofollow" href={`http://localhost:4000/products/detalle/${props.id}`} >Ver detalles de Producto</a>
          </div>
        </div>
      </div>



    </React.Fragment>
  )
}

export default WrapperProduct
