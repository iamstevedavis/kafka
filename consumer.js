
var kafka = require('./kafka');

kafka.consume('steve1');


/*


const Kafka = require('kafka-node');

const Consumer = Kafka.Consumer;
const client = new Kafka.Client();
const consumer = new Consumer(client, [{ topic: 'steve1' }]);

consumer.on('message', (message) => {
  console.log(message);
});

consumer.on('error', (error) => {
  console.log(error);
});

*/
