// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pipeline, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from 'server/prisma-client';

export function createGetPipelinesHandler(prisma: PrismaClient) {
	return async function handler(
		req: NextApiRequest,
		res: NextApiResponse<Pipeline[] | { error: string }>
	) {
		try {
			if (req.query['include-opportunities'] === 'true') {
				const pipelines = await prisma.pipeline.findMany({
					include: {
						stages: {
							include: {
								opportunities: true
							}
						}
					}
				});
				res.status(200).json(pipelines);
			} else {
				const pipelines = await prisma.pipeline.findMany();
				res.status(200).json(pipelines);
			}
		} catch {
			res.status(500).send({ error: 'failed to fetch data' });
		}
	};
}
const handler = createGetPipelinesHandler(prismaClient);
export default handler;
