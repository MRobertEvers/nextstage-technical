import { OpportunityCard } from '@components/OpportunityCard/OpportunityCard';
import { Opportunity } from '@prisma/client';
import { StageWithOpportunities } from '@types';
import { DetailedHTMLProps, HTMLAttributes, ReactElement } from 'react';
import { popForwardClassName } from 'utils/pop-forward-class-name';

import styles from './stage-column.module.scss';

export function getStageColumnListHtmlTestId(stageId: string) {
	return `stage-${stageId}`;
}

interface StageColumnProps {
	stage: StageWithOpportunities;
	OpportunityComponent?: React.ComponentType<{ opportunity: Opportunity; position: number }>;

	// These are for Droppable support.
	forwardListProps?: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	listPlaceholder?: ReactElement | null;
}

export function StageColumn(props: StageColumnProps) {
	const {
		stage,
		forwardListProps,
		listPlaceholder,
		OpportunityComponent = OpportunityCard
	} = props;

	const { forward, className } = popForwardClassName(forwardListProps || {}, styles['list']);

	// TODO: This should not be here. This should be done before the opportunity list enters
	// the ecosystem. Use a type like "SortedOpportunityList"
	stage.opportunities.sort((a, b) => a.order - b.order);
	return (
		<div className={styles['stage']} style={{ margin: '1em' }}>
			{stage.name}
			<div
				className={className}
				{...forward}
				data-testid={getStageColumnListHtmlTestId(stage.id)}
			>
				{stage.opportunities.map((opp, ind) => (
					<OpportunityComponent key={opp.id} opportunity={opp} position={ind} />
				))}
				{listPlaceholder}
			</div>
		</div>
	);
}
