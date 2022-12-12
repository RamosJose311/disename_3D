import React from 'react'

function GenresInDb({genre}) {
    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    {genre}
                </div>
            </div>
        </div>
    )
}
GenresInDb.defaultProps = {
    genre: "Hola",
}
export default GenresInDb
