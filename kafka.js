
const Bluebird = require('bluebird');
const Kafka = require('kafka-node');

function createTopics(topics) {
  return new Bluebird((resolve, reject) => {
    const Producer = Kafka.Producer;
    const client = new Kafka.Client();
    const producer = new Producer(client);

    producer.on('ready', () => {
      Bluebird.promisify(producer.createTopics).bind(producer)(topics, false)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    producer.on('error', (error) => {
      reject(error);
    });
  });
}

function write(topic, messages) {
  return new Bluebird((resolve, reject) => {
    const Producer = Kafka.Producer;
    const client = new Kafka.Client();
    const producer = new Producer(client);
    const payloads = [{ topic, messages }];

    producer.on('ready', () => {
      Bluebird.promisify(producer.send).bind(producer)(payloads)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

    producer.on('error', (error) => {
      reject(error);
    });
  });
}

function consume(topic) {
  const Consumer = Kafka.Consumer;
  const client = new Kafka.Client();
  const consumer = new Consumer(client, [{ topic: topic }]);

  consumer.on('message', (message) => {
    console.log(message);
  });

  consumer.on('error', (error) => {
    console.log(error);
  });
}

module.exports = {
  createTopics,
  write,
  consume
};
