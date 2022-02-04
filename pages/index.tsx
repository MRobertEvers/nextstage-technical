import { Page } from '@components/Page/Page';
import { Pipeline } from '@prisma/client';
import { fetchPipelines } from 'api/fetch-pipelines';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
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

	if (pipelinesStatus === 'error') {
		return <>Something went wrong.</>;
	}

	if (pipelinesStatus !== 'done') {
		return <>Please wait...</>;
	}

	return (
		<Page>
			<div style={{ display: 'flex' }}>
				<h1>NextStage </h1>
			</div>

			{pipelines.map((pipeline) => (
				<PipelineWidget key={pipeline.id} pipeline={pipeline} />
			))}
		</Page>
	);
};

export default Board;
