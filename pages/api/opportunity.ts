// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Pipeline } from '@prisma/client';

const prisma = new PrismaClient();

type CreateOpportunityRequest = {
	name: string;
	pipelineId: string;
};

function isCorrectlyFormed(body: any): body is CreateOpportunityRequest {
	if (typeof body.name !== 'string' || typeof body.pipelineId !== 'string') {
		return false;
	}

	return true;
}

/**
 * For simplicity, I just used an "order" field on the opportunities, but this doesn't
 * scale to very large lists.
 *
 * There are better ways to do this at scale. E.g. Lexicographical ordering as popularized by Jira.
 * https://confluence.atlassian.com/adminjiraserver/managing-lexorank-938847803.html
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<void | { error: string }>
) {
	try {
		if (req.method === 'POST') {
			const opportunity = req.body;
			if (isCorrectlyFormed(opportunity)) {
				// TODO: Concurrency issues

				const pipeline = await prisma.pipeline.findFirst({
					where: {
						id: opportunity.pipelineId
					},
					include: {
						stages: {
							include: {
								opportunities: true
							}
						}
					}
				});

				if (!pipeline) {
					res.status(400).send({ error: 'Bad request' });
					return;
				}

				pipeline.stages.sort((a, b) => a.order - b.order);

				// TODO: Assumes only one workspace
				const workspace = await prisma.workspace.findFirst();
				if (!workspace) {
					res.status(500).send({ error: 'Server error' });
					return;
				}

				await prisma.opportunity.create({
					data: {
						name: opportunity.name,
						order: pipeline.stages[0].opportunities.length,
						pipelineId: opportunity.pipelineId,
						stageId: pipeline.stages[0].id,
						workspaceId: workspace.id
					}
				});

				res.status(200).end();
			} else {
				res.status(400).send({ error: 'Bad request' });
			}
		} else {
			res.status(404).end();
		}
	} catch {
		res.status(500).send({ error: 'failed to fetch data' });
	}
}
