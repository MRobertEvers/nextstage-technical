/**
 * Did prisma generate this file or was this added later?
 */
import { Opportunity as PrismaOpportunity, Pipeline, Stage } from '@prisma/client';

/**
 * I'm unsure if prisma provides composite types like this.
 *
 * Currently I'm not sure the best way to communicate types to the browser
 * without just hard-coding them for each request.
 */
export type StageWithOpportunities = Stage & {
	opportunities: Array<Opportunity>;
};

export type PipelineWithOpportunities = Pipeline & {
	stages: Array<StageWithOpportunities>;
};

export type Opportunity = PrismaOpportunity;
