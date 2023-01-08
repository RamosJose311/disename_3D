import React from 'react'

function WarapperCategories(props) {
  return (
    <React.Fragment>
    <div className="  col-lg-6 mb-4">
        <div className="card text-danger bg-info shadow  ">
            <div className="centrar card-body font-weight-bold text-light bg-secondary" >
                {props.name}
            </div>
        </div>
    </div>





</React.Fragment>
  )
}

export default WarapperCategories
















