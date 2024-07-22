import PropTypes from "prop-types";

const Pagination = ({ prevPage, nextPage, currentPage, totalGuilds, goToPage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= totalGuilds; i++) {
		pageNumbers.push(i);
	}

	return (
		<div>
			<div>
				<button onClick={() => goToPage(prevPage)} disabled={!prevPage}>
					Prev
				</button>
				{pageNumbers.map((number) => (
					<button key={number} onClick={() => goToPage(number)} disabled={number === currentPage}>
						{number}
					</button>
				))}
				<button onClick={() => goToPage(nextPage)} disabled={!nextPage}>
					Next
				</button>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	prevPage: PropTypes.number,
	nextPage: PropTypes.number,
	currentPage: PropTypes.number,
	totalGuilds: PropTypes.number,
	goToPage: PropTypes.func,
};

export default Pagination;
