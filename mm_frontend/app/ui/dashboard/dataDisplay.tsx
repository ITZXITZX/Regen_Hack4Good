'use client';
// next & react
import React, { useEffect, useState } from 'react';
// ui
import clsx from 'clsx';
// functions & state
import { fetchAllData, fetchSensorsByUser, filterData } from '@/app/functions';
import sortAllDevices from './sortLogic';
import {
  useDisplayStore,
  useSearchStateStore,
  useRefreshStore,
  useFilterStateStore,
  useDeviceDataArrayStore,
  useUserStore,
  useSortByStore,
  useMySensorsState,
} from '@/app/store';
// jsc components
import DataRow from './dataRow';
import DataCard from '@/app/ui/dashboard/dataCard';
// misc
import withAuth from '../authentication/withAuth';
import { ProductData } from '@/app/lib/definitions';

// const AuthDataDisplay = withAuth(DataDisplay);

// export default AuthDataDisplay;

const data: ProductData[] = [
  {
    sensor_id: "sensor-001",
    sensor_name: "Temperature Sensor A",
    location: "Warehouse A",
    threshold_temp: 75,
    last_alerted_temp: 78,
    last_seen: "2025-01-14T10:45:00Z",
    alerts_enabled: true,
    curr_temp: 72,
    curr_humidity: 50,
    createdAt: "2024-12-01T08:00:00Z",
    updatedAt: "2025-01-10T15:00:00Z",
    publishedAt: "2024-12-05T12:00:00Z",
    users: {
      data: [],
    },
  },
  {
    sensor_id: "sensor-002",
    sensor_name: "Temperature Sensor B",
    location: "Office A",
    threshold_temp: 70,
    last_alerted_temp: 80,
    last_seen: "2025-01-14T11:00:00Z",
    alerts_enabled: false,
    curr_temp: 68,
    curr_humidity: 45,
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2025-01-12T09:00:00Z",
    publishedAt: "2024-11-20T14:00:00Z",
    users: {
      data: [],
    },
  },
  {
    sensor_id: "sensor-003",
    sensor_name: "Temperature Sensor C",
    location: "Server Room A",
    threshold_temp: 65,
    last_alerted_temp: 67,
    last_seen: "2025-01-13T18:30:00Z",
    alerts_enabled: true,
    curr_temp: 64,
    curr_humidity: 40,
    createdAt: "2024-10-20T14:00:00Z",
    updatedAt: "2025-01-11T13:30:00Z",
    publishedAt: "2024-10-25T16:00:00Z",
    users: {
      data: [],
    },
  },
];

export function DataDisplay() {
  const { deviceData, setDeviceData } = useDeviceDataArrayStore();
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const list = useDisplayStore((state: any) => state.list);
  const searchTerm = useSearchStateStore((state: any) => state.searchTerm);
  const refresh = useRefreshStore((state: any) => state.refreshState);
  const { sortBy, asc } = useSortByStore();
  const { userData, setUserData } = useUserStore();
  const { mySensors, setMySensors } = useMySensorsState();
  const {
    filterOverThreshold,
    filterUnderThreshold,
    filterOnline,
    filterOffline,
    filterUnconfig,
    filterMySensors,
  } = useFilterStateStore();

  //fetch and update initial unfiltered data state
  useEffect(() => {
    setIsEmpty(false);
    sortAllDevices(data, sortBy, setDeviceData, asc);
  }, [refresh]);

  // //fetch and update mySensors state
  // useEffect(() => {
  //   setIsEmpty(false);
  //   setMySensors(data);
  // }, [refresh]);

  // //Sort data
  // useEffect(() => {
  //   sortAllDevices(deviceData, sortBy, setDeviceData, asc);
  //   sortAllDevices(mySensors, sortBy, setMySensors, asc);
  // }, [sortBy, asc, refresh, filterMySensors]);

  return (
    <div>
      <div
        className={clsx('bg-blue-200 h-full w-full scroll-smooth p-3', {
          //'flex flex-col divide-y-2 divide-solid divide-slate-200': list,
          'divide-y-0 divide-solid divide-slate-200': list,
          'grid gap-x-3 gap-y-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5':
            !list,
        })}
      >
        {/*list ? <SortByHeader/> : ''*/}
        {!filterMySensors
          ? filterData(
              deviceData,
              searchTerm,
              filterOverThreshold,
              filterUnderThreshold,
              filterOnline,
              filterOffline,
              filterUnconfig,
            ).map((device, index) => {
              const isGray = index % 2 === 1;
              return list ? (
                <DataRow key={device.sensor_id} device={device} gray={isGray} />
              ) : (
                <DataCard key={device.sensor_id} device={device} />
              );
            })
          : filterData(
              mySensors,
              searchTerm,
              filterOverThreshold,
              filterUnderThreshold,
              filterOnline,
              filterOffline,
              filterUnconfig,
            ).map((device, index) => {
              const isGray = index % 2 === 1;
              return list ? (
                <DataRow key={device.sensor_id} device={device} gray={isGray} />
              ) : (
                <DataCard key={device.sensor_id} device={device} />
              );
            })}
      </div>
    </div>
  );
}
