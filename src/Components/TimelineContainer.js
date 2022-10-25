import { useCallback, useEffect, useState } from 'react'
import { findEvents } from '../services/timeline.service.js';
import { isSameDate } from '../utils/date.utils.js';
import { buildTimeline } from '../utils/timeline.utils.js';
import TimeLine from './TimeLine.js';

export const TimelineContainer = ({ currentDate, newEvent }) => {
    const [cards, setCards] = useState([])
    const [timeline, setTimeline] = useState(null)

    useEffect(() => {
        setTimeline(buildTimeline(currentDate.year, currentDate.month))
    }, [ currentDate ])

    useEffect(() => {
        findEvents().then(events => {
            setCards(events)
        })
    }, [])

    const moveCard = useCallback((dragIndex, hoverIndex, dragId, newDate) => {
      setCards((prevCards) => 
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
        <TimeLine
              key={day.date}
              moveCard={moveCard}
              day={day}
              cards={cards.filter(card => isSameDate(card.date, day.date))}
            />
      )
    }, [moveCard, cards])
    return (
        <div className='t-timeline'>
            <ul className='t-timeline-l'>
                {timeline?.map(day => (
                    renderCard(day)
                ))}
            </ul>
        </div>
    )
}
