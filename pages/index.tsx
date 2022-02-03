import { NewOpportunityModal } from '@components/NewOpportunityModal/NewOpportunityModal';
import { Modal } from '@components/Page/Modal';
import { ModalBox } from '@components/Page/ModalBox';
import { Page } from '@components/Page/Page';
import { Pipeline } from '@prisma/client';
import { fetchPipelines } from 'api/fetch-pipelines';
import type { NextPage } from 'next';
import { Fragment, useEffect, useState } from 'react';
import { NewOpportunityModalWidget } from 'widgets/NewOpportunityModalWidget';
import { PipelineWidget } from 'widgets/PipelineWidget';

const Board: NextPage = () => {
	const [pipelines, setPipelines] = useState<Pipeline[]>([]);
	const [pipelinesStatus, setPipelinesStatus] = useState<
		'initial' | 'loading' | 'error' | 'done'
	>('initial');

	async function fetchIndexData() {
		setPipelinesStatus('loading');
		return fetchPipelines()
			.then((data) => {
				console.log('Pipeline Data', data);
				setPipelines(data);
				setPipelinesStatus('done');
			})
			.catch((err) => {
				setPipelinesStatus('error');
			});
	}

	// Get the pipeline data example
	useEffect(() => {
		fetchIndexData();
	}, []);

	const [isModalVisible, setIsModalVisible] = useState(false);

	if (pipelinesStatus === 'error') {
		return <>Something went wrong.</>;
	}

	if (pipelinesStatus !== 'done') {
		return <>Please wait...</>;
	}

	return (
		<Page>
			<div style={{ display: 'flex' }}>
				<h1>NextStage</h1>
			</div>

			{pipelines.map((pipeline) => (
				<div key={pipeline.id}>
					<NewOpportunityModalWidget
						onClose={(result) => {
							setIsModalVisible(false);
							if (result === 'created') {
								fetchIndexData();
							}
						}}
						visible={isModalVisible}
						pipeline={pipeline}
					/>
					<h2>{pipeline.name}</h2>
					<button
						onClick={(e) => {
							e.stopPropagation();
							setIsModalVisible(!isModalVisible);
						}}
					>
						Add Opportunity
					</button>
					<PipelineWidget pipeline={pipeline} />
				</div>
			))}
		</Page>
	);
};

export default Board;
