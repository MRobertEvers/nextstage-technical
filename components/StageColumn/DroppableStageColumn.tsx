import { DraggableOpportunityCard } from '@components/OpportunityCard/DraggableOpportunityCard';
import { StageWithOpportunities } from '@types';
import { Droppable } from 'react-beautiful-dnd';
import { StageColumn } from './StageColumn';

interface DroppableStageColumnProps {
	stage: StageWithOpportunities;
}
export function DroppableStageColumn(props: DroppableStageColumnProps) {
	const { stage } = props;

	return (
		<Droppable droppableId={stage.id}>
			{(provided, context) => {
				return (
					<StageColumn
						stage={stage}
						OpportunityComponent={DraggableOpportunityCard}
						forwardListProps={{
							ref: provided.innerRef,
							...provided.droppableProps
						}}
						listPlaceholder={provided.placeholder}
					/>
				);
			}}
		</Droppable>
	);
}
