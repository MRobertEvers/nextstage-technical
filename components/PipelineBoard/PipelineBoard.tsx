import { StageColumn } from '@components/StageColumn/StageColumn';
import { PipelineWithOpportunities, StageWithOpportunities } from '@types';

interface PipelineBoardProps {
	pipeline: PipelineWithOpportunities;
	StageComponent?: React.ComponentType<{ stage: StageWithOpportunities }>;
}

export function PipelineBoard(props: PipelineBoardProps) {
	const { pipeline, StageComponent = StageColumn } = props;

	return (
		<div style={{ display: 'flex', margin: '1em' }}>
			{pipeline.stages.map((stage) => (
				<StageComponent key={stage.id} stage={stage} />
			))}
		</div>
	);
}
