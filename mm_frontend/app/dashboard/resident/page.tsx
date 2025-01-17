//Main sensor list page in bootstrap
'use client'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleDisplay from '@/app/ui/dashboard/toggledisplay';
import { DataDisplay } from '@/app/ui/dashboard/dataDisplay';
import SearchBar from '@/app/ui/dashboard/searchBar';
import RefreshButton from '@/app/ui/dashboard/refreshButton';
import FilterButton from '@/app/ui/dashboard/filterButton';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import SortButton from '@/app/ui/dashboard/sortButton';
import SortByHeader from '@/app/ui/dashboard/sortByHeader';
import { useDisplayStore } from '@/app/store';
import PopupBuyProduct from '@/app/ui/dashboard/popupBuyProduct';

export default function Page() {
    const { list } = useDisplayStore();
    const width = list ? '1270px' : '';

    return (
        <Container>
            <div className='sticky z-10 bg-gray-200' style={{top: '-24px', width: width}}>
                <Row className='bg-gray-200 h-8'></Row>
                <Row className='px-3 mb-3'>
                    <Col className='text-3xl text-slate-500 font-bold'>
                        Products
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <RefreshButton/>
                    </Col>
                </Row>
                <Row className='px-3 mb-3'>
                    <Col md={6} lg={6}>
                        <SearchBar placeholder='Search Product'/>
                    </Col>
                    <Col md={6} lg={6} className='d-flex justify-content-start'>
                    </Col>
                </Row>
                {list ? <SortByHeader/> : <Row className='bg-gray-200 h-1 border-b-2 border-slate-400'></Row>}
            </div>
            <DataDisplay/>
            <div>
                <PopupBuyProduct/>
            </div>
        </Container>
    );
}