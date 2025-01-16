'use client';
// ui
import { Container, Dropdown } from 'react-bootstrap';
import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
} from '@heroicons/react/24/outline';
// functions & state
import { useDisplayStore, useSortByStore } from '@/app/store';

function SortButton() {
  const {
    sortBy,
    asc,
    currSorted,
    sortByName,
    sortByID,
    sortByLocation,
    sortByStatus,
    sortByTemp,
    sortByHum,
    sortByRecent,
    toggleOrder,
    setCurrSorted,
  } = useSortByStore();
  const { list } = useDisplayStore();
  const order: String = asc ? 'asc' : 'desc';

  const getIcon = (criteria: String) => {
    if (sortBy === criteria) {
      return order === 'asc' ? (
        <BarsArrowUpIcon className="sort-icon" />
      ) : (
        <BarsArrowDownIcon className="sort-icon" />
      );
    }
  };

  const handleSortButton = (e: any, sortBy: string) => {
    if (sortBy === 'name') {
      sortByName();
      setCurrSorted('Sensor Name');
    }
    if (sortBy === 'id') {
      sortByID();
      setCurrSorted('Sensor ID');
    }
    if (sortBy === 'location') {
      sortByLocation();
      setCurrSorted('Location');
    }
    if (sortBy === 'status') {
      sortByStatus();
      setCurrSorted('Status');
    }
    if (sortBy === 'temp') {
      sortByTemp();
      setCurrSorted('Temperature');
    }
    if (sortBy === 'humidity') {
      sortByHum();
      setCurrSorted('Humidity');
    }
    if (sortBy === 'recent') {
      sortByRecent();
      setCurrSorted('Last Updated');
    }
    toggleOrder();
    e.stopPropagation();
  };

  return list ? (
    ''
  ) : (
    <div className="flex">
      <span className="mr-2 font-semibold text-slate-600">Sort by</span>
      <Dropdown>
        <Dropdown.Toggle
          as="div"
          className="custom-toggle font-semibold text-blue-500"
        >
          {currSorted}
          {getIcon(sortBy)}
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu shadow-2xl">
          <Container>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'name');
              }}
            >
              Sensor Name {getIcon('sensor_name')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'id');
              }}
            >
              Sensor ID {getIcon('sensor_id')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'location');
              }}
            >
              Location {getIcon('sensor_location')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'status');
              }}
            >
              Status {getIcon('sensor_status')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'temp');
              }}
            >
              Temperature {getIcon('curr_temp')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'humidity');
              }}
            >
              Humidity {getIcon('curr_humidity')}{' '}
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={(e) => {
                handleSortButton(e, 'recent');
              }}
            >
              Last Updated {getIcon('updatedAt')}
            </Dropdown.Item>
          </Container>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default SortButton;

/*<DropdownButton as='div' title="Name (A-Z)" variant="outline-primary">
                    <Container>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'name') }}>
                        Sensor Name {getIcon('sensor_name')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'id') }}>
                        Sensor ID {getIcon('sensor_id')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'location') }}>
                        Location {getIcon('sensor_location')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'status') }}>
                        Status {getIcon('sensor_status')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'temp') }}>
                        Temperature {getIcon('curr_temp')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'humidity') }}>
                        Humidity {getIcon('curr_humidity')} </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => { handleSortButton(e, 'recent') }}>
                        Last Updated {getIcon('updatedAt')} </Dropdown.Item>
                    </Container>
        </DropdownButton>*/
