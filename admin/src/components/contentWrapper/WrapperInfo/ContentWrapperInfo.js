import React from 'react'

function ContentWrapperInfo(props) {
  return (
    <React.Fragment>

        <div className={`card border-left-primary shadow h-100 py-2`}>
            <div className="card-body">
                <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className={`text-xs font-weight-bold text-primary text-uppercase mb-1`}>{props.name}</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {props.count}
                        </div>
                    </div>
                    <div className="col-auto">
                        <i className={`fas fa-user fa-2x text-gray-300`}></i>
                    </div>
                </div>
            </div>
        </div>


  

    </React.Fragment>
  )
}

export default ContentWrapperInfo



