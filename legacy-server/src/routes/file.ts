import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fs from 'fs';

import { getFileInfo, getFileURL } from '../test';

const fileRoute = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/file/html', {}, async (request, reply) => {
    const q: any = request.query;
    const path: string = q['f'];

    const pathURL = getFileURL(path);
    const file = await getFileInfo(pathURL);

    if (!file.canAccess) {
      return reply.type('text/html').send('<h1>Oops! Cannot Access File</h1>');
    } else {
      const stream = fs.createReadStream(pathURL);
      return reply.type('text/html').send(stream);
    }
  });
};

export default fileRoute;
