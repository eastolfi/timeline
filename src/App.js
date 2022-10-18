import './App.css';
import { useState, useEffect } from "react"
import TimeLine from './Components/TimeLine';
import { Select } from './Components/Select';
import { Agregar } from './Components/Agregar';
import { buildTimeline } from './utils/timeline.utils';
import { parseDate } from './utils/date.utils';

const events = [
  { date: parseDate(2022, 2, 1), contenido: { title: 'Pruebas' } }
]

function App() {
  let [timeLine, setTimeLine] = useState([])
  let [newLine, setNewLine] = useState([])
  let [selectAnio, setSelectAnio] = useState(2022)
  let [selectMes, setSelectMes] = useState(2)
  let [start, setStart] = useState(1989)
  let [isOpen, setIsOpen] = useState(false)

  /* -------------------------------------Crea la linea de tiempo------------------------------------- */
  useEffect(() => {
    console.log('select effect')
    setTimeLine(buildTimeline(selectAnio, selectMes, events))
  }, [selectAnio, selectMes])

  /* useEffect(() => {
    if (newLine.length > 0 || newLine.length < 0) {
      let array = [...timeLine]
      newLine.map((evento) => {
        array.forEach(dia => {
          if (dia.date === evento.date) {
            array.contenido = {
              imagenUrl: evento.contenido.imagenUrl,
              headingText: evento.contenido.headingText,
              description: evento.contenido.description
            }
          }
        }
        }
      setTimeLine(array)
      }
  }, [newLine]) */

  /* -------------------------------------Agrega el evento al dia------------------------------------- */

  useEffect(() => {
    console.log('new line effect')
    if (newLine.length > 0) {
      let array = [...timeLine]
      if (newLine.length > 0 || newLine.length < 0) {

        newLine.forEach(evento => {
          array.forEach(dia => {

            if (evento.date === dia.date) {
              if (evento.contenido === dia.contenido) {
                console.log("es el mismo")
              } else if (dia.contenido.length > 0) {
                dia.contenido.push(evento.contenido)
              } else {
                dia.contenido = [evento.contenido]
              }
            }
          })
        })
      }
      setTimeLine(array)
    }
  }, [newLine])

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
        newLine={newLine}
        setNewLine={setNewLine}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
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
                
                setNewLine={setNewLine}
                newLine={newLine}
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