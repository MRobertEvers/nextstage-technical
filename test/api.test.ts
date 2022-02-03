import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
import { createMocks } from 'node-mocks-http';
import { createCreateOpportunityHandler } from 'pages/api/opportunity';
import { TEST_PIPELINE } from './pipeline-widget.test-data';

jest.mock('@prisma/client');

describe('API', () => {
	test('Rejects bad request', async () => {
		const { req, res } = createMocks({
			path: 'api/opportunity',
			method: 'POST'
		});

		const prisma = jest.mocked(new PrismaClient(), true);
		const handler = createCreateOpportunityHandler(prisma);
		await handler(req, res);

		expect(res.statusCode).toBe(400);
	});

	test('Sends new opportunity to database', async () => {
		const { req, res } = createMocks({
			path: 'api/opportunity',
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: {
				name: 'New Opportunity',
				pipelineId: '1'
			}
		});

		const prisma = mockDeep<PrismaClient>(new PrismaClient());
		prisma.pipeline.findFirst.mockResolvedValueOnce(TEST_PIPELINE);
		prisma.workspace.findFirst.mockResolvedValueOnce({
			id: '1'
		} as any);
		const handler = createCreateOpportunityHandler(prisma);
		await handler(req, res);

		expect(prisma.opportunity.create).toBeCalled();
		expect(res.statusCode).toBe(200);
	});
});
