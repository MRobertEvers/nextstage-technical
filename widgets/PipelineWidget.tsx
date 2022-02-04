import { DndPipelineBoard } from '@components/PipelineBoard/DndPipelineBoard';
import { Opportunity, Pipeline } from '@prisma/client';
import { PipelineWithOpportunities } from '@types';
import { APIContext } from 'api/APIContext';
import { MovedOpportunityPosition } from 'api/fetch-move-opportunities';
import { useContext, useEffect, useState } from 'react';
import { NewOpportunityModalWidget } from './NewOpportunityModalWidget';
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
			status: 'done' | 'refreshing';
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

	// This is SWR like. There are libraries for this sort of thing.
	async function fetchPipelineData() {
		if (state.status === 'done') {
			setState({ status: 'refreshing', pipeline: state.pipeline });
		} else {
			setState({ status: 'loading' });
		}
		api.fetchPipelineWithOpportunities({
			pipelineId: pipeline.id
		}).then((pipelineWithOpportunities) => {
			setState({
				status: 'done',
				pipeline: pipelineWithOpportunities
			});
		});
	}

	useEffect(() => {
		fetchPipelineData();
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, []);

	const [isModalVisible, setIsModalVisible] = useState(false);

	if (state.status !== 'done' && state.status !== 'refreshing') {
		console.log('Loading');
		return <div data-testid="loading">Please wait...</div>;
	}

	const onSwap = (
		pipelineWithOpportunities: PipelineWithOpportunities,
		swap: { source: StageSwapPosition; destination: StageSwapPosition }
	) => {
		try {
			const updatedPipeline = swapStageOpportunity(pipelineWithOpportunities, swap);
			setState({ status: 'done', pipeline: updatedPipeline });

			const movedOpportunities = collectMovedOpportunities(pipelineWithOpportunities, swap);
			api.fetchMoveOpportunities(movedOpportunities).catch((e) => {
				// TODO: Undo swap.
				setState({ status: 'error' });
			});
		} catch (e: any) {
			console.error(e.toString());
			setState({ status: 'error' });
		}
	};

	return (
		<div data-testid={pipeline.id}>
			<NewOpportunityModalWidget
				onClose={(result) => {
					setIsModalVisible(false);
					if (result === 'created') {
						fetchPipelineData();
					}
				}}
				visible={isModalVisible}
				pipeline={pipeline}
			/>
			<h2>{pipeline.name}</h2>
			<button
				onClick={(e) => {
					e.stopPropagation();
					setIsModalVisible(!isModalVisible);
				}}
			>
				Add Opportunity
			</button>
			<BoardComponent pipeline={state.pipeline} onSwap={onSwap} />;
		</div>
	);
}
