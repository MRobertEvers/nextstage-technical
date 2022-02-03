// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Pipeline, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from 'server/prisma-client';

async function findPipeline(
	prisma: PrismaClient,
	args: { pipelineId: string; includeOpportunities?: boolean }
) {
	const { pipelineId, includeOpportunities } = args;
	if (includeOpportunities) {
		return prisma.pipeline.findFirst({
			where: {
				id: pipelineId
			},
			include: {
				stages: {
					include: {
						opportunities: true
					}
				}
			}
		});
	} else {
		return prisma.pipeline.findFirst({
			where: {
				id: pipelineId
			}
		});
	}
}

export function createGetPipelineWithOpportunitiesHandler(prisma: PrismaClient) {
	return async function handler(
		req: NextApiRequest,
		res: NextApiResponse<Pipeline | { error: string }>
	) {
		// Nextjs includes path parameters in the query?
		const id = req.query.id as string;

		try {
			const pipeline = await findPipeline(prisma, {
				pipelineId: id,
				includeOpportunities: req.query['include-opportunities'] === 'true'
			});

			if (pipeline === null) {
				res.status(404).json({
					error: `Pipeline not found. Id = ${id}`
				});
			} else {
				res.status(200).json(pipeline);
			}
		} catch {
			res.status(500).send({ error: 'failed to fetch data' });
		}
	};
}

const handler = createGetPipelineWithOpportunitiesHandler(prismaClient);
export default handler;
