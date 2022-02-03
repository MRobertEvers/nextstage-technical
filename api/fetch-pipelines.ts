import { Pipeline } from '@prisma/client';

function createFetchPipelinesUrl() {
	return 'api/pipelines';
}

/**
 * If we are fetching 'pipeline', then it means only primary properties of 'pipeline'.
 * When I want to include relations, then I always explicitly say 'pipelineWith...' or 'pipelineAnd...' etc.
 */
export async function fetchPipelines(): Promise<Pipeline[]> {
	const response = await fetch(createFetchPipelinesUrl());

	if (response.status !== 200) {
		throw new Error('Failed to fetch pipelines.');
	}

	return response.json();
}
