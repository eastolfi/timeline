import { useState } from "react"

function TimeLine({ key, line, setNewLine, newLine }) {

   let [image, setImage] = useState("")
   let [headingText, setHeadingText] = useState("")
   let [description, setDescription] = useState("")
   let [isOpen, setIsOpen] = useState(false)

   function guardar() {
      let array = [...newLine]
      if (image !== "" && headingText !== "" && description !== "") {
         array.push({
            date: line.date,
            contenido: {
               imagenUrl: image,
               headingText: headingText,
               description: description
            }
         })
      }
      setNewLine(array)
      setImage("")
      setHeadingText("")
      setDescription("")
      setIsOpen(false)
   }

   function mostrar(bool) {
      return isOpen ? setIsOpen(bool) : setIsOpen(bool)
   }


   if (isOpen) {
      return (<>
         <li key={key} className="container">
            <button className="open-modal" value={line.date} onClick={() => (mostrar(true))}><h3>{line.date}</h3></button>
         </li>

         {/*---------------------------------------------------------------------------------- agregar---------------------------------------------------------------------------------- */}

         <div key={key} className="modal is-open" id="modal1" onClick={() => (mostrar(false))}>
            <div className="modal-dialog" onClick={(e)=>e.stopPropagation()}>
               <div className="formulario modal-container">
                  <button className="close-modal" aria-label="close modal" onClick={() => (mostrar(false))} data-close>✕</button>
                  <h2>{line.date}</h2>
                  <label>Imagen</label>
                  <input
                     required
                     value={image}
                     onChange={(e) => (setImage((e.target.value)))} />
                  <label>headingText</label>
                  <input
                     required
                     value={headingText}
                     onChange={(e) => (setHeadingText((e.target.value)))} />
                  <label>description</label>
                  <input
                     required
                     value={description}
                     onChange={(e) => (setDescription((e.target.value)))} />
                  <button onClick={() => guardar()}>Guardar</button>
               </div>
            </div>
         </div>
      </>
      )
   } else {
      return (
         <li key={key} className="container">
            <button className="open-modal" value={line.date} onClick={() => (mostrar(true))}><h3>{line.date}</h3></button>
         </li>
      )
   }
}
export default TimeLine