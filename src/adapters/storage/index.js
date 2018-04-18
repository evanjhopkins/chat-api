const lowdbStorageAdapter = require('./lowdbStorageAdapter');

/* this is where all the different adapter options would be. There is only one for now, but theoretically there could
 be multiple. Imagine a scenario where we want to run the api in production using Firebase to store the data. But when
 running locally for development, we want to use a local offline storage.
 */
const availableAdapters = {
    lowdbStorageAdapter // could be used for local development
    //firebaseStorageAdapter // could be used for production
};

// Returns the appropriate adapter depending on the environment (e.g. production vs development)
module.exports = availableAdapters[process.env.STORAGE_ADAPTER];
