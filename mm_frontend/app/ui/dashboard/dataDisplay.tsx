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
  useProductsDataArrayStore,
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
    id: 1,
    name: "apples",
    src: "/h4g_apple.jpg",
    stock: 75,
    locked_stock: 78,
    price: 1,
    order_limit: 10,
  },
  {
    id: 2,
    name: "bananas",
    src: "/h4g_banana.png",
    stock: 75,
    locked_stock: 78,
    price: 1,
    order_limit: 10,
  },
  {
    id: 3,
    name: "cucumbers",
    src: "/h4g_cucumber.webp",
    stock: 2,
    locked_stock: 0,
    price: 2,
    order_limit: 5,
  },
];

export function DataDisplay() {
  const { productsData, setProductsData } = useProductsDataArrayStore();
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
    setProductsData(data);
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
        {data.map((product, index) => {
              const isGray = index % 2 === 1;
              return (
                <DataCard key={product.id} device={product} />
              );
            })
        }
      </div>
    </div>
  );
}
