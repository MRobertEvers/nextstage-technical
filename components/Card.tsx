import { Draggable } from "react-beautiful-dnd";
import styles from "./Card.module.scss";

interface OpportunityProps {
  index: number;
  id: string;
  name: string;
}

const Card = ({ index, id, name }: OpportunityProps) => (
  <Draggable draggableId={id} index={index}>
    {(provided: any, snapshot: any) => (
      <div
        id={id}
        className={styles.card}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        {name}
      </div>
    )}
  </Draggable>
);

export default Card;
