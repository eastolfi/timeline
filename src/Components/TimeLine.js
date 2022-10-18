import { useState } from "react"
import { Agregar } from './Agregar';
import styles from './TimeLine.module.css'

function TimeLine({ line, onNewLineAdded, esImpar }) {
   let [isOpen, setIsOpen] = useState(false)

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }
   
   const { contenido } = line;

   return (<>
      <li className="container" style={{ display: 'flex', flexDirection: 'column' }}>
         <button className="open-modal" onClick={() => (mostrar(true))} style={{ order: esImpar ? 1 : 2 }}>
            <h3>{line.date}</h3>
         </button>
         
         <ol className={ styles.EventList } style={{ order: esImpar ? 2 : 1 }}>
            {contenido.map(({ title }, i) => (
               <li key={i}>{ title }</li>
            ))}
         </ol>
      </li>
      
      <Agregar
        line={line}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onNewLineAdded={onNewLineAdded}
        mostrarF={() => (mostrar(false))}
      />
   </>)
}
export default TimeLine