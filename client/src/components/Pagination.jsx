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
    <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-full">
      <button
        onClick={() => goToPage(prevPage)}
        disabled={!prevPage}
        className="px-4 py-2 mx-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => goToPage(number)}
          className={`px-4 py-2 mx-1 rounded-lg ${
            number === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          disabled={number === currentPage}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => goToPage(nextPage)}
        disabled={!nextPage}
        className="px-4 py-2 mx-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
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
