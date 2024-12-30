import React, { useEffect, useState } from "react";
import bgimag from "../images/bg-card.png"; // Back of the card
import akaimg from "../images/Aka.png";
import badshahimg from "../images/Badshah.png";
import queenimg from "../images/Queen.png";
import bimg from "../images/B.png";
import { FormattedMessage } from "react-intl";

// Duplicate images and shuffle them
const initialCards = [
  akaimg,
  badshahimg,
  queenimg,
  bimg,
  akaimg,
  badshahimg,
  queenimg,
  bimg,
  bgimag,
].sort(() => Math.random() - 0.5);

const CardMemoryGame = () => {
  const [cards, setCards] = useState(
    initialCards.map((img, index) => ({ id: index, img, isFlipped: false }))
  );
  const [selectedCards, setSelectedCards] = useState([]); // Stores indices of selected cards
  const [message, setMessage] = useState(" ");

  const handleCardClick = (index) => {
    // Ignore click if card is already flipped or two cards are selected
    if (cards[index].isFlipped || selectedCards.length === 2) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelectedCards = [...selectedCards, index];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      // Check for match
      const [first, second] = newSelectedCards;
      if (newCards[first].img === newCards[second].img) {
        setMessage("win");
        setSelectedCards([]); // Reset selected cards
      } else {
        setMessage("notMatch");
        setTimeout(() => {
          // Flip the cards back after 2 seconds
          const resetCards = [...newCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setCards(resetCards);
          setSelectedCards([]); // Reset selected cards
        }, 2000);
      }
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Card Memory Game</h1>
      <FormattedMessage id={message.toString()} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridGap: "10px",
          justifyContent: "center",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(index)}
            style={{
              width: "100px",
              height: "150px",
              cursor: "pointer",
              border: "1px solid #ccc",
            }}
          >
            <img
              src={card.isFlipped ? card.img : bgimag}
              alt="Card"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardMemoryGame;
