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

export default function Page() {
    const { list } = useDisplayStore();
    const width = list ? '1270px' : '';

    return (
        <Container>
            <div className='sticky z-10 bg-gray-200' style={{top: '-24px', width: width}}>
                <Row className='bg-gray-200 h-8'></Row>
                <Row className='px-3 mb-3'>
                    <Col xs={3} className='text-3xl text-slate-500 font-bold'>
                        Sensors
                    </Col>
                    <Col xs={9} className='d-flex justify-content-end'>
                        <RefreshButton/>
                    </Col>
                </Row>
                <Row className='px-3 mb-3'>
                    <Col xs={12} sm={3}>
                        <SearchBar placeholder='Search Sensor name/ID'/>
                    </Col>
                    <Col xs={5} sm={3} md={2} lg={2} xl={3} className='d-flex justify-content-start'>
                        {<FilterButton/>}
                    </Col>
                    {/*<Col xs={1}  className='bg-blue-300'></Col>*/}
                    <Col xs={7} sm={6} md={7} lg={5} xl={4} className='d-flex justify-content-end'>
                        <SortButton/>
                    </Col>
                    <Col md={12} lg={2} xl={2} className='d-flex justify-content-end'>
                        <ToggleDisplay/>
                    </Col>
                </Row>
                {list ? <SortByHeader/> : <Row className='bg-gray-200 h-1 border-b-2 border-slate-400'></Row>}
            </div>
            <DataDisplay/>
        </Container>
    );
}