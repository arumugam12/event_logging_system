const mongoose = require("mongoose");

const eventLogSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sourceAppId: { type: String, required: true },
  dataPayload: { type: Object, required: true },
  previousHash: { type: String, required: true },
  currentHash: { type: String, required: true },
});

const EventLog = mongoose.model("EventLog", eventLogSchema);
module.exports = EventLog;