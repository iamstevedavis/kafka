
var kafka = require('./kafka');

kafka.createTopics(['steve1'])
  .then(() => kafka.write('steve1', ['Hello!']))
  .catch((error) => {
    console.log('Got Error => ', error);
  });
