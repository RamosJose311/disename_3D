import React from 'react';

import ContentRowMovies from './ContentRowMovies';
import Lastmovieindb from './LastMovieInDb';
import GenresInDb from './GenresInDb';

function ContentRowTop() {
	const metrics = [
		{
			title: "Movies in Data Base",
			color: "primary",
			icon: "fa-film",
			data: 21
		},
		{
			title: "Total awards",
			color: "success",
			icon: "fa-award",
			data: 79
		},
		{
			title: "Actors quantity",
			color: "warning",
			icon: "fa-user",
			data: 49
		}
	]

	const metricsGenre = [
		{ genre: "Acción" },
		{ genre: "Animación" },
		{ genre: "Aventura" },
		{ genre: "Ciencia Ficción" },
		{ genre: "Comedia" },
		{ genre: "Documental" },
		{ genre: "Drama" },
		{ genre: "Fantasia" },
		{ genre: "Infantiles" },
		{ genre: "Musical" }
	]
	return (
		<React.Fragment>
			{/*<!-- Content Row Top -->*/}
			<div className="container-fluid">
				<div className="d-sm-flex aligns-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
				</div>

				{/*<!-- Content Row Movies-->*/}
				<div className="row">
					{metrics.map((metric, index) => (
						<ContentRowMovies {...metric} key={metric.title + index} />
					))}
				</div>
				{/*<!-- End movies in Data Base -->*/}

				{/*<!-- Content Row Last Movie in Data Base -->*/}
				<div className="row">
					{/*<!-- Last Movie in DB -->*/}
					<Lastmovieindb />
					{/*<!-- End content row last movie in Data Base -->*/}

					{/*<!-- Genres in DB -->*/}

					<div className="col-lg-6 mb-4">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h5 className="m-0 font-weight-bold text-gray-800">Genres in Data Base</h5>
							</div>
							<div className="card-body">
								<div className="row">
									{metricsGenre.map((metric, index) => (
										<GenresInDb {...metric} key={metric.genre + index} />
									))}

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*<!--End Content Row Top-->*/}

		</React.Fragment>
	)

}
export default ContentRowTop;