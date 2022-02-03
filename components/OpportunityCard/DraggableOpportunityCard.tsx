import { Opportunity } from '@types';
import { Draggable } from 'react-beautiful-dnd';
import { OpportunityCard } from './OpportunityCard';

interface DraggableOpportunityCardProps {
	opportunity: Opportunity;
	position: number;
}

export function DraggableOpportunityCard(props: DraggableOpportunityCardProps) {
	const { opportunity, position } = props;

	return (
		<Draggable draggableId={opportunity.id} index={position}>
			{(provided, snapshot) => {
				return (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
					>
						<OpportunityCard opportunity={opportunity} />
					</div>
				);
			}}
		</Draggable>
	);
}
