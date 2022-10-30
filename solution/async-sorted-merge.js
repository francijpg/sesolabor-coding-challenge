"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  // step 1: create a empty array to contain the log entries
  const logs = [];

  // step 2: navigate through each list to add each record found in the logs array created in step 1, all this wrapped in a promise to handle method asynchrony
  await Promise.all(
    logSources.map(async (logSource) => {
      let logEntry = await logSource.popAsync();
      while (logEntry) {
        logs.push(logEntry);
        logEntry = await logSource.popAsync();
      }
    })
  );

  // step 3: sort the list of logs by chronological date
  let logsSorted = logs.sort((a, b) => a.date - b.date);

  // step 4: loop through each log in the list to be able to print them
  for (let i = 0; i < logsSorted.length; i++) {
    printer.print(logsSorted[i]);
  }

  // step 5: print the results
  printer.done();

  return new Promise((resolve, reject) => {
    resolve(console.log("Async sort complete."));
  });
};
