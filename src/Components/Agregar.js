import { useState } from "react"

export function Agregar({ setNewLine, newLine, setIsOpen, isOpen, mostrarF }) {

   let [fecha, setFecha] = useState("")
   let [image, setImage] = useState("")
   let [headingText, setHeadingText] = useState("")
   let [description, setDescription] = useState("")

   function guardar() {
      let array = [...newLine]
      if (fecha !== "" && image !== "" && headingText !== "" && description !== "") {
         array.push({
            date: fecha,
            contenido: {
               imagenUrl: image,
               headingText: headingText,
               description: description
            }
         })
      }
      setNewLine(array)
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
                  <label>Fecha</label>
                  <input
                     placeholder="dd/mm/aaaa"
                     value={fecha}
                     onChange={(e) => (setFecha((e.target.value)))}
                     required
                  />
                  <label>Imagen</label>
                  <input
                     value={image}
                     onChange={(e) => (setImage((e.target.value)))}
                     required />
                  <label>headingText</label>
                  <input
                     value={headingText}
                     onChange={(e) => (setHeadingText((e.target.value)))}
                     required />
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

