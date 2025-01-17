import {
  DeviceData,
  DeviceDataRaw,
  deviceHistory,
  totalPages,
  UserData,
  FormData,
  updateUserData,
  alertHistory,
} from '@/app/lib/definitions';
const Papa = require('papaparse');
const moment = require('moment');

// download csv file
export async function downloadCsv(
  sensorId: String,
  startDate: String,
  endDate: String,
): Promise<boolean | null> {
  var csvFilename = `${sensorId}_FROM${changeDateFormat(startDate)}TO${changeDateFormat(endDate)}.csv`;
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/csvBySensorId?devEUI=${sensorId}&startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // important for cookies
    });

    if (!response.ok) {
      console.error('Network response was not ok');
      return false;
    }

    const contentType = response.headers.get('Content-Type');

    // Check if it is JSON
    if (contentType?.includes('application/json')) {
      return null;
    } else {
      // It's a blob
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = csvFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
    }
    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// verify token
export async function verifyToken(): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/user/verifyToken`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // important for cookies
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// sign out
export async function signout(): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/user/signout`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

//login

// Define hardcoded credentials
const hardcodedAdmin = 'admin';  
const hardcodedAdminPassword = 'admin';  
const hardcodedResident = 'resident';
const hardcodedResidentPassword = 'resident';


// login function

export async function login(
  user: string,
  password: string,
): Promise<UserData | null> {
  try {
    if (user === hardcodedAdmin && password === hardcodedAdminPassword) {
      const userData: UserData = {
        user: {
          username: user,
          phone_number: '+65',
          email: '',
          role: 'admin', // Add role
        },
        jwt: 'mock-jwt-token',
      };
      return userData.user;
    } else if (user === hardcodedResident && password === hardcodedResidentPassword) {
      const userData: UserData = {
        user: {
          username: user,
          phone_number: '+65',
          email: '',
          role: 'resident', // Add role
        },
        jwt: 'mock-jwt-token',
      };
      return userData.user;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error during login: ', error);
    return null;
  }
}


// login
// export async function login(
//   user: string,
//   password: string,
// ): Promise<UserData | null> {
//   const apiUrl = process.env.SERVER_ORIGIN;
//   const url = `${apiUrl}/user/login`;
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         user: user,
//         password: password,
//       }),
//       credentials: 'include',
//     });

//     if (!response.ok) {
//       return null;
//     }

//     const data: UserData = (await response.json()).user;
//     if (data.phone_number === null) {
//       data.phone_number = '+65';
//     } else if (!data.phone_number.startsWith('+65')) {
//       data.phone_number = '+65' + data.phone_number;
//     }
//     if (data.email === null) data.email = '';

//     return data;
//   } catch (error) {
//     console.error('There has been a problem with your fetch operation:', error);
//     return null;
//   }
// }

// get all users
export async function fetchAllUsers(): Promise<UserData[]> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/user/allUsers`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: UserData[] = await response.json();
      return data;
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

// fetch sensor history
export async function fetchSensorHist(
  sensorID: string,
  startDate: string,
  endDate: string,
): Promise<deviceHistory[] | null> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/sensorHistory?devEUI=${sensorID}&startDate=${startDate}T00:00:00.000Z&endDate=${endDate}T00:00:00.000Z`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: deviceHistory[] = await response.json();
      return data;
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

// fetch sensor alert history
export async function fetchAlertHist(
  sensorID: string,
  pageNumber: number,
): Promise<alertHistory[] | null> {
  const apiUrl = process.env.SERVER_ORIGIN;
  console.log('func', pageNumber);
  // change api
  const url = `${apiUrl}/sensors/alertHistory?devEUI=${sensorID}&page=${pageNumber}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: alertHistory[] = (await response.json()).map(
        (data: any) => data.attributes,
      );
      return data;
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(
      'There has been a problem with fetching alert history:',
      error,
    );
    return null;
  }
}

// update individual sensor data
export async function updateSensor(update: FormData): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/updateSensorById`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: update }),
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DeviceDataRaw = await response.json();
    });

    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// update individual user data
export async function updateUser(
  id: string,
  update: updateUserData,
): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/user/updateUserInfoById?userId=${id}`;
  console.log(id);
  console.log(update);
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    });

    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// change user pwd
export async function changeUserPwd(
  user: string,
  id: string,
  oldPwd: string,
  newPwd: string,
): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/user/changeUserPassword?userId=${id}`;
  const update = {
    user: user,
    oldPassword: oldPwd,
    newPassword: newPwd,
  };
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    });

    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// fetch data for individual sensor
