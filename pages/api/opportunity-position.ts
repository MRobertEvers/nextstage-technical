// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Pipeline } from '@prisma/client';

const prisma = new PrismaClient();

type MoveOpportunityRequest = Array<{
	opportunityId: string;
	position: number;
	stageId: string;
}>;

function isCorrectlyFormed(body: any): body is MoveOpportunityRequest {
	if (!Array.isArray(body)) {
		return false;
	}

	for (const opp of body) {
		if (
			typeof opp.opportunityId !== 'string' ||
			typeof opp.position !== 'number' ||
			typeof opp.stageId !== 'string'
		) {
			return false;
		}
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
			const opportunityPositions = req.body;
			if (isCorrectlyFormed(opportunityPositions)) {
				await prisma.$transaction(
					opportunityPositions.map((opp) =>
						prisma.opportunity.update({
							where: {
								id: opp.opportunityId
							},
							data: {
								order: opp.position,
								stageId: opp.stageId
							}
						})
					)
				);

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
