import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { isSameDate } from '../utils/date.utils'

export const DragTypes = {
   Event: 'event'
}

export default function TimelineEvent({ event, onEventMoved }) {
   console.log(event)
   // console.log('Init')
   const ref = useRef(null)

   const [, drop] = useDrop(() => ({
      accept: DragTypes.Event,
      drop: ({ date, id, ref }) => {
         // console.log(`Dropped item ${id} onto ${line.date}`)
         
         if (!isSameDate(date, event.date)) {
            onEventMoved(event.date, id)
         } else {
            console.log('Something is off')
            console.log(id)
            console.log(event)
         }
      }
   }))

   const [, drag] = useDrag(() => ({
      type: DragTypes.Event,
      item: () => {
         console.log('dragging: ' + event.id)
         // console.log(event)
        return { date: event.date, id: event.id, ref }
      },
      // collect: (monitor) => ({
      //     opacity: monitor.isDragging() ? 0.5 : 1
      // }),
      // end: (item, monitor) => onEventDragged(item)
   }))
   // console.log(dragRef)

   const { title, imagenUrl, description } = event.contenido

   // drag(ref)
   // const updateRef = (r) => {
      // drag(r);
      // console.log(r);
   // }
   drag(drop(ref))

   return (
      <li ref={ref}>
         <div className="event-container">
            <img src={imagenUrl} alt={title} />
            <h2>{title} ({ event.id })</h2>
            <p>{description}</p>
         </div>
      </li>
   )
}