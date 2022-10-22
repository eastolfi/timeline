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

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [eventos, setEventos] = useState([])
  let [selectAnio, setSelectAnio] = useState("2022")
  let [selectMes, setSelectMes] = useState("2")
  let [start, setStart] = useState("")
  let [isOpen, setIsOpen] = useState(false)

  /* -------------------------------------Crea la linea de tiempo------------------------------------- */
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
    findEvents().then(setEventos)
  }, [])

  useEffect(() => {
    setTimeLine(old => {
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

  const asd = useCallback(async (to, eventId) => {
    const events = await moveEvent(to, eventId)
    //setTimeLine(buildTimeline(selectAnio, selectMes, events))
    setTimeLine(old => {
      update(old, {
        //
      })
    })
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


  return (<DndProvider backend={HTML5Backend}>
    <header >
      <h1 className='titulo'>LA LINEA DE TU VIDAAAA</h1>
      <input placeholder='Año de nacimiento' onChange={(e) => (setStart(e.target.value))} />
      <Select
        setSelectMes={setSelectMes}
        setSelectAnio={setSelectAnio}
        selectMes={selectMes}
        selectAnio={selectAnio}
        start={start}
      />
      <button className="open-modal" onClick={() => (mostrar(true))}><h3>Agregar evento</h3></button>
      <Agregar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onNewLineAdded={onNewLineAdded}
        mostrarF={() => (mostrar(false))}
      />
    </header>
    {selectAnio === "" || selectMes === "" ? <h3>Selecciona mes y año</h3> :
      <div className='scrollmenu'>
        <ul className=''>{
          timeLine.map((line) => (
            <TimeLine
              line={line}
              key={line.date}
              onNewLineAdded={onNewLineAdded}
              onEventMoved={asd}
            />
          ))}
        </ul>
      </div>
    }
  </DndProvider>);
}

export default App;