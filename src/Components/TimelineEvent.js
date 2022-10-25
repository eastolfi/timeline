import { useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { isSameDate } from '../utils/date.utils'

export const DragTypes = {
   Event: 'event'
}

export default function TimelineEvent({ event, onEventMoved, /* */ index, id, text, date, moveCard }) {
   const ref = useRef(null);
   const [{ handlerId }, drop] = useDrop({
      accept: DragTypes.Event,
      collect(monitor) {
         return {
         handlerId: monitor.getHandlerId()
         };
      },
      hover(item, monitor) {
         if (!ref.current) {
         return;
         }
         const dragIndex = item.index;
         const dragDate = item.date;
         const dragId = item.id;
         const hoverIndex = index;
         // Don't replace items with themselves
         if (dragIndex === hoverIndex && isSameDate(date, dragDate)) {
         return;
         }
         // Determine rectangle on screen
         const hoverBoundingRect = ref.current?.getBoundingClientRect();
         // Get vertical middle
         const hoverMiddleY =
         (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
         // Determine mouse position
         const clientOffset = monitor.getClientOffset();
         // Get pixels to the top
         const hoverClientY = clientOffset.y - hoverBoundingRect.top;
         // Only perform the move when the mouse has crossed half of the items height
         // When dragging downwards, only move when the cursor is below 50%
         // When dragging upwards, only move when the cursor is above 50%
         // Dragging downwards
         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
         return;
         }
         // Dragging upwards
         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
         return;
         }
         // Time to actually perform the action
         moveCard(dragIndex, hoverIndex, dragId, date);
         // Note: we're mutating the monitor item here!
         // Generally it's better to avoid mutations,
         // but it's good here for the sake of performance
         // to avoid expensive index searches.
         item.index = hoverIndex;
      }
   });
   const [{ isDragging, handler }, drag] = useDrag({
      type: DragTypes.Event,
      item: () => {
         console.log(handler);
         return { id, index, date };
      },
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
         handler: monitor.getHandlerId()
      })
   });

   

   // useEffect(() => {
   //    console.log('Creating ' + event.id)
   // }, [])
   // // console.log(event)
   // // console.log('Init')
   // const ref = useRef(null)

   // const [{ handlerId }, drop] = useDrop(() => ({
   //    accept: DragTypes.Event,
   //    drop: ({ date, id, index: oldIndex }) => {
   //       // console.log(`Dropped item ${id} onto ${line.date}`)
         
   //       if (!isSameDate(date, event.date)) {
   //          onEventMoved(event.date, id, oldIndex, index)
   //       } else {
   //          // console.log('Something is off')
   //          // console.log(id)
   //          // console.log(event)
   //       }
   //    },
   //    collect(monitor) {
   //       return {
   //          handlerId: monitor.getHandlerId(),
   //       }
   //    },
   // }))

   // const [{handlerId2}, drag] = useDrag(() => ({
   //    type: DragTypes.Event,
   //    item: () => {
   //       console.log('dragging: ' + event.id)
   //       console.log(handlerId2)
   //       // console.log(event)
   //      return { date: event.date, id: event.id, index }
   //    },
   //    collect: (monitor) => ({
   //       handlerId2: monitor.getHandlerId(),
   //    //     opacity: monitor.isDragging() ? 0.5 : 1
   //    }),
   //    // end: (item, monitor) => onEventDragged(item)
   // }))
   // // console.log(handlerId2)

   const { title, imagenUrl, description } = event.contenido

   drag(drop(ref))

   const opacity = isDragging ? 0 : 1;
   return (
      <li ref={ref} style={{ opacity }} data-handler-id={handlerId}>
         <div className="event-container">
            <img style={{ width: '100px' }} src={imagenUrl} alt={title} />
            <h2>{title} ({ event.id })</h2>
            <p>{description}</p>
         </div>
      </li>

      // <div ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      //    {text}
      // </div>
   )
}