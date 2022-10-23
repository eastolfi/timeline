import update from 'immutability-helper'
import { useCallback, useState } from 'react'
import { isSameDate, parseDateAsString } from '../utils/date.utils.js';
import { buildTimeline } from '../utils/timeline.utils.js';
import { DragCard } from './DragCard.js'
const style = {
  width: 400,
}

function generateText(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function generateId() {
    return Math.random().toString(36).substring(2, 9);
}
function generateDate() {
    return parseDateAsString(2022, 2, Math.floor(Math.random() * 10) + 1)
}
function generateCard() {
    return {
        id: generateId(),
        title: generateText(10),
        date: generateDate()
    }
}

const initialCards = Array(10).fill('').map(_ => generateCard())

export const DragContainer = () => {
    const [cards, setCards] = useState(initialCards)
    const [timeline, setTimeline] = useState(buildTimeline(2022, 2))
    
    const moveCard = useCallback((dragIndex, hoverIndex, dragId, newDate) => {
      setCards((prevCards) => 
        // update(prevCards, {
        //   $splice: [
        //     [dragIndex, 1],
        //     [hoverIndex, 0, prevCards[dragIndex]],
        //   ],
        // }),
        prevCards.map(card => {
            if (card.id === dragId) {
                card.date = newDate
            }

            return card
        })
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <DragCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.title}
          date={card.date}
          moveCard={moveCard}
        />
      )
    }, [])
    return (
      <>
        {timeline?.map(day => (
            <div style={{display: 'inline-block'}}>
                <h3>{day.date}</h3>
                <div style={style}>{cards.filter(card => isSameDate(card.date, day.date)).map((card, i) => renderCard(card, i))}</div>
            </div>
        ))}
      </>
    )
}
