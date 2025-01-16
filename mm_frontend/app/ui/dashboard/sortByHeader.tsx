'use client';
// next & react
import React from 'react';
// ui
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from '@heroicons/react/24/outline';
// functions & state
import { useSortByStore } from '@/app/store';

const SortByHeader = () => {
  const {
    sortBy,
    asc,
    sortByName,
    sortByID,
    sortByLocation,
    sortByStatus,
    sortByTemp,
    sortByHum,
    sortByRecent,
    toggleOrder,
  } = useSortByStore();
  const order: String = asc ? 'asc' : 'desc';

  const getIcon = (criteria: string) => {
    if (sortBy === criteria) {
      return order === 'asc' ? (
        <BarsArrowUpIcon className="sort-icon" />
      ) : (
        <BarsArrowDownIcon className="sort-icon" />
      );
    }
  };

  const handleClick = (sortBy: string) => {
    if (sortBy === 'name') {
      sortByName();
    }
    if (sortBy === 'id') {
      sortByID();
    }
    if (sortBy === 'location') {
      sortByLocation();
    }
    if (sortBy === 'status') {
      sortByStatus();
    }
    if (sortBy === 'temp') {
      sortByTemp();
    }
    if (sortBy === 'humidity') {
      sortByHum();
    }
    if (sortBy === 'recent') {
      sortByRecent();
    }
    toggleOrder();
  };

  return (
    <div
      className="d-flex ml-4 h-10 rounded-md bg-slate-300 px-2"
      style={{ width: '1240px' }}
    >
      <Row className="mt-2" style={{ width: '1240px' }}>
        <Col xs={2}>
          <button
            className="w-full text-left"
            onClick={() => handleClick('name')}
          >
            Sensor {getIcon('sensor_name')}
          </button>
        </Col>
        <Col xs={2}>
          <button
            className="w-full text-left"
            onClick={() => handleClick('id')}
          >
            Sensor ID {getIcon('sensor_id')}
          </button>
        </Col>
        <Col xs={2}>
          <button
            className="w-full text-left"
            onClick={() => handleClick('location')}
          >
            Location {getIcon('sensor_location')}
          </button>
        </Col>
        <Col xs={3} className="d-flex space-x-8">
          <span>
            <button
              className="w-32 text-left"
              onClick={() => handleClick('status')}
            >
              Status {getIcon('sensor_status')}
            </button>
          </span>
          <span>
            <button
              className="w-36 text-left"
              onClick={() => handleClick('temp')}
            >
              Temperature {getIcon('curr_temp')}
            </button>
          </span>
        </Col>
        <Col xs={3} className="d-flex">
          <span>
            <button
              className="w-32 text-left"
              onClick={() => handleClick('humidity')}
            >
              Humidity {getIcon('curr_humidity')}
            </button>
          </span>
          <span>
            <button
              className="w-40 text-left"
              onClick={() => handleClick('recent')}
            >
              Last Updated {getIcon('updatedAt')}
            </button>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default SortByHeader;
