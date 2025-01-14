// next & react
import { useEffect, useState } from 'react';
// functions & state
import { useSortByStore } from '@/app/store';
// misc
import { DeviceData } from '@/app/lib/definitions';

export default function sortAllDevices(
  data: DeviceData[],
  sortBy: String,
  setDeviceDatas: Function,
  asc: boolean,
) {
  if (sortBy === 'sensor_name') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return a.sensor_name.localeCompare(b.sensor_name);
        } else {
          return b.sensor_name.localeCompare(a.sensor_name);
        }
      }),
    );
  }
  if (sortBy === 'sensor_id') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return a.sensor_id.localeCompare(b.sensor_id);
        } else {
          return b.sensor_id.localeCompare(a.sensor_id);
        }
      }),
    );
  }
  if (sortBy === 'sensor_location') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return a.location.localeCompare(b.location);
        } else {
          return b.location.localeCompare(a.location);
        }
      }),
    );
  }
  if (sortBy === 'sensor_status') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return (
            new Date(a.last_seen).getTime() - new Date(b.last_seen).getTime()
          );
        } else {
          return (
            new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime()
          );
        }
      }),
    );
  }
  if (sortBy === 'curr_temp') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return a.curr_temp - b.curr_temp;
        } else {
          return b.curr_temp - a.curr_temp;
        }
      }),
    );
  }
  if (sortBy === 'curr_humidity') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return a.curr_humidity - b.curr_humidity;
        } else {
          return b.curr_humidity - a.curr_humidity;
        }
      }),
    );
  }
  if (sortBy === 'updatedAt') {
    setDeviceDatas(
      data.sort((a, b) => {
        if (asc) {
          return (
            new Date(a.last_seen).getTime() - new Date(b.last_seen).getTime()
          );
        } else {
          return (
            new Date(b.last_seen).getTime() - new Date(a.last_seen).getTime()
          );
        }
      }),
    );
  }
}
