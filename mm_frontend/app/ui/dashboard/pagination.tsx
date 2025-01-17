// ui
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/24/outline';
// functions & state
import { usePageNumberStore, useLastPageStore } from '@/app/store';

export default function Pagination() {
  const { firstVisiblePage, pageNumber, setFirstVisiblePage, setPageNumber } =
    usePageNumberStore();
  const { lastPage, setLastPage } = useLastPageStore();
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-end">
          <button
            className="w-6 rounded-full hover:bg-gray-500 hover:text-white"
            disabled={firstVisiblePage === 1}
            onClick={() => setFirstVisiblePage(firstVisiblePage - 4)}
          >
            <ChevronDoubleLeftIcon />
          </button>
          <button
            className="w-6 rounded-full hover:bg-gray-500 hover:text-white"
            disabled={pageNumber === 1}
            onClick={() => {
              setPageNumber((prevPageNumber) => prevPageNumber - 1);
              pageNumber % 4 === 1 ? setFirstVisiblePage(pageNumber - 4) : '';
            }}
          >
            <ChevronLeftIcon />
          </button>
          <button
            className={`w-6 rounded-full hover:bg-gray-500 hover:text-white ${pageNumber === firstVisiblePage ? 'bg-gray-500 text-white' : ''}`}
            onClick={() =>
              setPageNumber(
                (prevPageNumber) => (prevPageNumber = firstVisiblePage),
              )
            }
          >
            {firstVisiblePage}
          </button>
          {firstVisiblePage + 1 <= lastPage.pageCount && (
            <button
              className={`w-8 rounded-full hover:bg-gray-500 hover:text-white ${pageNumber === firstVisiblePage + 1 ? 'bg-gray-500 text-white' : ''}`}
              onClick={() =>
                setPageNumber(
                  (prevPageNumber) => (prevPageNumber = firstVisiblePage + 1),
                )
              }
            >
              {firstVisiblePage + 1}
            </button>
          )}
          {firstVisiblePage + 2 <= lastPage.pageCount && (
            <button
              className={`w-8 rounded-full hover:bg-gray-500 hover:text-white ${pageNumber === firstVisiblePage + 2 ? 'bg-gray-500 text-white' : ''}`}
              onClick={() =>
                setPageNumber(
                  (prevPageNumber) => (prevPageNumber = firstVisiblePage + 2),
                )
              }
            >
              {firstVisiblePage + 2}
            </button>
          )}
          {firstVisiblePage + 3 <= lastPage.pageCount && (
            <button
              className={`w-8 rounded-full hover:bg-gray-500 hover:text-white ${pageNumber === firstVisiblePage + 3 ? 'bg-gray-500 text-white' : ''}`}
              onClick={() =>
                setPageNumber(
                  (prevPageNumber) => (prevPageNumber = firstVisiblePage + 3),
                )
              }
            >
              {firstVisiblePage + 3}
            </button>
          )}
          {lastPage.pageCount - firstVisiblePage > 3 && (
            <p style={{ display: 'inline-block', margin: '0' }}>. . .</p>
          )}
          {lastPage.pageCount - firstVisiblePage > 3 && (
            <button
              className={`w-8 rounded-full hover:bg-gray-500 hover:text-white `}
              onClick={() => {
                setPageNumber(
                  (prevPageNumber) => (prevPageNumber = lastPage.pageCount),
                );
                lastPage.pageCount % 4 != 0
                  ? setFirstVisiblePage(
                      Math.floor(lastPage.pageCount / 4) * 4 + 1,
                    )
                  : setFirstVisiblePage(lastPage.pageCount - 3);
              }}
            >
              {lastPage.pageCount}
            </button>
          )}
          <button
            className="w-6 rounded-full hover:bg-gray-500 hover:text-white"
            disabled={pageNumber === lastPage.pageCount}
            onClick={() => {
              setPageNumber(
                (prevPageNumber) => (prevPageNumber = pageNumber + 1),
              );
              (pageNumber + 1) % 4 === 1
                ? setFirstVisiblePage(pageNumber + 1)
                : '';
            }}
          >
            <ChevronRightIcon />
          </button>
          <button
            className="w-6 rounded-full hover:bg-gray-500 hover:text-white"
            disabled={firstVisiblePage + 3 >= lastPage.pageCount}
            onClick={() => setFirstVisiblePage(firstVisiblePage + 4)}
          >
            <ChevronDoubleRightIcon />
          </button>
        </Col>
      </Row>
    </Container>
  );
}
