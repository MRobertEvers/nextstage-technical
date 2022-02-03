import { PipelineWithOpportunities } from '@types';

export const TEST_PIPELINE: PipelineWithOpportunities = {
	id: '893ac156-0263-48c3-9564-a54aab55d717',
	name: 'Test Pipeline',
	createdAt: new Date('2022-02-03T15:29:36.404Z'),
	workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692',
	stages: [
		{
			id: 'b59496c6-4706-412b-a789-f6e052ab986f',
			name: 'Stage 3',
			order: 2,
			createdAt: new Date('2022-02-03T15:29:36.404Z'),
			pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
			workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692',
			opportunities: [
				{
					id: '6db95ed6-1768-4fcb-bb52-d175162bec00',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 1',
					order: 0,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'b59496c6-4706-412b-a789-f6e052ab986f',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '9d984c90-78a8-42a9-a7d2-a18aade14a71',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 4',
					order: 3,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'b59496c6-4706-412b-a789-f6e052ab986f',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '988afaa1-dc47-4ee1-b99f-5f8d26b28832',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 7',
					order: 6,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'b59496c6-4706-412b-a789-f6e052ab986f',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '8d37c81b-641b-4d47-8470-2a35162bec0d',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 10',
					order: 9,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'b59496c6-4706-412b-a789-f6e052ab986f',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				}
			]
		},
		{
			id: '0e4d423e-8bc9-48ad-aee3-6aa45155fc3c',
			name: 'Stage 2',
			order: 1,
			createdAt: new Date('2022-02-03T15:29:36.404Z'),
			pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
			workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692',
			opportunities: [
				{
					id: 'ee456311-f2df-4209-b5a3-ac9b60d5f849',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 2',
					order: 1,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: '0e4d423e-8bc9-48ad-aee3-6aa45155fc3c',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '9fabbe3b-6219-43c6-be9f-23c2778f1026',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 5',
					order: 4,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: '0e4d423e-8bc9-48ad-aee3-6aa45155fc3c',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: 'f5dbd8f9-8216-4162-b3c6-c9881cf359f1',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 8',
					order: 7,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: '0e4d423e-8bc9-48ad-aee3-6aa45155fc3c',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				}
			]
		},
		{
			id: 'fc3cdb61-4858-4d67-94ed-5426be4dece6',
			name: 'Stage 1',
			order: 0,
			createdAt: new Date('2022-02-03T15:29:36.404Z'),
			pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
			workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692',
			opportunities: [
				{
					id: 'c6b38ec8-7162-48c2-b84d-8fd1a665982b',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 6',
					order: 0,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'fc3cdb61-4858-4d67-94ed-5426be4dece6',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '4c163243-313e-479b-8e79-0b74fdac434c',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 3',
					order: 1,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'fc3cdb61-4858-4d67-94ed-5426be4dece6',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				},
				{
					id: '7873841a-95ac-4b9f-9a9c-93db678fdbe0',
					createdAt: new Date('2022-02-03T15:29:36.412Z'),
					name: 'Opportunity 9',
					order: 2,
					pipelineId: '893ac156-0263-48c3-9564-a54aab55d717',
					stageId: 'fc3cdb61-4858-4d67-94ed-5426be4dece6',
					workspaceId: '79898c49-f8ff-4dfd-9216-6efeee574692'
				}
			]
		}
	]
};
