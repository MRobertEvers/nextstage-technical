import { StageSwapPosition } from 'widgets/swap-stage-opportunity';
import { DroppableStageColumn } from '@components/StageColumn/DroppableStageColumn';
import { PipelineWithOpportunities } from '@types';
import { DragDropContext, OnDragEndResponder } from 'react-beautiful-dnd';
import { PipelineBoard } from './PipelineBoard';

export interface DndPipelineBoardProps {
	pipeline: PipelineWithOpportunities;
	onSwap: (
		pipeline: PipelineWithOpportunities,
		swap: { source: StageSwapPosition; destination: StageSwapPosition }
	) => void;
}
export function DndPipelineBoard(props: DndPipelineBoardProps) {
	const { pipeline, onSwap } = props;

	const onDragEnd: OnDragEndResponder = (result) => {
		if (result.destination) {
			onSwap(pipeline, {
				source: {
					position: result.source.index,
					stageId: result.source.droppableId
				},
				destination: {
					position: result.destination.index,
					stageId: result.destination.droppableId
				}
			});
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<PipelineBoard pipeline={pipeline} StageComponent={DroppableStageColumn} />
		</DragDropContext>
	);
}
