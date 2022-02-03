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

	// Get the pipeline data example
	useEffect(() => {
		setPipelinesStatus('loading');
		fetchPipelines()
			.then((data) => {
				console.log('Pipeline Data', data);
				setPipelines(data);
				setPipelinesStatus('done');
			})
			.catch((err) => {
				setPipelinesStatus('error');
			});
	}, []);

	if (pipelinesStatus === 'error') {
		return <>Something went wrong.</>;
	}

	if (pipelinesStatus !== 'done') {
		return <>Please wait...</>;
	}

	return (
		<>
			<div>NextStage</div>
			{pipelines.map((pipeline) => (
				<PipelineWidget key={pipeline.id} pipeline={pipeline} />
			))}
		</>
	);
};

export default Board;
