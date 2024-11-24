const socket = io("http://localhost:3000");
const logList = document.getElementById("logs");

socket.on("new_log", (log) => {
    console.log("Received new log:", log);

    const li = document.createElement("li");
    li.classList.add("log-item");
    li.innerHTML = `
    <strong>Event Type:</strong> ${log.eventType} <br>
    <strong>Source App ID:</strong> ${log.sourceAppId} <br>
    <strong>Timestamp:</strong> ${new Date(log.timestamp).toLocaleString()} <br>
    <strong>Data Payload:</strong> <pre>${JSON.stringify(log.dataPayload, null, 2)}</pre>
    <strong>Previous Hash:</strong> ${log.previousHash} <br>
    <strong>Current Hash:</strong> ${log.currentHash} <br>
    <hr>
  `;
    logList.appendChild(li);
});

socket.on("connect", () => {
    console.log("WebSocket connected:", socket.id);
});

socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
});
