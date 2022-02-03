import { getOpportunityCardHtmlTestId } from '@components/OpportunityCard/OpportunityCard';
import {
	DndPipelineBoard,
	DndPipelineBoardProps
} from '@components/PipelineBoard/DndPipelineBoard';
import { getStageColumnListHtmlTestId } from '@components/StageColumn/StageColumn';
import '@testing-library/jest-dom';
import { act, render, screen, waitForElementToBeRemoved, within } from '@testing-library/react';
import { PipelineWithOpportunities } from '@types';
import { DEFAULT_API_CALLS } from 'api/api';
import { APIContext } from 'api/APIContext';
import _ from 'lodash';
import React from 'react';
import { PipelineWidget } from 'widgets/PipelineWidget';
import { StageSwapPosition } from 'widgets/swap-stage-opportunity';
import { TEST_PIPELINE } from './pipeline-widget.test-data';

jest.mock('api/api');

describe('PipelineWidget', () => {
	test('Sanity check', async () => {
		const api = jest.mocked(DEFAULT_API_CALLS);

		api.fetchPipelineWithOpportunities.mockResolvedValueOnce(TEST_PIPELINE);

		render(
			<APIContext.Provider value={api}>
				<PipelineWidget pipeline={TEST_PIPELINE} />
			</APIContext.Provider>
		);

		await waitForElementToBeRemoved(screen.getByTestId('loading'));

		expect(api.fetchPipelineWithOpportunities).toBeCalledWith({
			pipelineId: TEST_PIPELINE.id
		});
	});

	test('Displays opportunities in the correct stage', async () => {
		const api = jest.mocked(DEFAULT_API_CALLS);

		api.fetchPipelineWithOpportunities.mockResolvedValueOnce(TEST_PIPELINE);

		render(
			<APIContext.Provider value={api}>
				<PipelineWidget pipeline={TEST_PIPELINE} />
			</APIContext.Provider>
		);

		await waitForElementToBeRemoved(screen.getByTestId('loading'));

		// TODO: Should probably write out each opp
		for (const stage of TEST_PIPELINE.stages) {
			const stageElem = screen.getByTestId(getStageColumnListHtmlTestId(stage.id));

			for (const opp of stage.opportunities) {
				const oppElem = within(stageElem).getByTestId(getOpportunityCardHtmlTestId(opp.id));
				expect(oppElem).not.toBeNull();
			}

			// Ensure other opportunties don't show up in this stage.
			// This is a bit overkill
			for (const otherStage of TEST_PIPELINE.stages) {
				if (stage.id === otherStage.id) {
					continue;
				}

				for (const opp of otherStage.opportunities) {
					const oppElem = within(stageElem).queryByTestId(
						getOpportunityCardHtmlTestId(opp.id)
					);
					expect(oppElem).toBeNull();
				}
			}
		}
	});

	test('Move within stage updates order in stage', async () => {
		/**
		 * This tests whether we correctly update state and view
		 * given a particular swap event. We are trusting that
		 * react dnd correct determines source and destination
		 * drop targets.
		 */
		const api = jest.mocked(DEFAULT_API_CALLS);
		const pipeline = _.cloneDeep(TEST_PIPELINE);

		api.fetchPipelineWithOpportunities.mockResolvedValueOnce(pipeline);

		/**
		 * With something like redux, we could just emit an event.
		 * But here we have to hack a little bit. There are other ways
		 * to do this with context but this will do.
		 */
		let onSwapInject: (
			pipeline: PipelineWithOpportunities,
			swap: { source: StageSwapPosition; destination: StageSwapPosition }
		) => void = () => {};
		let pipelineInject: PipelineWithOpportunities = {} as any;
		function PipelineBoardWrapper(props: DndPipelineBoardProps) {
			onSwapInject = props.onSwap;
			pipelineInject = props.pipeline;
			return <DndPipelineBoard {...props} />;
		}

		render(
			<APIContext.Provider value={api}>
				<PipelineWidget pipeline={pipeline} BoardComponent={PipelineBoardWrapper} />
			</APIContext.Provider>
		);
		await waitForElementToBeRemoved(screen.getByTestId('loading'));

		const firstStage = pipeline.stages[0];
		const firstOpportunity = firstStage.opportunities[0];
		const secondOpportunity = firstStage.opportunities[1];

		api.fetchMoveOpportunities.mockResolvedValueOnce();

		act(() => {
			onSwapInject(pipeline, {
				destination: {
					stageId: firstStage.id,
					position: 1
				},
				source: {
					stageId: firstStage.id,
					position: 0
				}
			});
		});

		expect(api.fetchMoveOpportunities).toBeCalledWith(
			expect.arrayContaining([
				expect.objectContaining({
					opportunityId: firstOpportunity.id,
					position: 1,
					stageId: firstStage.id
				}),
				expect.objectContaining({
					opportunityId: secondOpportunity.id,
					position: 0,
					stageId: firstStage.id
				})
			])
		);

		expect(pipelineInject.stages[0].opportunities[0].id).toBe(secondOpportunity.id);
	});

	test('Move across stage updates order in both stages', async () => {
		const api = jest.mocked(DEFAULT_API_CALLS);
		const pipeline = _.cloneDeep(TEST_PIPELINE);

		api.fetchPipelineWithOpportunities.mockResolvedValueOnce(pipeline);

		let onSwapInject: (
			pipeline: PipelineWithOpportunities,
			swap: { source: StageSwapPosition; destination: StageSwapPosition }
		) => void = () => {};
		let pipelineInject: PipelineWithOpportunities = {} as any;
		function PipelineBoardWrapper(props: DndPipelineBoardProps) {
			onSwapInject = props.onSwap;
			pipelineInject = props.pipeline;
			return <DndPipelineBoard {...props} />;
		}

		render(
			<APIContext.Provider value={api}>
				<PipelineWidget pipeline={pipeline} BoardComponent={PipelineBoardWrapper} />
			</APIContext.Provider>
		);
		await waitForElementToBeRemoved(screen.getByTestId('loading'));

		const firstStage = pipeline.stages[0];
		const secondStage = pipeline.stages[1];
		const firstOpportunityFromFirstStage = firstStage.opportunities[0];
		const secondOpportunityFromFirstStage = firstStage.opportunities[1];
		const secondOpportunityFromSecondStage = secondStage.opportunities[1];

		api.fetchMoveOpportunities.mockResolvedValueOnce();

		act(() => {
			onSwapInject(pipeline, {
				destination: {
					stageId: secondStage.id,
					position: 1
				},
				source: {
					stageId: firstStage.id,
					position: 0
				}
			});
		});

		expect(api.fetchMoveOpportunities).toBeCalledWith(
			expect.arrayContaining([
				expect.objectContaining({
					opportunityId: firstOpportunityFromFirstStage.id,
					position: 1,
					stageId: secondStage.id
				}),
				// Check that the other objects are pushed up.
				expect.objectContaining({
					opportunityId: secondOpportunityFromSecondStage.id,
					position: 2,
					stageId: secondStage.id
				}),
				expect.objectContaining({
					opportunityId: secondOpportunityFromFirstStage.id,
					position: 0,
					stageId: firstStage.id
				})
			])
		);

		// Ensure the state updated correctly.
		expect(pipelineInject.stages[0].opportunities[0].id).toBe(
			secondOpportunityFromFirstStage.id
		);
		expect(pipelineInject.stages[1].opportunities[1].id).toBe(
			firstOpportunityFromFirstStage.id
		);
		expect(pipelineInject.stages[1].opportunities[2].id).toBe(
			secondOpportunityFromSecondStage.id
		);
	});
});
