import { useState } from "react"
import { Agregar } from './Agregar';

function TimeLine({ line, onNewLineAdded }) {
   const title = line.contenido?.title || '';
   let [isOpen, setIsOpen] = useState(false)

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }

   return (<>
      <li className="container">
         <button className="open-modal" onClick={() => (mostrar(true))}><h3>{line.date} - {title}</h3></button>
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