import { setPages } from '../../utils';

type PaginationType = {
  total: string[];
  perPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  total,
  perPage,
  currentPage,
  onPageChange,
}: PaginationType) => {
  const pagesAmount = Math.ceil(total.length / perPage);
  const pagesArr = setPages(pagesAmount);

  function pageChanger(value: number): void {
    onPageChange(value);
  }

  return (
    <ul className="pagination">
      <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled="true"
          onClick={() => pageChanger(currentPage - 1)}
        >
          «
        </a>
      </li>

      {pagesArr.map(page => (
        <li
          key={page}
          className={`page-item ${currentPage === +page ? 'active' : ''}`}
          onClick={() => pageChanger(+page)}
        >
          <a data-cy="pageLink" className="page-link" href={`#${page}`}>
            {page}
          </a>
        </li>
      ))}

      <li
        className={`page-item${currentPage === pagesAmount ? ' disabled' : ''}`}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled="false"
          onClick={() => pageChanger(currentPage + 1)}
        >
          »
        </a>
      </li>
    </ul>
  );
};
