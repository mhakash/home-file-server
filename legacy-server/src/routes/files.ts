import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';

import { getFiles } from '../test';
import path from 'path';

const filesRoute = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/', {}, async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.get('/files', {}, async (req, reply) => {
    const q = req.query as any;
    const files = await getFiles(q['f']);

    return { pong: 'it worked!', q, files };
  });

  fastify.post('/files', async function (req, reply) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const pump = util.promisify(pipeline);
    const data = await req.file();
    console.log(data?.fields?.url);

    // data.file // stream
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

    if (data) {
      await pump(data.file, fs.createWriteStream(path.join('draft', data.filename)));

      // be careful of permission issues on disk and not overwrite
      // sensitive files that could cause security risks

      // also, consider that if the file stream is not consumed, the promise will never fulfill

      reply.send();
    }
  });
};

export default filesRoute;
