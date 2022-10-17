export function Cards({ line }) {


   return (
      <li key={line.date} className="container">
         <div className="modal-container">
            <h2>{line.date}</h2>
            <img src={line.contenido.imagenUrl} alt={line.contenido.headingText} />
            <h2>Titulo</h2>
            <p>{line.contenido.headingText}</p>
            <h2>Contenido</h2>
            <p>{line.contenido.description}</p>
         </div>
      </li>)
}