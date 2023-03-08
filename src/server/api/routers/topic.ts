/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z }  from 'zod';

import { createTRPCRouter, protectedProcedure } from '../trpc';

export const topicRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return ctx.prisma.topic.findMany({
            where: {userId: ctx.session.user.id},
        });
    }),
    create: protectedProcedure.input(z.object({title: z.string()})).mutation(({ctx, input}) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return ctx.prisma.topic.create({data: {title: input.title, userId: ctx.session.user.id}})
    })
  });