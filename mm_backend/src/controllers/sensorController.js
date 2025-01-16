const sensorService = require("../services/sensorService.js");
const util = require("../util/sensorUtil.js");
const fs = require("fs");

exports.getAllSensors = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const page = util.correctPage(parseInt(req.query.page) || 1);
    const pageSize = util.correctPageSize(parseInt(req.query.limit) || 10);

    console.log("Retrieving sensor data...");
    const devices = await sensorService.getAllSensors(page, pageSize);
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error retrieving all sensors", error);
    res.status(500).json({ message: "Error retrieving all sensors" });
  }
};

exports.getSortedSensors = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const page = util.correctPage(parseInt(req.query.page) || 1);
    const pageSize = util.correctPageSize(parseInt(req.query.limit) || 10);

    // make sure sort type and order are valid strings
    const sortType = util.isValidSortType(req.query.sortType);
    const order = util.isValidOrder(req.query.order);

    console.log("Retrieving sorted sensor data...");
    const devices = await sensorService.getSortedSensors(page, pageSize, sortType, order);
    res.status(200).json(devices); // returns an array of sensors
  } catch (error) {
    console.error("Error retrieving sorted sensor devices", error);
    res.status(500).json({ message: "Error retrieving sorted sensor devices" });
  }
};

exports.getNumberOfPages = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const pageSize = util.correctPageSize(parseInt(req.query.limit) || 10);

    console.log("Retrieving number of sensor pages...");
    const numberOfPages = await sensorService.getNumberOfPages(pageSize);
    res.status(200).json({ count: numberOfPages });
  } catch (error) {
    console.error("Error retrieving sensor pages", error);
    res.status(500).json({ message: "Error retrieving sensor pages" });
  }
};

exports.getSensorById = async (req, res) => {
  try {
    // validate sensor id TODO
    const id = util.isValidId(req.query.devEUI);

    console.log("Retrieving sensor data by ID...");
    const device = await sensorService.getSensorById(id);
    res.status(200).json(device);
  } catch (error) {
    console.error("Error retrieving sensor by ID", error);
    res.status(500).json({ message: "Error retrieving sensor by ID" });
  }
};

exports.updateSensorById = async (req, res) => {
  try {
    // verifiy data TODO
    console.log("Updating sensor by ID...");
    const update = {
      data: {
        sensor_name: req.body.data.sensor_name,
        sensor_id: req.body.data.sensor_id,
        location: req.body.data.location,
        threshold_temp: req.body.data.threshold_temp,
        alerts_enabled: req.body.data.alerts_enabled,
        users: req.body.data.users,
      },
    };
    await sensorService.updateSensorById(update);
    res.status(200).send({
      message: `Sensor: ${req.body.data.sensor_id} successfully updated`,
    });
  } catch (error) {
    console.error("Error updating sensor by ID", error);
    res.status(500).json({ message: "Error updating sensor by ID" });
  }
};

exports.getSensorHistory = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = util.isValidId(req.query.devEUI);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log("Retrieving sensor history by ID and Date...");
    const history = await sensorService.getSensorHistory(id, startDate, endDate);
    res.status(200).json(history.map((x) => x.attributes));
  } catch (error) {
    console.error("Error retrieving sensor history", error);
    res.status(500).json({ message: "Error retrieving sensor history" });
  }
};

exports.getThresholdHistory = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = util.isValidId(req.query.devEUI);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log("Retrieving threshold history by ID and Date...");
    const history = await sensorService.getThresholdHistory(id, startDate, endDate);
    res.status(200).json(history.map((x) => x.attributes));
  } catch (error) {
    console.error("Error retrieving threshold history", error);
    res.status(500).json({ message: "Error retrieving threshold history" });
  }
};

exports.getAlertHistory = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = util.isValidId(req.query.devEUI);
    const page = util.correctPage(parseInt(req.query.page) || 1);

    console.log("Retrieving alert history by ID and page number");
    const history = await sensorService.getAlertHistory(id, page);
    res.status(200).json(history.map((x) => x));
  } catch (error) {
    console.error("Error retrieving alert history", error);
    res.status(500).json({ message: "Error retrieving alert history" });
  }
};

exports.getAlertHistoryPages = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = util.isValidId(req.query.devEUI);

    console.log("Retrieving alert history pages by ID...");
    const pageCount = await sensorService.getAlertHistoryPages(id);
    res.status(200).json({pageCount: pageCount});
  } catch (error) {
    console.error("Error retrieving alert history pages by ID", error);
    res.status(500).json({ message: "Error retrieving alert history pages by ID" });
  }
};

exports.deleteSensorById = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = util.isValidId(req.query.devEUI);

    console.log("Deleting sensor by ID...");
    await sensorService.deleteSensorById(id);
    res.status(200).json({ message: `Sensor: ${id} successfully deleted` });
  } catch (error) {
    console.error("Error Deleting Sensor", error);
    res.status(500).json({ message: "Error deleting sensor by ID" });
  }
};

exports.getSensorByUserId = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = req.query.userId;

    console.log("Getting sensor by user ID..");
    const devices = await sensorService.getSensorByUserId(id);
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error getting sensor by user ID", error);
    res.status(500).json({ message: "Error getting sensor by user ID" });
  }
};

exports.getCsvBySensorId = async (req, res) => {
  try {
    // make sure page size and page are valid numbers
    const id = req.query.devEUI;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log("Getting CSV report by sensor ID..");
    const csvData = await sensorService.getCsvBySensorId(id, startDate, endDate);

    if (csvData.status === "success") {
      res.download(csvData.path, csvData.fileName, (err) => {
        if (err) {
          console.error("Error while sending file:", err);
          res.status(500).send("Error while sending file");
        } else {
          // delete the file after download
          fs.unlink(csvData.path, (err) => {
            if (err) {
              console.error(`Error deleting CSV file: ${err}`);
            } else {
              console.log("CSV file deleted successfully");
            }
          });
        }
      });
    } else if (csvData.status === "null") {
      res.status(200).json({ status: null });
    }
  } catch (error) {
    console.error("Error getting CSV Report by sensor ID", error);
    res.status(500).json({ message: "Error getting CSV Report by sensor ID" });
  }
};
