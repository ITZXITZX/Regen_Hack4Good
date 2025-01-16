// This file contains type definitions for your data.

export type ProductData = {
  id: number;
  name: string;
  src: string;
  stock: number;
  locked_stock: number;
  price: number;
  order_limit: number;
}

export interface TempBarGraphRef {
  addData: (label: string, temp: number, thresholdTemp: number) => void;
}

export type updateUserData = {
  username: string;
  email: string;
  phone_number: string;
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  alert_template: string;
  phone_number: string;
};

export type deviceHistory = {
  time: string;
  temp: number;
  humidity: number;
  threshold_temp: number;
};

export type alertHistory = {
  sensorid: string;
  time: string;
  temp: number;
  humidity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type totalPages = {
  pageCount: number;
};

export type FormData = {
  sensor_name: string;
  sensor_id: string;
  location: string;
  threshold_temp: number;
  alerts_enabled: boolean;
  users: number[];
};

export type relalationalUserData = {
  id: number;
  attributes: {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    alert_template: string;
    phone_number: string;
  };
};

export type DeviceData = {
  sensor_id: string;
  sensor_name: string;
  location: string;
  threshold_temp: number;
  last_alerted_temp: number;
  last_seen: string;
  alerts_enabled: boolean;
  curr_temp: number;
  curr_humidity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  users: {
    data: relalationalUserData[];
  };
};

export type DeviceDataRaw = {
  id: number;
  attributes: DeviceData;
};

export type SensorData = {
  devEUI: string;
  gatewayID: string;
  humidity: number;
  temperature: number;
  time: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
