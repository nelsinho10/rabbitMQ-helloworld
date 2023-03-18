import amqp from 'amqplib/callback_api.js';

// Connect to RabbitMQ
amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err1, chanel) => {
    if (err1) {
      throw err1;
    }

    const queue = 'hello';
    const msg = 'Hello World!';

    chanel.assertQueue(queue, {
      durable: false,
    });

    chanel.sendToQueue(queue, Buffer.from(msg));
    console.log(`[x] Sent ${msg}`);
  });

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
