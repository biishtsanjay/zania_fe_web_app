import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import update from "immutability-helper";
import ImageOverlay from "./ImageOverlay";
import { storageKey, storageValue } from "../msw/handlers";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cards");
      const jsonData = await response.json();
      setCards(jsonData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      localStorage.setItem("cards", JSON.stringify(cards));
      console.log("Data saved to localStorage");
    }, 5000); // Save every 5 seconds

    return () => clearInterval(timer);
  }, [cards]);

  const moveCard = (dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="Dashboard">
      <DndProvider backend={HTML5Backend}>
        <div className="card-grid">
          {cards?.map((card, index) => (
            <Card
              key={card.position}
              index={index}
              id={card.position}
              text={card.title}
              moveCard={moveCard}
              img={card.picture}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>
      </DndProvider>
      {selectedCard && (
        <ImageOverlay
          item={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
