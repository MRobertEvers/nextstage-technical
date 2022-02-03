import { NewOpportunityModal } from '@components/NewOpportunityModal/NewOpportunityModal';
import { Pipeline } from '@prisma/client';
import { APIContext } from 'api/APIContext';
import { useCallback, useContext } from 'react';

interface NewOpportunityModalWidgetProps {
	visible: boolean;
	onClose: (result: 'close' | 'created' | 'error') => void;
	pipeline: Pipeline;

	NewOpportunityModalComponent?: React.ComponentType<{
		pipeline: Pipeline;
		visible: boolean;
		onClose: () => void;
		onCreateOpportunity: (name: string) => void;
	}>;
}

export function NewOpportunityModalWidget(props: NewOpportunityModalWidgetProps) {
	const {
		visible,
		onClose,
		pipeline,
		NewOpportunityModalComponent = NewOpportunityModal
	} = props;

	const api = useContext(APIContext);

	const onCreateOpportunity = useCallback((name: string) => {
		api.fetchCreateOpportunity({
			pipelineId: pipeline.id,
			opportunityName: name
		})
			.then(() => {
				onClose('created');
			})
			.catch(() => onClose('error'));
	}, []);

	return (
		<NewOpportunityModalComponent
			pipeline={pipeline}
			onClose={() => onClose('close')}
			visible={visible}
			onCreateOpportunity={onCreateOpportunity}
		/>
	);
}
