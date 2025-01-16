const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authentication");
const sensorController = require("../controllers/sensorController");

router.get("/allSensors", verifyToken, sensorController.getAllSensors);
router.get("/sortedSensors", verifyToken, sensorController.getSortedSensors);
router.get("/numberOfPages", verifyToken, sensorController.getNumberOfPages);
router.get("/sensorById", verifyToken, sensorController.getSensorById);
router.put("/updateSensorById", verifyToken, sensorController.updateSensorById);
router.get("/sensorHistory", verifyToken, sensorController.getSensorHistory);
router.get("/thresholdHistory", verifyToken, sensorController.getThresholdHistory);
router.get("/alertHistory", verifyToken, sensorController.getAlertHistory);
router.get("/alertHistoryPages", verifyToken, sensorController.getAlertHistoryPages);
router.delete("/deleteSensorById", verifyToken, sensorController.deleteSensorById);
router.get("/sensorByUserId", verifyToken, sensorController.getSensorByUserId);
router.get("/csvBySensorId", verifyToken, sensorController.getCsvBySensorId);

module.exports = router;
