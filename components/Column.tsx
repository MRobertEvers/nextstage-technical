import { Droppable } from "react-beautiful-dnd";
import styles from "./Column.module.scss";

interface ColumnProps {
  id: string;
  title: string;
}

const Column = ({ id, title }: ColumnProps) => {
  return (
    <Droppable key={id} droppableId={id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={styles.column}
        >
          <div>{title}</div>
          {/* {column.opportunities.map((opp, index) => (
            <Opportunity index={index} opportunity={opp} />
          ))} */}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
