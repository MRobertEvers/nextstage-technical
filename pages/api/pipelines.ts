// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Pipeline } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pipeline[] | { error: string }>
) {
  try {
    let pipelines = await prisma.pipeline.findMany();
    res.status(200).json(pipelines);
  } catch {
    res.status(500).send({ error: "failed to fetch data" });
  }
}
