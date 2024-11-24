const crypto = require("crypto");

const generateHash = (logData, previousHash) => {
  const hashData = `${previousHash}${logData.eventId}${logData.eventType}${JSON.stringify(logData.dataPayload)}${logData.timestamp}`;
  return crypto.createHash("sha256").update(hashData).digest("hex");
};

module.exports = { generateHash };
