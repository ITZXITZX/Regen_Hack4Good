// next and react
import { useEffect } from 'react';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import { XMarkIcon } from '@heroicons/react/24/outline';
// functions and state
import {
  usePopupStore,
  useProductsDataArrayStore,
  usePageNumberStore,
  useLastPageStore,
} from '@/app/store';
// jsx components
import Popup from './popup';
import Pagination from './pagination';
import AlertRow from '@/app/ui/dashboard/alertRow';

export default function PopupBuyProduct() {
  const showBuyProduct = usePopupStore((state) => state.showBuyProduct);
  const toggleBuyProduct = usePopupStore((state) => state.toggleBuyProduct);
  const selectedProductID = usePopupStore((state) => state.selectedProductID);
  console.log("selected:" + selectedProductID);
  const setSelectedProduct = usePopupStore((state) => state.setSelectedProduct);
  const { productsData, setProductsData } = useProductsDataArrayStore();
  const product = productsData[selectedProductID];
  console.log(productsData);
  console.log(product);

  const { lastPage, setLastPage } = useLastPageStore();
  const { pageNumber, setPageNumber } = usePageNumberStore();
  if (!product) return null;
  return (
    <Popup show={showBuyProduct} type="notification_list">
      <Container>
        <Row>
          <Col xs={12} className="justify-content-center flex items-center">
            <div className="ml-auto text-xl font-bold">
              {product.name}
            </div>
            <button
              className="ml-auto w-8 rounded-full text-red-600"
              onClick={toggleBuyProduct}
            >
              <XMarkIcon className="sort-icon" />
            </button>
          </Col>
          <Row className="justify-center text-base font-semibold text-slate-400">
            {product.price}
          </Row>
        </Row>
        <Row className="text-xl font-semibold text-black">
          <Col xs={12}>Notifications</Col>
        </Row>
        <Row className="flex w-full border-b-2 border-slate-500">
          <Col xs={4} className="text-lg font-semibold text-slate-600">
            Message
          </Col>
          <Col
            xs={3}
            lg={2}
            className="justify-content-start flex text-lg font-semibold text-slate-600"
          >
            <span className="hidden md:block">zTemperature</span>
          </Col>
          {/* <Col xs={3} lg={2} className='font-semibold text-lg text-slate-600'>
            Threshold
          </Col> */}
          <Col xs={2} lg={2} className="text-lg font-semibold text-slate-600">
            Humidity
          </Col>
        </Row>
      </Container>
    </Popup>
  );
}
