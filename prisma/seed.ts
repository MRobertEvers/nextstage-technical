import { PrismaClient, Workspace } from '@prisma/client';
import _ from 'lodash';

const prisma = new PrismaClient();

const stages = ['Stage 1', 'Stage 2', 'Stage 3'];

const opportunities = [
	{ name: 'Opportunity 1' },
	{ name: 'Opportunity 2' },
	{ name: 'Opportunity 3' },
	{ name: 'Opportunity 4' },
	{ name: 'Opportunity 5' },
	{ name: 'Opportunity 6' },
	{ name: 'Opportunity 7' },
	{ name: 'Opportunity 8' },
	{ name: 'Opportunity 9' },
	{ name: 'Opportunity 10' }
];

const main = async () => {
	let newWorkspace = await prisma.workspace.create({
		data: {
			name: 'Test Workspace'
		}
	});

	let newPipeline = await prisma.pipeline.create({
		data: {
			name: 'Test Pipeline',
			workspace: { connect: { id: newWorkspace.id } },
			stages: {
				create: stages.map((stage, ind) => ({
					name: stage,
					order: ind,
					workspace: { connect: { id: newWorkspace.id } }
				}))
			}
		},
		include: { stages: true }
	});

	let newStages = await prisma.stage.findMany({
		where: { workspaceId: newWorkspace.id }
	});

	await prisma.opportunity.createMany({
		data: opportunities.map((opp, index) => {
			// if (randomStage?.id) {
			return {
				name: opp.name,
				pipelineId: newPipeline.id,
				stageId: newStages[index % newStages.length].id,
				workspaceId: newWorkspace.id,
				order: Math.floor(index / newStages.length)
			};
			// }
		})
	});
};

main()
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		console.log('Done seeding database');
		process.exit();
	});
