import './App.css';
import { useState, useEffect, useCallback } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { addEventToTimeline, buildTimeline } from './utils/timeline.utils';
import { addEvent, findEvents, moveEvent } from './services/timeline.service';
import { useQuery } from '@tanstack/react-query';
import { getDate, isSameDate } from './utils/date.utils';
import { DragContainer } from './Components/DragContainer';
import { TimelineContainer } from './Components/TimelineContainer';

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [eventos, setEventos] = useState([])
  let [selectAnio, setSelectAnio] = useState("2022")
  let [selectMes, setSelectMes] = useState("2")
  let [start, setStart] = useState("")
  let [isOpen, setIsOpen] = useState(false)

  /* -------------------------------------Crea la linea de tiempo------------------------------------- */
  useEffect(() => {
    findEvents().then(events => {
      // console.log(events)
      setEventos(events)
    })
  }, [])

  useEffect(() => {
    // findEvents().then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))
    setTimeLine(buildTimeline(selectAnio, selectMes))
  }, [selectAnio, selectMes])

  // const dsa = useQuery(
  //   ['events'],
  //   findEvents()
  // )
  //   console.log(dsa)

  useEffect(() => {
    setTimeLine(old => {
      // debugger
      eventos.forEach(event => old = addEventToTimeline(event, old))
      return old
    })
  }, [eventos])

  /* -------------------------------------Agrega el evento al dia------------------------------------- */

  /**
   * Esta funcion se llama al añadir un nuevo evento
   * 
   * @param {Evento} line Linea con el evento que se acaba de incluir
   */
  function onNewLineAdded(line) {
    addEvent(line).then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))

    // setTimeLine(buildTimeline(selectAnio, selectMes, events))
    // setTimeLine(old => addEventToTimeline(line, old))
  }

  const asd = useCallback((to, eventId, oldIndex, newIndex) => {
    console.log(eventId, oldIndex, newIndex)
    
    // const nuevosEventos = await moveEvent(to, eventId)

    // console.log(nuevosEventos)

    setEventos(old => (
      old.map(e => {
        if (e.id === eventId && !isSameDate(e.date, to)) {
            // console.log(`Moving event ${eventId} from ${e.date} to ${to}`)

            e.date = getDate(to)
        }
        return e
    })
    ))
    // setEventos(async previous => (
    //   // update(previous, {
    //   //   $splice: [
    //   //     [oldIndex, 1],
    //   //     [newIndex, 0, previous[oldIndex]],
    //   //   ],
    //   // })
    //   // previous.map(async p => {
    //   //   const events = await moveEvent(to, eventId)
    //   //   return events
    //   // })
    //   await moveEvent(to, eventId)
    // ))
    // const events = await moveEvent(to, eventId)
    // //setTimeLine(buildTimeline(selectAnio, selectMes, events))
    // setTimeLine(old => {
    //   update(old, {
    //     //
    //   })
    // })
  })
  function onEventMoved(to, eventId) {
    // const newTimeline = moveEvent(from, to, event, timeLine)

    moveEvent(to, eventId)
      .then(events => setTimeLine(buildTimeline(selectAnio, selectMes, events)))
    // setTimeLine(newTimeline)
  }

  function mostrar(bool) {
    return isOpen ? setIsOpen(bool) : setIsOpen(bool)
  }

  const timelineAvailable = (selectAnio && selectMes)


  return (<DndProvider backend={HTML5Backend}>
    <header className="t-h t-c">
      {/* <DragContainer /> */}

      <h1 className="t-tit-t">Timeline</h1>
      <p className='t-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
      
      <button className="t-btn t-btn-i t-btn-i--l open-modal" onClick={() => (mostrar(true))}>
        <span className="t-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24.003" viewBox="0 0 24 24.003">
            <path data-name="Unión 1" d="M10.5,24V13.5H0v-3H10.5V0h3V10.5H24v3H13.5V24Z"/>
          </svg>
        </span>
        Añadir evento
      </button>

      <Agregar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onNewLineAdded={onNewLineAdded}
        mostrarF={() => (mostrar(false))}
      />
    </header>

    <div className='t-c'>
      <form className="t-form t-form--w">
        <div className='t-form-c'>
          <input className="t-form-i" type="text" placeholder='Año de nacimiento' onChange={(e) => (setStart(e.target.value))} />
        </div>
        <Select
          setSelectMes={setSelectMes}
          setSelectAnio={setSelectAnio}
          selectMes={selectMes}
          selectAnio={selectAnio}
          start={start}
        />
      </form>
      
      { timelineAvailable ? <TimelineContainer /> : <h3>Selecciona mes y año</h3> }
    </div>
  </DndProvider>);
}

export default App;