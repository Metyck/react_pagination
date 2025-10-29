import React, { useState } from 'react';
import './App.css';
import { getNumbers, pagesItems } from './utils';
import { Pagination } from './components/Pagination';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const items = getNumbers(1, 42).map(n => `Item ${n}`);

type PerPage = 3 | 5 | 10 | 20;

export const App: React.FC = () => {
  const [perPage, setPerPage] = useState<PerPage>(3);
  const [page, setPage] = useState<number>(1);

  const itemsToShow = pagesItems(items, page, perPage);

  function perPageChanger(value: PerPage): void {
    setPerPage(value);
    setPage(1);
  }

  return (
    <div className="container">
      <h1>Items with Pagination</h1>

      <p className="lead" data-cy="info">
        Page {page} (items {itemsToShow[0]} -{' '}
        {itemsToShow[itemsToShow.length - 1]} of {items.length})
      </p>

      <div className="form-group row">
        <div className="col-3 col-sm-2 col-xl-1">
          <select
            data-cy="perPageSelector"
            id="perPageSelector"
            className="form-control"
            onChange={ev => {
              const val: PerPage = Number(ev.target.value);

              perPageChanger(val);
            }}
          >
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <label htmlFor="perPageSelector" className="col-form-label col">
          items per page
        </label>
      </div>

      {/* Move this markup to Pagination */}
      <Pagination
        total={items}
        perPage={perPage}
        currentPage={page}
        onPageChange={newPage => {
          if (newPage !== page) {
            setPage(newPage);
          }
        }}
      />
      <ul>
        {itemsToShow.map(item => (
          <li data-cy="item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
