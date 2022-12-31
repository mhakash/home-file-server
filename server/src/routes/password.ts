import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import { z } from 'zod';
import sequelize from '../database';
const { models } = sequelize;

const Password = z.object({
  key: z.string({ required_error: 'key is required' }),
  name: z.string({ required_error: 'email / username required' }),
  password: z.string({ required_error: 'password required' }),
});

const fileRoute = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/passwords', {}, async (request, reply) => {
    const passwords = await models.password.findAll();
    reply.status(200).send({ password: passwords });
  });

  fastify.post('/passwords', {}, async (request, reply) => {
    try {
      const password = Password.parse(request.body);
      const newPassword = await models.password.create(password);
      return { success: true, password: newPassword };
    } catch (err) {
      reply.status(400);
      return { success: false, error: err };
    }
  });

  fastify.get(
    '/password/:id',
    {},
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const id = request.params.id;
        const password = await models.password.findOne({ where: { id } });
        return { success: true, password };
      } catch (err) {
        return { success: false, error: err };
      }
    }
  );

  fastify.patch(
    '/password/:id',
    {},
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const id = request.params.id;
        const password = Password.parse(request.body);
        const newPassword = await models.password.update(password, { where: { id } });
        return { success: true, affectedCount: newPassword };
      } catch (err) {
        return { success: false, error: err };
      }
    }
  );

  fastify.delete(
    '/password/:id',
    {},
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      try {
        const id = request.params.id;
        const affected = await models.password.destroy({ where: { id } });
        return { success: true, affectedCount: affected };
      } catch (err) {
        return { success: false, error: err };
      }
    }
  );
};

export default fileRoute;
