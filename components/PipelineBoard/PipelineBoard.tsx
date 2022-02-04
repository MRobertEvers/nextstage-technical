import { StageColumn } from '@components/StageColumn/StageColumn';
import { PipelineWithOpportunities, StageWithOpportunities } from '@types';

import styles from './pipeline-board.module.scss';

interface PipelineBoardProps {
	pipeline: PipelineWithOpportunities;
	StageComponent?: React.ComponentType<{ stage: StageWithOpportunities }>;
}

export function PipelineBoard(props: PipelineBoardProps) {
	const { pipeline, StageComponent = StageColumn } = props;

	return (
		<div className={styles['board']}>
			{pipeline.stages.map((stage) => (
				<StageComponent key={stage.id} stage={stage} />
			))}
		</div>
	);
}
