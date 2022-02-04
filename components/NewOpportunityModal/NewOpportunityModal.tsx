import { Modal } from '@components/Page/Modal';
import { ModalBox } from '@components/Page/ModalBox';
import { Pipeline } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

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

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (visible === true) {
			inputRef.current?.focus();
			setOpportunityName('');
		}
	}, [visible]);

	return (
		<Modal>
			<ModalBox visible={visible} onClose={onClose}>
				<div className={styles['container']}>
					<h2>Create a new Opportunity for {pipeline.name}</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							onCreateOpportunity(opportunityName);

							// I don't want the opportunity name to change while transitioning out
							// so just reset it when it transitions in.
							// setOpportunityName('');
						}}
					>
						<input
							ref={inputRef}
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
