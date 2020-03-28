const Logger = require('logplease');

const options = {
    useColors: true,     // Enable colors
    showTimestamp: true, // Display timestamp in the log message
    useLocalTime: false, // Display timestamp in local timezone
    showLevel: true,     // Display log level in the log message
    filename: null,      // Set file path to log to a file
    appendFile: true,    // Append logfile instead of overwriting
};
export const logger = Logger.create("shop-keepur", options);
