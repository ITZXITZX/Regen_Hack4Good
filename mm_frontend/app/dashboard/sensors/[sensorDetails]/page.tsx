'use client';
import { DeviceData } from '@/app/lib/definitions';
import withAuth from '@/app/ui/authentication/withAuth';
import SensorDetail from '@/app/ui/dashboard/sensorDetail';

// SENSOR PAGE BOOTSTRAP
export default function Page() {
  return withAuth(<SensorDetail />)();
}
