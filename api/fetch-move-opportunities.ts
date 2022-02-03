export function createFetchMoveOpportunitiesUrl() {
	return 'api/opportunity-position';
}

export interface MovedOpportunityPosition {
	opportunityId: string;
	position: number;
	stageId: string;
}

export async function fetchMoveOpportunities(
	opportunityPositions: Array<MovedOpportunityPosition>
): Promise<void> {
	const response = await fetch(createFetchMoveOpportunitiesUrl(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(opportunityPositions)
	});

	if (response.status !== 200) {
		throw new Error('Failed to move opportunities');
	}
}
