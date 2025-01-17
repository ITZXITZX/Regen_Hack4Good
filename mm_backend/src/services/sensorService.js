const axios = require("axios");
require("dotenv").config();
const moment = require("moment");
const { Worker } = require("worker_threads");
const path = require("path");
const { formatTime } = require("../util/sensorUtil");

// strapi constants
const strapiHost = process.env.STRAPI_HOST;
const strapiPort = process.env.STRAPI_PORT;
const strapiAuthToken = process.env.STRAPI_AUTH_TOKEN;
const maxPullSize = process.env.MAX_PULL_SIZE;
const sensorCount = process.env.SENSOR_COUNT;

// Construct the Strapi URL
const strapiUrl = `http://${strapiHost}:${strapiPort}/api`;

// get all devices
exports.getAllSensors = async function (page, pageSize) {
	//return (await axios.get(`${strapiUrl}/devices?pagination[page]=${page}&pagination[pageSize]=${pageSize}&pagination[withCount]=false`, {
	return (
		await axios.get(
			`${strapiUrl}/devices?pagination[page]=1&pagination[pageSize]=${sensorCount}&pagination[withCount]=false`,
			{
				headers: {
					Authorization: `Bearer ${strapiAuthToken}`,
				},
			}
		)
	).data.data;
};

// get sorted devices
exports.getSortedSensors = async function (page, pageSize, sortType, order) {
  return (
    await axios.get(
      `${strapiUrl}/devices?sort=${sortType}:${order}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.data;
};

// get number of sensor pages
exports.getNumberOfPages = async function (pageSize) {
  const count = (
    await axios.get(`${strapiUrl}/devices`, {
      headers: {
        Authorization: `Bearer ${strapiAuthToken}`,
      },
    })
  ).data.meta.pagination.total;

  return Math.ceil(count / pageSize);
};

// get device by id
exports.getSensorById = async function (id) {
  return (
    await axios.get(`${strapiUrl}/devices?filters[sensor_id][$eq]=${id}&populate=users`, {
      headers: {
        Authorization: `Bearer ${strapiAuthToken}`,
      },
    })
  ).data.data[0];
};

// update device by id
exports.updateSensorById = async function (body) {
  const sensor = await this.getSensorById(body.data.sensor_id);
  if (sensor != null) {
    // valid sensor id
    await axios.put(`${strapiUrl}/devices/${sensor.id}`, body, {
      headers: {
        Authorization: `Bearer ${strapiAuthToken}`,
      },
    });
  } else {
    throw new Error(`Invalid sensor ID`);
  }
};

// get sensor history
exports.getSensorHistory = async function (id, start, end) {
  // date should be utc iso string
  const startDate = moment.utc(start).subtract(1, "day").hours(16).minutes(0).seconds(0).milliseconds(0).toISOString();
  const endDate = moment.utc(end).hours(16).minutes(0).seconds(0).milliseconds(0).toISOString(); // same day

  const sensorHistory = (
    await axios.get(
      `${strapiUrl}/device-datas?filters[time][$gte]=${startDate}&filters[time][$lt]=${endDate}&filters[sensor_id][$eq]=${id}&sort=time:asc&fields[0]=time&fields[1]=temp&fields[2]=humidity&pagination[pageSize]=${maxPullSize}&pagination[withCount]=false`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.data;

  const thresholdHistory = await this.getThresholdHistory(id, startDate, endDate);

  // process sensor history data such that it has the appropriate threshold temp attached
  if (thresholdHistory.length == 0) {
    // there has been no changes to threshold temp on this day
    // find the next day which there are changes
    var thresholdTemp = (
      await axios.get(
        `${strapiUrl}/threshold-settings?filters[sensor_id][$eq]=${id}&filters[time][$gte]=${startDate}&pagination[pageSize]=1&sort=time:asc&pagination[withCount]=false`,
        {
          headers: {
            Authorization: `Bearer ${strapiAuthToken}`,
          },
        }
      )
    ).data.data[0];

    // if there is no next day where there are changes, find the current sensor temp threshold
    if (thresholdTemp == null) {
      thresholdTemp = (await this.getSensorById(id)).attributes.threshold_temp;
    } else {
      // correctly access threshold temp variable
      thresholdTemp = thresholdTemp.attributes.temp;
    }

    // add threshold temperature to all readings
    for (var i = 0; i < sensorHistory.length; i++) {
      sensorHistory[i].attributes.threshold_temp = thresholdTemp;
    }
  } else {
    var thresholdIndex = 0;
    // for all the sensor readings
    for (var i = 0; i < sensorHistory.length; i++) {
      const sensorTime = new Date(sensorHistory[i].attributes.time);
      var thresholdTime = new Date(thresholdHistory[thresholdIndex].attributes.time);

      if (thresholdIndex == thresholdHistory.length - 1) {
        // at the lastest threshold
        if (sensorTime < thresholdTime) {
          // take the previous temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.prev_temp;
        } else {
          // take current temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.temp;
        }
      } else {
        if (sensorTime < thresholdTime) {
          // take the previous temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.prev_temp;
        } else {
          thresholdIndex++; // increment threshold array
          i--; // decrement sensorHistory array to redo process with increment threshold index
        }
      }
    }
  }

  const transformedSensorHistory = sensorHistory.map((x) => ({
    id: x.id,
    attributes: {
      time: formatTime(x.attributes.time),
      temp: x.attributes.temp,
      humidity: x.attributes.humidity,
      threshold_temp: x.attributes.threshold_temp,
    },
  }));

  return transformedSensorHistory;
};

// get threshold history ... pageination?
exports.getThresholdHistory = async function (id, startDate, endDate) {
  // date should be utc iso string
  const inputEndDate = moment(endDate).add(1, "day").toISOString();
  return (
    await axios.get(
      `${strapiUrl}/threshold-settings?filters[sensor_id][$eq]=${id}&filters[time][$gte]=${startDate}&filters[time][$lt]=${inputEndDate}&sort=time:asc&fields[0]=time&fields[1]=temp&fields[2]=prev_temp&pagination[pageSize]=${maxPullSize}&pagination[withCount]=false`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.data;
};

// get alerts by device id
exports.getAlertHistory = async function (device_id, pageNumber) {
  return (
    await axios.get(
      `${strapiUrl}/alert-histories?filters[sensor_id][$eq]=${device_id}&pagination[page]=${pageNumber}&pagination[pageSize]=10&pagination[withCount]=false`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.data;
};

// get alert history pages
exports.getAlertHistoryPages = async function (device_id) {
  return (
    await axios.get(
      `${strapiUrl}/alert-histories?filters[sensor_id][$eq]=${device_id}&pagination[pageSize]=10&pagination[withCount]=true`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.meta.pagination.pageCount;
};

// delete sensor by id
exports.deleteSensorById = async function (id) {
  const sensor = await this.getSensorById(id);

  if (sensor != null) {
    // valid sensor id
    await axios.delete(`${strapiUrl}/devices/${sensor.id}`, {
      headers: {
        Authorization: `Bearer ${strapiAuthToken}`,
      },
    });
  } else {
    throw new Error(`Invalid sensor ID`);
  }
};

// get sensor by user id
exports.getSensorByUserId = async function (id) {
  return (
    await axios.get(
      `${strapiUrl}/users/${id}?populate=devices&pagination[page]=1&pagination[pageSize]=${sensorCount}&pagination[withCount]=false`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data.devices;
};

// get csv report by sensor id
exports.getCsvBySensorId = async function (id, startDate, endDate) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(path.join(__dirname, "../workers/csvWorker.js"));

    worker.on("message", (message) => {
      if (message.status === "success" || message.status === "null") {
        worker.terminate();
        resolve(message);
      } else {
        worker.terminate();
        reject(new Error(message.message));
      }
    });

    worker.on("error", (err) => {
      console.error("Worker error:", err);
      worker.terminate();
      reject(err);
    });

    worker.postMessage({
      type: "generate",
      data: {
        id: id,
        startDate: startDate,
        endDate: endDate,
      },
    });
  });
};

// get csv array
exports.getCsvArray = async function (id, start, end, thresholdHistory, page) {
  // date should be utc iso string

  const startDate = moment.utc(start).subtract(1, "day").hours(16).minutes(0).seconds(0).milliseconds(0).toISOString();
  const endDate = moment.utc(end).hours(16).minutes(0).seconds(0).milliseconds(0).toISOString(); // same day
  const withCount = page == 1 ? "true" : "false";

  const fetchData = (
    await axios.get(
      `${strapiUrl}/device-datas?filters[time][$gte]=${startDate}&filters[time][$lt]=${endDate}&filters[sensor_id][$eq]=${id}&sort=time:asc&fields[0]=time&fields[1]=temp&fields[2]=humidity&pagination[pageSize]=${maxPullSize}&pagination[withCount]=${withCount}&pagination[page]=${page}`,
      {
        headers: {
          Authorization: `Bearer ${strapiAuthToken}`,
        },
      }
    )
  ).data;

  const sensorHistory = fetchData.data;
  const pageCount = fetchData.meta.pagination.pageCount;

  // process sensor history data such that it has the appropriate threshold temp attached
  if (thresholdHistory.length == 0) {
    // there has been no changes to threshold temp on this day
    // find the next day which there are changes
    var thresholdTemp = (
      await axios.get(
        `${strapiUrl}/threshold-settings?filters[sensor_id][$eq]=${id}&filters[time][$gte]=${startDate}&pagination[pageSize]=1&sort=time:asc&pagination[withCount]=false`,
        {
          headers: {
            Authorization: `Bearer ${strapiAuthToken}`,
          },
        }
      )
    ).data.data[0];

    // if there is no next day where there are changes, find the current sensor temp threshold
    if (thresholdTemp == null) {
      thresholdTemp = (await exports.getSensorById(id)).attributes.threshold_temp;
    } else {
      // correctly access threshold temp variable
      thresholdTemp = thresholdTemp.attributes.temp;
    }

    // add threshold temperature to all readings
    for (var i = 0; i < sensorHistory.length; i++) {
      sensorHistory[i].attributes.threshold_temp = thresholdTemp;
    }
  } else {
    var thresholdIndex = 0;
    // for all the sensor readings
    for (var i = 0; i < sensorHistory.length; i++) {
      const sensorTime = new Date(sensorHistory[i].attributes.time);
      var thresholdTime = new Date(thresholdHistory[thresholdIndex].attributes.time);

      if (thresholdIndex == thresholdHistory.length - 1) {
        // at the lastest threshold
        if (sensorTime < thresholdTime) {
          // take the previous temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.prev_temp;
        } else {
          // take current temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.temp;
        }
      } else {
        if (sensorTime < thresholdTime) {
          // take the previous temp
          sensorHistory[i].attributes.threshold_temp = thresholdHistory[thresholdIndex].attributes.prev_temp;
        } else {
          thresholdIndex++; // increment threshold array
          i--; // decrement sensorHistory array to redo process with increment threshold index
        }
      }
    }
  }

  const transformedSensorHistory = sensorHistory.map((x) => ({
    id: x.id,
    time: moment(formatTime(x.attributes.time)).format("DD MMM YY HH:mm:ss"),
    temp: x.attributes.temp,
    humidity: x.attributes.humidity,
    threshold_temp: x.attributes.threshold_temp,
  }));

  return {
    sensorHistory: transformedSensorHistory,
    pageCount: pageCount,
  };
};