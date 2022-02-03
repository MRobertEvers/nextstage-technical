import { Opportunity } from '@types';
import styles from './opportunity-card.module.scss';

export function getOpportunityCardHtmlTestId(opportunityId: string) {
	return `opportunity-${opportunityId}`;
}

interface OpportunityCardProps {
	opportunity: Opportunity;
}

export function OpportunityCard(props: OpportunityCardProps) {
	const { opportunity } = props;

	return (
		<div
			className={styles['opportunity']}
			data-testid={getOpportunityCardHtmlTestId(opportunity.id)}
		>
			<div className={styles['inner']}>{opportunity.name}</div>
		</div>
	);
}
