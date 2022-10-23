import './App.scss';
import { useState, useEffect } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { addEventToTimeline, buildTimeline, moveEvent } from './utils/timeline.utils';
import { parseDate } from './utils/date.utils';

const events = [
  { date: parseDate(2022, 2, 1), contenido: { title: 'Prueba 1',imagenUrl:"https://p-hold.com/624/350", description:"Lorem ipsum dolor sit, amet ." } },
  { date: parseDate(2022, 2, 1), contenido: { title: 'Prueba 2',imagenUrl:"https://p-hold.com/624/350", description:"Lorem ipsum dolor sit, amet ." } },
  { date: parseDate(2022, 2, 2), contenido: { title: 'Prueba 3',imagenUrl:"https://p-hold.com/624/350", description:"Lorem ipsum dolor sit, amet ." } }
]

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [selectAnio, setSelectAnio] = useState("2022")
  let [selectMes, setSelectMes] = useState("10")
  let [start, setStart] = useState("1987")
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
    <header className="t-h t-c">
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

      {selectAnio === "" || selectMes === "" ? <h2 className='t-sub-t'>Selecciona mes y año</h2> :
        <div className='t-timeline'>
          <ul className='t-timeline-l'>{
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
    </div>
  </DndProvider>);
}

export default App;