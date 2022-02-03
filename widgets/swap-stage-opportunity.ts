import { PipelineWithOpportunities } from '@types';

export interface StageSwapPosition {
	stageId: string;
	position: number;
}

/**
 * Warning! Mutates input.
 * Normally, something like immerjs could be used to avoid mutation.
 * @param pipeline
 * @param swap
 */
export function swapStageOpportunity(
	pipeline: PipelineWithOpportunities,
	swap: { source: StageSwapPosition; destination: StageSwapPosition }
) {
	const { source, destination } = swap;
	// TODO: Might be better to create a lookup table
	const sourceStage = pipeline.stages.find(({ id }) => id == source.stageId);
	const destinationStage = pipeline.stages.find(({ id }) => id == destination.stageId);

	if (!sourceStage || !destinationStage) {
		throw new Error('Stage id is not part of this pipeline');
	}

	// Swap the list elements.
	const [swappedOpportunity] = sourceStage.opportunities.splice(source.position, 1);
	if (!swappedOpportunity) {
		throw new Error('Opportunity missing in stage!');
	}

	destinationStage.opportunities.splice(destination.position, 0, swappedOpportunity);

	// Update the self reference data (i.e. each opportunity knows where it is in the list.)
	swappedOpportunity.stageId = destination.stageId;
	destinationStage.opportunities = destinationStage.opportunities.map((opp, ind) => ({
		...opp,
		order: ind
	}));

	return pipeline;
}
