import { useState } from "react"
import { convertFromString } from '../utils/date.utils'

export function Agregar({ line, setIsOpen, isOpen, mostrarF, onNewLineAdded }) {
   const isNew = !line?.date

   let [fecha, setFecha] = useState(line?.date || "03/02/2022")
   let [image, setImage] = useState("")
   let [headingText, setHeadingText] = useState("Pruebas")
   let [description, setDescription] = useState("")

   function guardar() {
      onNewLineAdded({
         date: convertFromString(fecha),
         contenido: {
            imagenUrl: image,
            title: headingText,
            description: description
         }
      })
      
      setFecha("")
      setImage("")
      setHeadingText("")
      setDescription("")
      setIsOpen(false)
   }

   if (isOpen) {
      return (
         <div className="modal is-open" id="modal1" onClick={mostrarF}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
               <div className="formulario modal-container">
                  <button className="close-modal" aria-label="close modal" onClick={mostrarF} data-close>✕</button>
                  
                  {/* Fecha */}
                  {!isNew && <h2>{line.date}</h2>}

                  {isNew && (<>
                     <label>Fecha</label>
                     <input
                        placeholder="dd/mm/aaaa"
                        value={fecha}
                        onChange={(e) => (setFecha((e.target.value)))}
                        required
                     />
                  </>)}

                  {/* Imagen */}
                  <label>Imagen</label>
                  <input
                     value={image}
                     onChange={(e) => (setImage((e.target.value)))}
                     required />
                  
                  {/* Titulo */}
                  <label>headingText</label>
                  <input
                     value={headingText}
                     onChange={(e) => (setHeadingText((e.target.value)))}
                     required />
                  
                  {/* Descripcion */}
                  <label>description</label>
                  <input
                     value={description}
                     onChange={(e) => (setDescription((e.target.value)))}
                     required />
                  <button onClick={() => guardar()}>Guardar</button>
               </div>
            </div>
         </div>
      )
   }
}
