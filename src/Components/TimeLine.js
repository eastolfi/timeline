import { useCallback, useState } from "react"
import { Agregar } from './Agregar'
import styles from './TimeLine.module.css'
import TimelineEvent from './TimelineEvent';

const style = {
   width: 400,
}

function TimeLine({ /*line,*/ onNewLineAdded, onEventMoved, id, text, index, date, moveCard, day: line, cards }) {
   /**/
   
   /**/
   let [isOpen, setIsOpen] = useState(false)

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }

   const renderCard = ((card, index, day) => {
      return (
        // <DragCard
        //   key={card.id}
        //   index={index}
        //   id={card.id}
        //   text={card.title}
        //   date={card.date}
        //   moveCard={moveCard}
        // />
        <TimelineEvent
            // line={line}
            // key={line.date}
            // onNewLineAdded={onNewLineAdded}
            // onEventMoved={asd}
              key={card.id}
              index={index}
              id={card.id}
              text={card.title}
              date={card.date}
              moveCard={moveCard}
              day={day}
              event={card}
            />
      )
    }/*, [moveCard]*/)

   return (<>
      <li className="t-timeline-i">
         <button className="t-timeline-b open-modal" onClick={() => (mostrar(true))}>
            <h3>{line.date.slice(0,2)}</h3>
         </button>

         {/* <ol className={styles.EventList}>
            {line.contenido.map((event, i) => <TimelineEvent key={i} index={i} event={event} onEventMoved={onEventMoved} />)}
         </ol> */}
         <ul style={style}>{cards.map((card, i) => renderCard(card, i))}</ul>
      </li>

      {/* <Agregar
         line={line}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         onNewLineAdded={onNewLineAdded}
         mostrarF={() => (mostrar(false))}
      /> */}
   </>)
}

export default TimeLine