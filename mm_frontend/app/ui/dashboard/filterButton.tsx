'use client';
// ui
import { Container, Row, Col, Form, Dropdown } from 'react-bootstrap';
import { FunnelIcon } from '@heroicons/react/24/outline';
// functions & state
import { useFilterStateStore } from '@/app/store';

function FilterButton() {
  const {
    setFilterOverThreshold,
    setFilterUnderThreshold,
    setFilterOnline,
    setFilterOffline,
    setFilterUnconfig,
    setFilterMySensors,
    clearFilters,
  } = useFilterStateStore();
  const {
    filterOverThreshold,
    filterUnderThreshold,
    filterOnline,
    filterOffline,
    filterUnconfig,
    filterMySensors,
  } = useFilterStateStore();

  const changeFilterOnline = (state: boolean) => {
    // true is set online, false is set offline
    if (filterOnline) {
      if (state) {
        // filter is online and you are setting online
        setFilterOnline();
      } else {
        // filter is online and you are setting offline
        setFilterOnline();
        setFilterOffline();
      }
    } else if (filterOffline) {
      if (state) {
        // filter is offline and you are setting online
        setFilterOnline();
        setFilterOffline();
      } else {
        // filter is offline and you are setting offline
        setFilterOffline();
      }
    } else {
      if (state) {
        // filter is online and you are setting online
        setFilterOnline();
      } else {
        // filter is online and you are setting offline
        setFilterOffline();
      }
    }
  };

  const changeFilterThreshold = (state: boolean) => {
    // true is set over, false is set under
    if (filterOverThreshold) {
      if (state) {
        // filter is over and you are setting over
        setFilterOverThreshold();
      } else {
        // filter is over and you are setting under
        setFilterOverThreshold();
        setFilterUnderThreshold();
      }
    } else if (filterUnderThreshold) {
      if (state) {
        // filter is under and you are setting over
        setFilterOverThreshold();
        setFilterUnderThreshold();
      } else {
        // filter is undere and you are setting under
        setFilterUnderThreshold();
      }
    } else {
      if (state) {
        // filter is over and you are setting oover
        setFilterOverThreshold();
      } else {
        // filter is under and you are setting under
        setFilterUnderThreshold();
      }
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className="custom-dropdown-toggle bg-transparent">
        <FunnelIcon className="sort-icon text-blue-500" />
        <span className="text-blue-500">Filter</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="custom-dropdown-menu shadow-2xl">
        <Container style={{ width: '450px' }}>
          <Row className="mb-1 px-4 font-bold">Sensors</Row>
          <Row className="px-4">
            <Col xs={3} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Online"
                checked={filterOnline}
                onClick={(e) => {
                  changeFilterOnline(true);
                  e.stopPropagation();
                }}
              />
            </Col>
            <Col xs={3} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Offline"
                checked={filterOffline}
                onClick={(e) => {
                  changeFilterOnline(false);
                  e.stopPropagation();
                }}
              />
            </Col>
            <Col xs={6} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Unconfigured"
                checked={filterUnconfig}
                onClick={(e) => {
                  setFilterUnconfig();
                  e.stopPropagation();
                }}
              />
            </Col>
          </Row>
          <Row className="px-4">
            <Col xs={12} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="My Sensors"
                checked={filterMySensors}
                onClick={(e) => {
                  setFilterMySensors();
                  e.stopPropagation();
                }}
              />
            </Col>
          </Row>
          <Row className="mb-1 mt-2 px-4 font-bold">Temperature</Row>
          <Row className="px-4">
            <Col xs={6} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Over Threshold"
                checked={filterOverThreshold}
                onClick={(e) => {
                  changeFilterThreshold(true);
                  e.stopPropagation();
                }}
              />
            </Col>
            <Col xs={6} className="font-semibold text-slate-600">
              <Form.Check
                className="custom-radio"
                type="radio"
                label="Within Threshold"
                checked={filterUnderThreshold}
                onClick={(e) => {
                  changeFilterThreshold(false);
                  e.stopPropagation();
                }}
              />
            </Col>
          </Row>
          <Row className="py-2">
            <Col xs={12} className="d-flex justify-content-start">
              <button
                className="font-semibold text-slate-400"
                onClick={(e) => {
                  clearFilters();
                  e.stopPropagation();
                }}
              >
                {' '}
                Reset{' '}
              </button>
            </Col>
          </Row>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterButton;
