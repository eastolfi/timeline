import './App.scss';
import { useState, useEffect, useCallback } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// import update from 'immutability-helper'
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { addEventToTimeline, buildTimeline } from './utils/timeline.utils';
import { addEvent, findEvents, moveEvent } from './services/timeline.service';
// import { useQuery } from '@tanstack/react-query';
import { getDate, isSameDate } from './utils/date.utils';
import { DragContainer } from './Components/DragContainer';
import { TimelineContainer } from './Components/TimelineContainer';
import { Header } from './Components/header/Header';
import { DateSelector } from './Components/date-selector/DateSelector';

function App() {
  // let [timeLine, setTimeLine] = useState([])
  // let [eventos, setEventos] = useState([])
  let [timelineAvailable, setTimelineAvalaible] = useState(false)
  let [currentDate, setCurrentDate] = useState({year: '', month: ''})
  let [, setRefresh] = useState(false)

  // let [selectAnio, setSelectAnio] = useState("2022")
  // let [selectMes, setSelectMes] = useState("2")
  // let [start, setStart] = useState("")
  // let [isOpen, setIsOpen] = useState(false)

  /* -------------------------------------Crea la linea de tiempo------------------------------------- */

  // useEffect(() => {
  //   // findEvents().then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))
  //   setTimeLine(buildTimeline(selectAnio, selectMes))
  // }, [selectAnio, selectMes])

  // const dsa = useQuery(
  //   ['events'],
  //   findEvents()
  // )
  //   console.log(dsa)

  // useEffect(() => {
  //   setTimeLine(old => {
  //     // debugger
  //     eventos.forEach(event => old = addEventToTimeline(event, old))
  //     return old
  //   })
  // }, [eventos])

  /* -------------------------------------Agrega el evento al dia------------------------------------- */

  /**
   * Esta funcion se llama al añadir un nuevo evento
   * 
   * @param {Evento} line Linea con el evento que se acaba de incluir
   */
  function onNewLineAdded(line) {
    // addEvent(line).then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))

    // setTimeLine(buildTimeline(selectAnio, selectMes, events))
    // setTimeLine(old => addEventToTimeline(line, old))
    if (line) {
        addEvent(line).then(() => {
          setRefresh(old => !old)
            // console.log(cards)
            // console.log(events)
            // setCards(oldEvents => {
            //     console.log(oldEvents)
            //     return [...oldEvents]
            // })
        })
    }
    // setNewEvent(line)
  }

  useEffect(() => {
    setTimelineAvalaible((currentDate.year && currentDate.month))
  }, [currentDate])

  const onDateSelectionChanged = useCallback((year, month) => {
    // setTimeLine(buildTimeline(year, month))
    setCurrentDate({ year, month })
  }, [])
 
  // const asd = useCallback((to, eventId, oldIndex, newIndex) => {
  //   console.log(eventId, oldIndex, newIndex)
    
  //   // const nuevosEventos = await moveEvent(to, eventId)

  //   // console.log(nuevosEventos)

  //   setEventos(old => (
  //     old.map(e => {
  //       if (e.id === eventId && !isSameDate(e.date, to)) {
  //           // console.log(`Moving event ${eventId} from ${e.date} to ${to}`)

  //           e.date = getDate(to)
  //       }
  //       return e
  //   })
  //   ))
  //   // setEventos(async previous => (
  //   //   // update(previous, {
  //   //   //   $splice: [
  //   //   //     [oldIndex, 1],
  //   //   //     [newIndex, 0, previous[oldIndex]],
  //   //   //   ],
  //   //   // })
  //   //   // previous.map(async p => {
  //   //   //   const events = await moveEvent(to, eventId)
  //   //   //   return events
  //   //   // })
  //   //   await moveEvent(to, eventId)
  //   // ))
  //   // const events = await moveEvent(to, eventId)
  //   // //setTimeLine(buildTimeline(selectAnio, selectMes, events))
  //   // setTimeLine(old => {
  //   //   update(old, {
  //   //     //
  //   //   })
  //   // })
  // })
  // function onEventMoved(to, eventId) {
  //   // const newTimeline = moveEvent(from, to, event, timeLine)

  //   moveEvent(to, eventId)
  //     .then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))
  //   // setTimeLine(newTimeline)
  // }

  // function mostrar(bool) {
  //   return isOpen ? setIsOpen(bool) : setIsOpen(bool)
  // }

  


  return (
    <DndProvider backend={HTML5Backend}>
      <Header
        onNewLineAdded={onNewLineAdded} />
      
      <div className='t-c'>
        <DateSelector
          onDateSelectionChanged={onDateSelectionChanged} />

        { timelineAvailable ? 
          <TimelineContainer
          currentDate={currentDate} /> :
          
          <h3>Selecciona mes y año</h3> }
      </div>

    </DndProvider>
  );
}

export default App;