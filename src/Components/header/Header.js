import { useContext } from 'react'
import { AppContext } from '../provider/AppContext'

export function Header({ onNewLineAdded }) {
    const { useAddEventModal } = useContext(AppContext)
    const { showModal } = useAddEventModal(onNewLineAdded)

    return (
        <header className="t-h t-c">
            <h1 className="t-tit-t">Timeline</h1>
            <p className='t-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
            
            <button className="t-btn t-btn-i t-btn-i--l open-modal" onClick={() => showModal()}>
                <span className="t-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24.003" viewBox="0 0 24 24.003">
                        <path data-name="Unión 1" d="M10.5,24V13.5H0v-3H10.5V0h3V10.5H24v3H13.5V24Z"/>
                    </svg>
                </span>
                Añadir evento
            </button>
        </header>
    )
}