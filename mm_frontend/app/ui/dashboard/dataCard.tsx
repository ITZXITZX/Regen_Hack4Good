'use client';
// next & react
import Link from 'next/link';
import Image from 'next/image';
// ui
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThermometerThreeQuarters,
  faTint,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
// functions & state
import { formatDateReadable, isWithinFiveMinutes } from '@/app/functions';
import { usePopupStore } from '@/app/store';
// jsx components
import StatusIndicator from './statusIndicator';
// misc
import { ProductData } from '@/app/lib/definitions';
import PopupBuyProduct from './popupBuyProduct';

export default function DataCard({ device }: { device: ProductData }) {
  // const abovetres: boolean = device.curr_temp >= device.threshold_temp;
  // const offline = !isWithinFiveMinutes(device.last_seen);
  // const apiUrl = process.env.SERVER_ORIGIN;
  const toggleBuyProduct = usePopupStore((state) => state.toggleBuyProduct);
  const setSelectedProduct = usePopupStore((state) => state.setSelectedProduct);

  return (
    <button
      onClick={() => {
        setSelectedProduct(device.id);
        console.log("hello" + device.id);
        toggleBuyProduct();
      }}
      className={clsx(
        'h-52 w-full rounded-xl bg-white no-underline outline outline-2 hover:drop-shadow-xl',
        {
          'outline-white': true,
          'outline-red-400': false,
        },
      )}
    >
      <Container>
        <Row>
          <Col className="col-12 mt-2 flex flex-row text-center justify-between font-bold text-slate-600">
            <Col>{device.name}</Col>
            {/* <StatusIndicator offline={offline} /> */}
          </Col>
          <Col className="col-12 mb-1 text-center text-md font-bold text-slate-500">
            {"$" + device.price}
          </Col>
          <Col className="col-12 mb-2 text-xs font-semibold text-slate-400">
            {"in stock: " + device.stock}
          </Col>
        </Row>
        <Row className="mb-3 divide-x-2 divide-slate-400">
          <Col className="col-6 text-center text-xs font-semibold text-slate-600">
            <Image
              src={device.src}
              width={200}
              height={200}
              className="p-1 md:block"
              alt="pic"
            />
          </Col>
        </Row>
        <Row>
          <Col className="col-12 text-xs font-bold text-slate-400">
            {"order limit: " + device.order_limit}
          </Col>
        </Row>
      </Container>
    </button>
  );
}
