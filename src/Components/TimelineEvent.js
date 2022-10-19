import { useDrag } from 'react-dnd'

export const DragTypes = {
    Event: 'event'
}

export default function TimelineEvent({ event, date }) {
    const [, dragRef] = useDrag(() => ({
        type: DragTypes.Event,
        item: { date, event },
        // collect: (monitor) => ({
        //     opacity: monitor.isDragging() ? 0.5 : 1
        // }),
        // end: (item, monitor) => onEventDragged(item)
    }))

    return (
        <li ref={dragRef}>{ event.title }</li>
    )
}