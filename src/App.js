import './App.css';
import { useState, useEffect } from "react"
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { buildTimeline } from './utils/timeline.utils';
import { convertFromString, isSameDate, parseDate } from './utils/date.utils';

const events = [
  { date: parseDate(2022, 2, 1), contenido: { title: 'Pruebas' } }
]

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [selectAnio, setSelectAnio] = useState(2022)
  let [selectMes, setSelectMes] = useState(2)
  let [start, setStart] = useState(1989)
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
    setTimeLine((old) => old.map(item => {
      if (isSameDate(convertFromString(item.date), line.date)) {
        // cambiar a varios eventos
        item.contenido = line.contenido
      }
      return item
    }))
  }

  function mostrar(bool) {
    return isOpen ? setIsOpen(bool) : setIsOpen(bool)
  }


  return (<>
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
              />
          ))}
        </ul>
      </div>
    }
    {/* <div className='scrollmenu'>
      <ul className=''>{
        newLine.map((line) => {
          return (
            <Cards line={line} />

          )
        })}
      </ul>
    </div> */}


  </>);
}

export default App;