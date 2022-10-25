import { createContext, useContext, useState } from 'react';
import { Agregar } from '../Agregar';

function useAddEventModal(onNewLineAdded) {
    let [isOpen, setIsOpen] = useState(false)
    let [event, setEvent] = useState(null)

    return {
        isOpen,
        event,
        onNewLineAdded,
        showModal: (eventToShow) => {
            setIsOpen(true)
            setEvent(eventToShow)
        },
        hideModal: () => setIsOpen(false),
    }
}

export const AppContext = createContext({
    useAddEventModal
})

export function AppProvider({ children }) {
    let [isOpen, setIsOpen] = useState(false)
    let [event, setEvent] = useState(null)

    // return {
    //     isOpen,
    //     event,
    //     // onNewLineAdded,
    //     showModal: (eventToShow) => {
    //         setIsOpen(true)
    //         setEvent(eventToShow)
    //     },
    //     hideModal: () => setIsOpen(false),
    // }
    const contextValue = {
        // useAddEventModal
    }

    return (
        <AppContext.Provider value={contextValue}>
            <Agregar
                // line={line}
                // isOpen={isOpen}
                // setIsOpen={setIsOpen}
                // onNewLineAdded={onNewLineAdded}
                // mostrarF={() => (mostrar(false))}
            />

            { children }
        </AppContext.Provider>
    )
}