export async function fetchIndividualData(
  sensorID: string,
): Promise<DeviceData | null> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/sensorById?devEUI=${sensorID}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DeviceDataRaw = await response.json();
      return data.attributes;
    });
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

// delete individual sensor
export async function deleteSensorById(sensorID: string): Promise<boolean> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/deleteSensorById?devEUI=${sensorID}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    });
    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return false;
  }
}

// fetch all sensor data
export async function fetchAllData() {
  const apiUrl = process.env.SERVER_ORIGIN;
  const displayLimit = process.env.NEXT_PUBLIC_SENSOR_LIMIT;
  const url = `${apiUrl}/sensors/allSensors`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DeviceDataRaw[] = await response.json();
      //console.log(data);
      return data.map((x: DeviceDataRaw) => x.attributes);
    });
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

// fetchData: (pageNumber: number, sortBy: String, order: String) => Promise<DeviceData[]
// called in DataDisplay
// fetch sorted sensor data
export async function fetchData(
  pageNumber: number,
  sortBy: String,
  order: String,
): Promise<DeviceData[] | null> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const displayLimit = process.env.NEXT_PUBLIC_SENSOR_LIMIT;
  const url = `${apiUrl}/sensors/sortedSensors?page=${pageNumber}&limit=${displayLimit}&sortType=${sortBy}&order=${order}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DeviceDataRaw[] = await response.json();
      //console.log(data);
      return data.map((x: DeviceDataRaw) => x.attributes);
    });
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

//Fetch total number of pages CHANGE TO ALERTS
export async function fetchTotalAlertPages(
  sensorID: string,
): Promise<totalPages> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/alertHistoryPages?devEUI=${sensorID}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: totalPages = await response.json();
      return data;
    });
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return { pageCount: 0 };
  }
}

//filter data
export function filterData(
  data: DeviceData[],
  searchTerm: string,
  filterOverThreshold: boolean,
  filterUnderThreshold: boolean,
  filterOnline: boolean,
  filterOffline: boolean,
  filterUnconfig: boolean,
) {
  return data
    .filter((device) => {
      return searchTerm.toLowerCase() === ''
        ? true
        : device.sensor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            device.sensor_id.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((device) => {
      return (
        (!filterOverThreshold || device.curr_temp > device.threshold_temp) &&
        (!filterUnderThreshold || device.curr_temp <= device.threshold_temp) &&
        (!filterOnline || isWithinFiveMinutes(device.last_seen)) &&
        (!filterOffline || !isWithinFiveMinutes(device.last_seen)) &&
        (!filterUnconfig || device.sensor_name === 'unconfigured')
      );
    });
}

// fetch sensors from user id
export async function fetchSensorsByUser(
  userId: string,
): Promise<DeviceData[] | null> {
  const apiUrl = process.env.SERVER_ORIGIN;
  const url = `${apiUrl}/sensors/sensorByUserId?userId=${userId}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      //console.log(data);
      return await response.json();
    });
    return response;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return null;
  }
}

// shorten string
export function shortenString(word: String, length: number) {
  if (word.length > length) {
    // 8
    if (word[length - 3] == ' ') {
      return word.slice(0, length - 4) + '...';
    } else {
      return word.slice(0, length - 3) + '...';
    }
  } else {
    return word;
  }
}

formatDateUTC: (isoString: String) => String;
// called in DataRow and DataCard
export function formatDateUTC(isoString: string): string {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Ensure the given time is valid
  if (isNaN(date.getTime())) {
    // throw new Error("Invalid date string");
    return 'Invalid date string';
  }

  // Extract individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  // Format the date as desired (example: DD/MM/YYYY HH:mm:ss)
  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

export function formatDate(isoString: string): string {
  // Convert ISO string to date object without considering timezone
  const date = moment.utc(isoString);
  // Format the date as "DD MMMM YYYY HH:mm:ss"
  const formattedDate = date.format('DD MMMM YYYY HH:mm:ss');
  return formattedDate;
}

export const getCurrentDateTime = () => {
  const currentDate = new Date();

  // Get the current time in milliseconds since January 1, 1970, 00:00:00 UTC
  const currentTime = currentDate.getTime();

  // Offset in milliseconds for UTC+8 (8 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const offsetUTC8 = 8 * 60 * 60 * 1000;

  // Adjust the current time to UTC+8
  const adjustedTime = new Date(currentTime + offsetUTC8);

  // Return the adjusted time in ISO 8601 format
  return adjustedTime.toISOString();
};

export const getDateInYYYYMMDDFormat = (dateOrNull: Date | null) => {
  if (dateOrNull instanceof Date) {
    const isoDateString = dateOrNull.toISOString();
    const parts = isoDateString.split('T');
    return parts[0];
  } else {
    return ''; // Handle null case
  }
};

export const getCurrentDate = () => {
  // gets current date in YYYY-MM-DD format
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const dateOnly = `${year}-${month}-${day}`;
  return dateOnly;
};

// UTC+08:00
// UTC+08:00
export const getSgTime = (timeStamp: string) => {
  const parsedTimeStamp = Date.parse(timeStamp);

  if (isNaN(parsedTimeStamp)) {
    // Handle invalid timestamp
    console.error('Invalid timestamp:', timeStamp);
    return ''; // or throw an error, or return a default value
  }

  const sgTime = new Date(parsedTimeStamp + 8 * 60 * 60 * 1000);
  return sgTime.toISOString();
};

//Getting date in readable format from isoString, (14 June 2024 14:20) for example
export function formatDateReadable(isoString: string): string {
  // Parse the ISO string into a Date object
  const date = new Date(isoString);

  // Ensure the given time is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date string';
  }

  // Extract individual components
  const year = date.getFullYear();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()]; // Months are zero-based
  const day = String(date.getDate());
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format the date as desired (example: 10 June 2023 14:30)
  return `${day} ${month} ${year} ${hours}:${minutes}`;
}

