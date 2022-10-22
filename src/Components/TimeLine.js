import { useState } from "react"
import { Agregar } from './Agregar'
import styles from './TimeLine.module.css'
import TimelineEvent from './TimelineEvent';

function TimeLine({ line, onNewLineAdded, onEventMoved }) {
   let [isOpen, setIsOpen] = useState(false)

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }

   return (<>
      <li className="container" style={{ display: 'flex', flexDirection: 'column' }}>
         <button className="open-modal" onClick={() => (mostrar(true))}>
            <h3>{line.date}</h3>
         </button>

         <ol className={styles.EventList}>
         {line.contenido.map((event, i) => <TimelineEvent key={i} event={event} onEventMoved={onEventMoved} />)}
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