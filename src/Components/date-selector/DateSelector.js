import { useEffect, useState } from 'react'
import { Select } from '../Select'

export function DateSelector({ onDateSelectionChanged }) {
    let [selectAnio, setSelectAnio] = useState("2022")
    let [selectMes, setSelectMes] = useState("2")
    let [start, setStart] = useState("")

    useEffect(() => {
        onDateSelectionChanged(selectAnio, selectMes)
    }, [selectAnio, selectMes, onDateSelectionChanged])

    return (
        <form className="t-form t-form--w">
            <div className='t-form-c'>
                <input className="t-form-i" type="text" placeholder='Año de nacimiento' onChange={(e) => (setStart(e.target.value))} />
            </div>

            <Select
                setSelectMes={setSelectMes}
                setSelectAnio={setSelectAnio}
                selectMes={selectMes}
                selectAnio={selectAnio}
                start={start} />
        </form>
    )
}