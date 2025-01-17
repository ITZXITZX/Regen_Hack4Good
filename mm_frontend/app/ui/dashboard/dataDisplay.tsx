'use client';
// next & react
import React, { useEffect, useState } from 'react';
// ui
import clsx from 'clsx';
// functions & state
import { fetchAllData, fetchSensorsByUser, filterData } from '@/app/functions';
import {
  useDisplayStore,
  useProductsDataArrayStore,
} from '@/app/store';
// jsc components
import DataRow from './dataRow';
import DataCard from '@/app/ui/dashboard/dataCard';
import PopupBuyProduct from './popupBuyProduct';
// misc
import withAuth from '../authentication/withAuth';
import { ProductData } from '@/app/lib/definitions';

// const AuthDataDisplay = withAuth(DataDisplay);

// export default AuthDataDisplay;

const data: ProductData[] = [
  {
    id: 0,
    name: "apples",
    src: "/h4g_apple.jpg",
    stock: 75,
    locked_stock: 78,
    price: 1,
    order_limit: 10,
  },
  {
    id: 1,
    name: "bananas",
    src: "/h4g_banana.png",
    stock: 75,
    locked_stock: 78,
    price: 1,
    order_limit: 10,
  },
  {
    id: 2,
    name: "cucumbers",
    src: "/h4g_cucumber.jpg",
    stock: 2,
    locked_stock: 0,
    price: 2,
    order_limit: 5,
  },
];

export function DataDisplay() {
  const { productsData, setProductsData } = useProductsDataArrayStore();
  const list = useDisplayStore((state: any) => state.list);

  //fetch and update initial unfiltered data state
  useEffect(() => {
    // fatch
    setProductsData(data);
    console.log(productsData);
  }, [productsData]);

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
