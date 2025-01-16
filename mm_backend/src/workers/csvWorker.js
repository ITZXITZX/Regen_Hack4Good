const { parentPort } = require("worker_threads");
const {
	getCsvArray,
	getThresholdHistory,
} = require("../services/sensorService");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const fs = require("fs").promises;
const path = require("path");
const { changeDateFormat } = require("../util/sensorUtil.js");

// Function to convert JSON to CSV
async function convertSensorHistoryToCsv(sensorHistory, csvFilePath) {
	try {
		const csvWriter = createCsvWriter({
			path: csvFilePath,
			header: [
				{ id: "id", title: "ID" },
				{ id: "time", title: "Time" },
				{ id: "temp", title: "Temperature" },
				{ id: "humidity", title: "Humidity" },
				{ id: "threshold_temp", title: "Threshold Temperature" },
			],
		});

		await csvWriter.writeRecords(sensorHistory);
		console.log("CSV file was written successfully to:", csvFilePath);
	} catch (error) {
		console.error("Error writing CSV file:", error);
		throw error;
	}
}

async function getSensorHistArr(id, startDate, endDate) {
	try {
		const thresholdHistory = await getThresholdHistory(id, startDate, endDate);
		const firstFetch = await getCsvArray(
			id,
			startDate,
			endDate,
			thresholdHistory,
			1
		);
		const pageCount = firstFetch.pageCount;
		let sensorHistArr = firstFetch.sensorHistory;

		for (let page = 2; page <= pageCount; page++) {
			const fetch = await getCsvArray(
				id,
				startDate,
				endDate,
				thresholdHistory,
				page
			);
			sensorHistArr = sensorHistArr.concat(fetch.sensorHistory);
		}

		return sensorHistArr;
	} catch (error) {
		console.error("Error fetching sensor history data", error);
		throw new Error("Error fetching sensor history data");
	}
}

// Listen for messages from the main thread
parentPort.on("message", async (message) => {
	if (message.type === "generate") {
		try {
			console.log("Starting CSV generation for:", message.data.id);

			const data = await getSensorHistArr(
				message.data.id,
				message.data.startDate,
				message.data.endDate
			);

			if (data.length === 0) {
				parentPort.postMessage({ status: "null" });
				return;
			}

			const fileName = `${message.data.id}_FROM_${changeDateFormat(
				message.data.startDate
			)}_TO_${changeDateFormat(message.data.endDate)}.csv`;
			const dirPath = path.resolve(__dirname, "../../csvReports");
			const csvPath = path.join(dirPath, fileName);

			console.log("CSV file path:", csvPath);

			// Ensure directory exists
			await fs.mkdir(dirPath, { recursive: true });

			// Convert and write CSV
			await convertSensorHistoryToCsv(data, csvPath);

			// Verify file exists
			await fs.access(csvPath);

			parentPort.postMessage({
				status: "success",
				path: csvPath,
				fileName: fileName,
			});
		} catch (error) {
			console.error("Error in CSV generation process:", error);
			parentPort.postMessage({ status: "error", message: error.message });
		}
	}
});
