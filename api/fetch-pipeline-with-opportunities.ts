import { PipelineWithOpportunities } from '@types';

function createFetchPipelineWithOpportunitiesUrl(pipelineId: string) {
	return `api/pipelines/${pipelineId}`;
}

/**
 * For arguments that are primitive types, e.g. string/number,
 * I prefer named arguments because type-checking is less effective.
 *
 * I.e. If this was `myFunc(id: string)`, I might accidentally call this with
 * `myFunc(pipeline.name)`. I am less likely to make that mistake if the parameter
 * is named. e.g. `myFunc({pipelineId: pipeline.name})` is a much more noticeable error.
 */
export async function fetchPipelineWithOpportunities(args: {
	pipelineId: string;
}): Promise<PipelineWithOpportunities> {
	const { pipelineId } = args;

	const query = new URLSearchParams();
	query.set('include-opportunities', 'true');

	const response = await fetch(
		`${createFetchPipelineWithOpportunitiesUrl(pipelineId)}?${query.toString()}`
	);

	if (response.status !== 200) {
		throw new Error('Failed to fetch pipelines.');
	}

	const pipeline: PipelineWithOpportunities = await response.json();

	/**
	 * We can create a separate type like "PipelineWithSortedOpportunities", but that is a bit
	 * overkill here.
	 */
	pipeline.stages.sort((a, b) => a.order - b.order);
	pipeline.stages.forEach((stage) => stage.opportunities.sort((a, b) => a.order - b.order));

	return pipeline;
}
