import PropTypes from "prop-types";

const Pagination = ({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  goToPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <button onClick={() => goToPage(prevPage)} disabled={!prevPage}>
          Prev
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            disabled={number === currentPage}
          >
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
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;
