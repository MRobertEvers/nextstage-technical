import { fetchCreateOpportunity } from './fetch-create-opportunity';
import { fetchMoveOpportunities } from './fetch-move-opportunities';
import { fetchPipelineWithOpportunities } from './fetch-pipeline-with-opportunities';
import { fetchPipelines } from './fetch-pipelines';

export const DEFAULT_API_CALLS = {
	fetchMoveOpportunities: fetchMoveOpportunities,
	fetchPipelineWithOpportunities: fetchPipelineWithOpportunities,
	fetchPipelines: fetchPipelines,
	fetchCreateOpportunity: fetchCreateOpportunity
};
