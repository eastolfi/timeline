// import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { addEvent, buildEvent, findEvents } from '../services/timeline.service.js';
import { isSameDate, parseDate, parseDateAsString } from '../utils/date.utils.js';
import { addEventToTimeline, buildTimeline } from '../utils/timeline.utils.js';
import { DragCard } from './DragCard.js'
import TimeLine from './TimeLine.js';
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
        date: generateDate(),
        contenido: {
            title: generateText(10),
            imagenUrl: 'logo192.png',
            description: generateText(30),
        }
    }
}

const initialCards = Array(10).fill('').map(_ => generateCard())

export const TimelineContainer = ({ currentDate, newEvent }) => {
    const [cards, setCards] = useState([])
    const [timeline, setTimeline] = useState(null)

    useEffect(() => {
        setTimeline(buildTimeline(currentDate.year, currentDate.month))
    }, [ currentDate ])

    useEffect(() => {
        findEvents().then(events => {
        // console.log(events)
            setCards(events)
        })
    }, [])

    // useEffect(() => {
    //     console.log(cards)
    //     // setCards(old => [...old, buildEvent({ date: parseDate(2022, 2, 3), contenido: { title: 'AAA', imagenUrl: 'logo192.png' } })])
    //     // if (newEvent) {
    //     //     addEvent(newEvent).then(newEvent => {
    //     //         console.log(cards)
    //     //         // console.log(events)
    //     //         // setCards(oldEvents => {
    //     //         //     console.log(oldEvents)
    //     //         //     return [...oldEvents]
    //     //         // })
    //     //     })
    //     // }
    // }, [newEvent])
    
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
    const renderCard = useCallback((day) => {
      return (
        // <DragCard
        //   key={card.id}
        //   index={index}
        //   id={card.id}
        //   text={card.title}
        //   date={card.date}
        //   moveCard={moveCard}
        // />
        <TimeLine
            // line={line}
            // key={line.date}
            // onNewLineAdded={onNewLineAdded}
            // onEventMoved={asd}
              key={day.date}
            //   index={index}
            //   id={card.id}
            //   text={card.title}
            //   date={card.date}
              moveCard={moveCard}
              day={day}
            //   renderCard={renderCard}
              cards={cards.filter(card => isSameDate(card.date, day.date))}
            />
      )
    }, [moveCard, cards])
    return (
        <div className='t-timeline'>
            <ul className='t-timeline-l'>
                {timeline?.map(day => (
                    renderCard(day)
                    // <div style={{display: 'inline-block'}}>
                    //     <h3>{day.date}</h3>
                    //     <div style={style}>{cards.filter(card => isSameDate(card.date, day.date)).map((card, i) => renderCard(card, i, day))}</div>
                    // </div>
                ))}
            </ul>

            {/* <ul className=''>{
            timeLine.map((line) => (
                <TimeLine
                line={line}
                key={line.date}
                onNewLineAdded={onNewLineAdded}
                onEventMoved={asd}
                />
            ))}
            </ul> */}
        </div>
    )
}
