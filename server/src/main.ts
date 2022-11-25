import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { getFiles } from './test';
import multipart from '@fastify/multipart';
import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';
import cors from '@fastify/cors';

const pump = util.promisify(pipeline);

const fastify: FastifyInstance = Fastify({
  logger: false,
});

fastify.register(cors);
fastify.register(multipart);

fastify.post('/', async function (req, reply) {
  // process a single file
  // also, consider that if you allow to upload multiple files
  // you must consume all files otherwise the promise will never fulfill
  const data: any = await req.file();

  console.log(data?.file); // stream
  // data.fields; // other parsed parts
  // data.fieldname;
  // data.filename;
  // data.encoding;
  // data.mimetype;

  // to accumulate the file in memory! Be careful!
  //
  // await data.toBuffer() // Buffer
  //
  // or

  await pump(data.file, fs.createWriteStream(data.filename));

  // be careful of permission issues on disk and not overwrite
  // sensitive files that could cause security risks

  // also, consider that if the file stream is not consumed, the promise will never fulfill

  reply.send();
});

fastify.get('/ping', {}, async (req, reply) => {
  const q = req.query as any;
  const files = await getFiles(q['f']);

  return { pong: 'it worked!', files };
});

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
