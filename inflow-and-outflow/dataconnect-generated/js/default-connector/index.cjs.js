const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'inflow-and-outflow',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