// Example usage
const input = '2023-06-10T14:30:00Z';
const output = formatDateReadable(input);
console.log(output); // Output: "10 June 2023 14:30"

export function isWithinFiveMinutes(timeString: string): boolean {
  // Check if the difference is within 5 minutes
  return (
    Math.abs(new Date().getTime() - new Date(timeString).getTime()) <=
    5 * 60 * 1000
  );
}

//to change from "Fri Jul 05 2024 00:00:00 GMT+0800 (Singapore Standard Time)" to 20240705
export function changeDateFormat(dateString: any) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function getCurrentFormattedDate() {
  const date = new Date();
  return date.toString();
}

// converts json data into csv and triggers download
export function downloadCSV(data: deviceHistory[], filename: string) {
  // Convert the JSON data to a string
  var json = JSON.stringify(data);
  var csv = Papa.unparse(json);

  // Create a new Blob object with the JSON data and set its type
  var blob = new Blob([csv], { type: 'text/csv' });

  // Create a temporary URL for the file
  var url = URL.createObjectURL(blob);

  // Create a new link element with the download attribute set to the desired filename
  var link = document.createElement('a');
  link.setAttribute('download', filename);

  // Set the link's href attribute to the temporary URL
  link.href = url;

  // Simulate a click on the link to trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up the temporary URL and link element
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

//change time format of '8 jul 2024 00:30' to '12:30 am 08 Jul 2024'
export function notifListDateFormat(timeString: string) {
  // Create a new Date object from the ISO string
  let date = new Date(timeString);

  // Format hours, minutes, am/pm
  let hours = date.getHours() % 12 || 12; // Convert 24-hour time to 12-hour time
  let minutes = ('0' + date.getMinutes()).slice(-2); // Ensure two digits for minutes
  let period = date.getHours() >= 12 ? 'pm' : 'am'; // Determine am/pm

  // Format date parts
  let day = ('0' + date.getDate()).slice(-2); // Ensure two digits for day
  let month = date.toLocaleString('default', { month: 'short' }); // Get short month name
  let year = date.getFullYear(); // Get full year

  // Construct formatted date string
  return `${hours}:${minutes} ${period} ${day} ${month} ${year}`;
}

export const aggregateData = (
  data: deviceHistory[],
  intervalMinutes: number = 10,
): deviceHistory[] => {
  const aggregated: { [key: string]: deviceHistory } = {};

  data.forEach((entry) => {
    // Round down to the nearest 10-minute interval
    const roundedTime = new Date(entry.time);
    roundedTime.setMinutes(
      Math.floor(roundedTime.getMinutes() / intervalMinutes) * intervalMinutes,
    );
    roundedTime.setSeconds(0);
    roundedTime.setMilliseconds(0);

    const key = roundedTime.toISOString();

    if (!aggregated[key]) {
      aggregated[key] = {
        time: key,
        temp: -Infinity,
        threshold_temp: Infinity,
        humidity: -Infinity,
      };
    }

    // Update with highest temp
    aggregated[key].temp = Math.max(aggregated[key].temp, entry.temp);

    // Update with lowest threshold_temp
    aggregated[key].threshold_temp = Math.min(
      aggregated[key].threshold_temp,
      entry.threshold_temp,
    );

    // Update with highest humidity
    aggregated[key].humidity = Math.max(
      aggregated[key].humidity,
      entry.humidity,
    );
  });

  // Convert the aggregated object back to an array
  return Object.values(aggregated);
};
