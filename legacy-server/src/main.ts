import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import path from 'path';
import * as dotenv from 'dotenv';
import sequelize from './database';

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
  }
}

async function init() {
  dotenv.config();

  await assertDatabaseConnectionOk();

  const fastify: FastifyInstance = Fastify({
    logger: false,
  });

  fastify.register(cors);
  fastify.register(multipart);

  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: {
      prefix: '/api/v1',
    },
  });

  fastify.listen({ port: 3001, host: '0.0.0.0' }, function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }

    fastify.log.info(`server listening on ${address}`);
  });
}

init();
