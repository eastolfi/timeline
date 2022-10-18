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
            <select value={selectMes} onChange={(e) => (setSelectMes(e.target.value))}>
               <option value=''>Selecciona un mes</option>
               {meses.map((mes) => {
                  return <option key={mes.value} value={mes.value}>{mes.text}</option>
               })}

            </select>

         </div>
         <div>
            <div>
               <select value={selectAnio} onChange={(e) => (setSelectAnio(e.target.value))}>
                  <option value=''>Selecciona un año</option>
                  {anios.map((anio) => {
                     return <option key={anio} value={anio}>{anio}</option>
                  })}

               </select>

            </div>
         </div>
      </div>

   )
}
