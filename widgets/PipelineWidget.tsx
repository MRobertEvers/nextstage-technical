import { DndPipelineBoard } from '@components/PipelineBoard/DndPipelineBoard';
import { Opportunity, Pipeline } from '@prisma/client';
import { PipelineWithOpportunities } from '@types';
import { APIContext } from 'api/APIContext';
import { MovedOpportunityPosition } from 'api/fetch-move-opportunities';
import { useContext, useEffect, useState } from 'react';
import { StageSwapPosition, swapStageOpportunity } from './swap-stage-opportunity';

function mapStageToMoveArgs(opp: Opportunity, index: number): MovedOpportunityPosition {
	return {
		opportunityId: opp.id,
		position: index,
		stageId: opp.stageId
	};
}

function collectMovedOpportunities(
	pipeline: PipelineWithOpportunities,
	swap: { source: StageSwapPosition; destination: StageSwapPosition }
): MovedOpportunityPosition[] {
	const { source, destination } = swap;
	const uniqueStageIds = new Set([source.stageId, destination.stageId]);
	const mutatedStages = pipeline.stages.filter(({ id }) => uniqueStageIds.has(id));

	const movedOpportunities = mutatedStages.flatMap((stage) =>
		stage.opportunities.map(mapStageToMoveArgs)
	);

	return movedOpportunities;
}

type PipelineBoardState =
	| {
			status: 'initial' | 'loading' | 'error';
	  }
	| {
			status: 'done';
			pipeline: PipelineWithOpportunities;
	  };

interface PipelineWidgetProps {
	pipeline: Pipeline;

	// Since I'm not using redux, I need a way to inject.
	BoardComponent?: React.ComponentType<{
		pipeline: PipelineWithOpportunities;
		onSwap: (
			pipeline: PipelineWithOpportunities,
			swap: { source: StageSwapPosition; destination: StageSwapPosition }
		) => void;
	}>;
}

export function PipelineWidget(props: PipelineWidgetProps) {
	const { pipeline, BoardComponent = DndPipelineBoard } = props;

	const [state, setState] = useState<PipelineBoardState>({ status: 'initial' });

	const api = useContext(APIContext);

	useEffect(() => {
		api.fetchPipelineWithOpportunities({
			pipelineId: pipeline.id
		}).then((pipelineWithOpportunities) => {
			setState({
				status: 'done',
				pipeline: pipelineWithOpportunities
			});
		});
	}, []);

	if (state.status !== 'done') {
		return <div data-testid="loading">Please wait...</div>;
	}

	const onSwap = (
		pipeline: PipelineWithOpportunities,
		swap: { source: StageSwapPosition; destination: StageSwapPosition }
	) => {
		try {
			const updatedPipeline = swapStageOpportunity(pipeline, swap);
			setState({ status: 'done', pipeline: updatedPipeline });

			const movedOpportunities = collectMovedOpportunities(pipeline, swap);
			api.fetchMoveOpportunities(movedOpportunities).catch((e) => {
				// TODO: Undo swap.
				setState({ status: 'error' });
			});
		} catch (e: any) {
			console.error(e.toString());
			setState({ status: 'error' });
		}
	};

	return <BoardComponent pipeline={state.pipeline} onSwap={onSwap} />;
}
