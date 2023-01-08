import React from 'react'

function ContentWrapperInfo(props) {
  return (
    <React.Fragment>
        <div className={`contentInfo border-bottom-${props.color} border-left-${props.color}`} style={{ boxShadow: `3px 3px 10px white`}}>
        <div className={` informacion `}>
            <div className="card-body">
                <div className="row no-gutters align-items-center" >
                    <div className=" col mr-2">
                        <div className={`datos  text-${props.fontColor} text-uppercase mb-1`}>{props.titulo}</div>
                        <div className="h5 mb-0 font-weight-bold text-danger">
                            {props.cifra}
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className={`${props.icono} fa-3x text-${props.color}`}></i>
                    </div>
                </div>
            </div>
        </div>
        </div>

    </React.Fragment>
  )
}

export default ContentWrapperInfo



