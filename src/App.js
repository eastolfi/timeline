import './App.css';
import { useState, useEffect } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { addEventToTimeline, buildTimeline, moveEvent } from './utils/timeline.utils';
import { parseDate } from './utils/date.utils';

const events = [
  { date: parseDate(2022, 2, 1), contenido: { title: 'Prueba 1',imagenUrl:"https://i.pinimg.com/736x/ad/58/d7/ad58d7a7475897fd3fcade3b43572bd5.jpg", description:"Lorem ipsum dolor sit, amet ." } },
  { date: parseDate(2022, 2, 1), contenido: { title: 'Prueba 2',imagenUrl:"https://i.pinimg.com/474x/f1/0c/3e/f10c3ea27ba159af9f96b94ebec23006.jpg", description:"Lorem ipsum dolor sit, amet ." } },
  { date: parseDate(2022, 2, 2), contenido: { title: 'Prueba 3',imagenUrl:"https://huescalamagiaenfotos.es/thumbnail.aspx?p_registro=1453&p=1&t=14", description:"Lorem ipsum dolor sit, amet ." } }
]

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [selectAnio, setSelectAnio] = useState("2022")
  let [selectMes, setSelectMes] = useState("02")
  let [start, setStart] = useState("1989")
  let [isOpen, setIsOpen] = useState(false)

  /* -------------------------------------Crea la linea de tiempo------------------------------------- */
  useEffect(() => {
    console.log('select effect')
    setTimeLine(buildTimeline(selectAnio, selectMes, events))
  }, [selectAnio, selectMes])

  /* -------------------------------------Agrega el evento al dia------------------------------------- */

  /**
   * Esta funcion se llama al añadir un nuevo evento
   * 
   * @param {Evento} line Linea con el evento que se acaba de incluir
   */
  function onNewLineAdded(line) {
    events.push(line)

    // setTimeLine(buildTimeline(selectAnio, selectMes, events))
    setTimeLine(old => addEventToTimeline(line, old))
  }

  function onEventMoved(from, to, event) {
    setTimeLine(old => moveEvent(from, to, event, old))
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
          timeLine.map((line, index) => (
            <TimeLine
              line={line}
              key={line.date}
              onNewLineAdded={onNewLineAdded}
              onEventMoved={onEventMoved}
            />
          ))}
        </ul>
      </div>
    }
  </DndProvider>);
}

export default App;