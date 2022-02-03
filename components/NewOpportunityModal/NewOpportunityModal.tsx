import { Modal } from '@components/Page/Modal';
import { ModalBox } from '@components/Page/ModalBox';
import { Pipeline } from '@prisma/client';
import { useState } from 'react';

import styles from './new-opportunity-modal.module.css';

interface NewOpportunityModalProps {
	pipeline: Pipeline;
	visible: boolean;
	onClose: () => void;
	onCreateOpportunity: (name: string) => void;
}

export function NewOpportunityModal(props: NewOpportunityModalProps) {
	const { visible, onClose, onCreateOpportunity, pipeline } = props;

	const [opportunityName, setOpportunityName] = useState<string>('');

	return (
		<Modal>
			<ModalBox visible={visible} onClose={onClose}>
				<div className={styles['container']}>
					<h2>Create a new Opportunity for {pipeline.name}</h2>
					<form onSubmit={() => onCreateOpportunity(opportunityName)}>
						<input
							value={opportunityName}
							placeholder="New Opportunity"
							onChange={(e) => setOpportunityName(e.target.value)}
						/>
						<button type="submit">Create</button>
					</form>
				</div>
			</ModalBox>
		</Modal>
	);
}
