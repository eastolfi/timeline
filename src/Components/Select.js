import { useState, useEffect } from "react"
export function Select({ setSelectAnio, setSelectMes, selectMes, selectAnio, start }) {
   let meses = [
      { value: "1", text: "Enero" },
      { value: "2", text: "Febrero" },
      { value: "3", text: "Marzo" },
      { value: "4", text: "Abril" },
      { value: "5", text: "Mayo" },
      { value: "6", text: "Junio" },
      { value: "7", text: "Julio" },
      { value: "8", text: "Agosto" },
      { value: "9", text: "Septiembre" },
      { value: "10", text: "Octubre" },
      { value: "11", text: "Noviembre" },
      { value: "12", text: "Diciembre" }
   ]


   let [anios, setAnios] = useState([])

   let anioActual = new Date().getFullYear()

   useEffect(() => {
      let array = []
      for (let i = anioActual; i >= start; i--) {
         array.push(i)
      }
      setAnios(array)
   }, [anioActual, start])

   return (
      <div className="options">
         <div>
            <select onChange={(e) => (setSelectMes(e.target.value))}>
               <option selected>Selecciona un mes</option>
               {meses.map((mes) => {
                  return <option value={mes.value}>{mes.text}</option>
               })}

            </select>

         </div>
         <div>
            <div>
               <select onChange={(e) => (setSelectAnio(e.target.value))}>
                  <option selected>Selecciona un año</option>
                  {anios.map((anio) => {
                     return <option value={anio}>{anio}</option>
                  })}

               </select>

            </div>
         </div>
      </div>

   )
}
