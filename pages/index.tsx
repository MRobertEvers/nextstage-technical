import type { NextPage } from "next";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import { Stage } from "@types";
import Column from "@components/Column";
import { useEffect, useState } from "react";
import { Pipeline } from "@prisma/client";

const stages: Stage[] = [
  {
    id: "2f3548a6-00c2-4829-9faa-31b894d4a253",
    name: "Column 1",
    position: 1,
  },
  {
    id: "4048410c-9bde-473c-990d-07ac227e66a3",
    name: "Column 2",
    position: 2,
  },
  {
    id: "1e3b27c3-0fd7-4b2c-8c17-5d1a03565455",
    name: "Column 3",
    position: 3,
  },
];

const Board: NextPage = () => {
  const onDragEnd: OnDragEndResponder = (result) => {
    // write the logic to update the state of the board
  };
  const [pipelinesData, setPipelinesData] = useState<Pipeline[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get the pipeline data example
  useEffect(() => {
    setIsLoading(true);
    fetch("api/pipelines")
      .then((res) => res.json())
      .then((data) => {
        console.log("Pipeline Data", data);
        setPipelinesData(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div>NextStage</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", margin: "1em" }}>
          {stages.map((stage) => (
            <div key={stage.id} style={{ margin: "1em" }}>
              <Column id={stage.id} title={stage.name} />
            </div>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
