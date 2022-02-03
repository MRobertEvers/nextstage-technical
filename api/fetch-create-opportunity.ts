function createFetchPipelinesUrl() {
	return 'api/opportunity';
}

export async function fetchCreateOpportunity(args: {
	pipelineId: string;
	opportunityName: string;
}): Promise<void> {
	const { opportunityName, pipelineId } = args;
	const response = await fetch(createFetchPipelinesUrl(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			pipelineId: pipelineId,
			name: opportunityName
		})
	});

	if (response.status !== 200) {
		throw new Error('Failed to create opportunity.');
	}
}
