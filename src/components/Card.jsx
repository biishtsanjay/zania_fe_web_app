import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ClipLoader from "react-spinners/ClipLoader";

const style = {
  border: "1px solid gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
  maxWidth: "250px",
  height: "210px",
};
const ItemTypes = {
  CARD: "card",
};

const Card = ({ id, text, index, moveCard, img, onClick }) => {
  const [loading, setLoading] = useState(true);

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate image loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={onClick}
      ref={ref}
      style={{ ...style, opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <div>{text}</div>
      <div
        style={{
          display: "flex",
          height: "190px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <ClipLoader loading={loading} size={50} />
        ) : (
          <img
            src={img}
            alt="dummy"
            style={{ width: "200px", height: "180px" }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
