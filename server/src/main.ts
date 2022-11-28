import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import autoLoad from '@fastify/autoload';
import path from 'path';

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
