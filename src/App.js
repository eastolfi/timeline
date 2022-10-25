import './App.scss';
import { useState, useEffect, useCallback } from "react"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { addEvent } from './services/timeline.service';
import { TimelineContainer } from './Components/TimelineContainer';
import { Header } from './Components/header/Header';
import { DateSelector } from './Components/date-selector/DateSelector';
import { AppProvider } from './Components/provider/AppContext';

function App() {
  let [timelineAvailable, setTimelineAvalaible] = useState(false)
  let [currentDate, setCurrentDate] = useState({year: '', month: ''})
  let [, setRefresh] = useState(false)

  /* -------------------------------------Agrega el evento al dia------------------------------------- */

  /**
   * Esta funcion se llama al añadir un nuevo evento
   * 
   * @param {Evento} line Linea con el evento que se acaba de incluir
   */
  function onNewLineAdded(line) {
    if (line) {
        addEvent(line).then(() => {
          // El evento se ha añadido desde el servicio, así que no hace falta añadirlo manualmente
          // Al forzar un re-render, se vuelven a cargar los eventos
          setRefresh(old => !old)
        })
    }
  }

  useEffect(() => {
    setTimelineAvalaible((currentDate.year && currentDate.month))
  }, [currentDate])

  const onDateSelectionChanged = useCallback((year, month) => {
    setCurrentDate({ year, month })
  }, [])
 
  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
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
      </AppProvider>
    </DndProvider>
  );
}

export default App;