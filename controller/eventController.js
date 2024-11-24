const express = require("express");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const EventLog = require("../models/eventModel");
const { generateHash } = require("../utils/hashUtil");

// Validation schema
const eventSchema = Joi.object({
    eventType: Joi.string().required(),
    sourceAppId: Joi.string().required(),
    dataPayload: Joi.object().required(),
});

// POST logs - Add a new log
const addEvent = async (req, res) => {
    try {
        // Validate the incoming request body
        const { error } = eventSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: `Validation Error: ${error.details[0].message}` });
        }

        // Generate log data
        const timestamp = new Date().toISOString();
        const lastLog = await EventLog.findOne().sort({ _id: -1 });
        const previousHash = lastLog ? lastLog.currentHash : "0";

        const logData = {
            eventId: uuidv4(),
            ...req.body,
            timestamp,
        };

        // Generate cryptographic hash
        const currentHash = generateHash(logData, previousHash);

        // Save new log entry
        const newLog = new EventLog({ ...logData, previousHash, currentHash });
        await newLog.save();

        // Broadcast to WebSocket clients
        req.app.locals.broadcastLog(newLog);

        res.status(201).json({ message: "Log added successfully!", log: newLog });
    } catch (err) {
        console.error("Error adding event:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

// GET logs - Query logs
const getEvent = async (req, res) => {
    try {
        const { eventType, sourceAppId, startTimestamp, endTimestamp, page = 1, limit = 10 } = req.query;

        // Create query filters
        const filters = {};
        if (eventType) filters.eventType = eventType;
        if (sourceAppId) filters.sourceAppId = sourceAppId;
        if (startTimestamp || endTimestamp) {
            filters.timestamp = {};
            if (startTimestamp) filters.timestamp.$gte = new Date(startTimestamp);
            if (endTimestamp) filters.timestamp.$lte = new Date(endTimestamp);
        }

        // Query logs with pagination
        const logs = await EventLog.find(filters)
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({ logs, page: parseInt(page), limit: parseInt(limit) });
    } catch (err) {
        console.error("Error querying events:", err.message);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};

module.exports = {
    addEvent,
    getEvent,
};