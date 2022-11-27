import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import util from 'util';
import { pipeline } from 'stream';
import fs from 'fs';

import { getFiles } from '../test';

const fileRoute = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/', {}, async (request, reply) => {
    return { hello: 'world' };
  });

  fastify.get('/files', {}, async (req, reply) => {
    const q = req.query as any;
    const files = await getFiles(q['f']);

    return { pong: 'it worked!', files };
  });

  fastify.post('/files', async function (req, reply) {
    // process a single file
    // also, consider that if you allow to upload multiple files
    // you must consume all files otherwise the promise will never fulfill
    const pump = util.promisify(pipeline);
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
};

export default fileRoute;
