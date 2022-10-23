import { useState } from "react"
import { useDrop } from 'react-dnd'
import { isSameDate } from '../utils/date.utils'
import { Agregar } from './Agregar'
import styles from './TimeLine.module.css'
import TimelineEvent, { DragTypes } from './TimelineEvent';

function TimeLine({ line, onNewLineAdded, onEventMoved }) {
   let [isOpen, setIsOpen] = useState(false)

   const [, drop] = useDrop(() => ({
      accept: DragTypes.Event,
      drop: ({ date, event }) => {
         // console.log(`Dropped item ${JSON.stringify(item)} onto ${line.date}`)
         // onNewLineAdded(item)
         if (!isSameDate(date, line.date)) {
            onEventMoved(date, line.date, event)
         }
      }
   }))

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }

   return (<>
   
      <li className="container" style={{ display: 'flex', flexDirection: 'column' }}>
         <button ref={drop} className="open-modal" onClick={() => (mostrar(true))}>
            <h3>{line.date.slice(0,2) }</h3>
         </button>

         <ol className={styles.EventList}>
         {line.contenido.map((event, i) => <TimelineEvent key={i} event={event} date={line.date} />)}
            {/* {contenido.map(({ imagenUrl, title, description }, i) => (
               <li key={i}>
                  <div className="event-container">
                     <img src={imagenUrl} alt={title} />
                     <h2>{title}</h2>
                     <p>{description}</p>
                  </div>
               </li>
            ))} */}
         </ol>
      </li>

      <Agregar
         line={line}
         isOpen={isOpen}
         setIsOpen={setIsOpen}
         onNewLineAdded={onNewLineAdded}
         mostrarF={() => (mostrar(false))}
      />
   </>)
}
export default TimeLine