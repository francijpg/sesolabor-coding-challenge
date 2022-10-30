"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // step 1: create a empty array to contain the log entries
  const logs = [];

  // step 2: navigate through each list to add each record found in the logs array created in step 1
  for (let i = 0; i < logSources.length; i++) {
    const logSource = logSources[i];
    let logEntry = logSource.pop();
    while (logEntry) {
      logs.push(logEntry);
      logEntry = logSource.pop();
    }
  }

  // step 3: sort the list of logs by chronological date
  let logsSorted = logs.sort((a, b) => a.date - b.date);

  // step 4: loop through each log in the list to be able to print them
  for (let i = 0; i < logsSorted.length; i++) {
    printer.print(logsSorted[i]);
  }

  // step 5: print the results
  printer.done();

  return console.log("Sync sort complete.");
};
