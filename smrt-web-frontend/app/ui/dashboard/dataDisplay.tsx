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

const AuthDataDisplay = withAuth(DataDisplay);

export default AuthDataDisplay;

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
    fetchAllData().then((data) => {
      if (data == null) {
        //error fetching data
        alert('Error fetching data. Please try again later.');
        setIsEmpty(true);
      } else if (data.length == 0) {
        // data is empty
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        sortAllDevices(data, sortBy, setDeviceData, asc);
      }
    });
  }, [refresh]);

  //fetch and update mySensors state
  useEffect(() => {
    fetchSensorsByUser(userData.id).then((data) => {
      if (data == null) {
        alert('Error fetching data. Please try again later.');
        setIsEmpty(true);
      } else if (data.length == 0) {
        // data is empty
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setMySensors(data);
      }
    });
  }, [refresh]);

  //Sort data
  useEffect(() => {
    sortAllDevices(deviceData, sortBy, setDeviceData, asc);
    sortAllDevices(mySensors, sortBy, setMySensors, asc);
  }, [sortBy, asc, refresh, filterMySensors]);

  return (
    <div>
      <div
        className={clsx('h-full w-full scroll-smooth p-3', {
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
