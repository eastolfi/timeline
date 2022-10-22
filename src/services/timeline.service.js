/**
 * Clase para gestionar las operaciones con los eventos
 * 
 * En algún momento se debería reemplazar por llamadas a una API
 */

import { convertFromDateToString, convertFromString, getDate, isSameDate, parseDate } from '../utils/date.utils'

const events = []

export function findEvents() {
    // clear the events
    events.splice(0, events.length)

    events.push(...[
        buildEvent({ date: parseDate(2022, 2, 1), contenido: { title: 'Pruebas', imagenUrl: 'logo192.png' } }),
        buildEvent({ date: parseDate(2022, 2, 1), contenido: { title: 'Más pruebas', imagenUrl: 'logo192.png' } }),
        buildEvent({ date: parseDate(2022, 2, 2), contenido: { title: 'Pruebas 2', imagenUrl: 'logo192.png' } })
    ])

    return Promise.resolve(events)
}

export function addEvent(event) {
    const newEvent = buildEvent(event)
    console.log(`Event #${newEvent.id} created --> ${newEvent.contenido.title}`)

    events.push(newEvent)

    findDuplicatedIds()

    return Promise.resolve(events)
}

export function moveEvent(to, eventId) {
    // const from = event.date

    

    // if (isSameDate(from, to)) {
    //     return Promise.reject('Same date')
    // }

    events.forEach(e => {
        if (e.id === eventId && !isSameDate(e.date, to)) {
            // console.log(`Moving event ${eventId} from ${e.date} to ${to}`)

            e.date = getDate(to)
        }
    })

    return Promise.resolve(events)

    // return timeline.map(item => {
    //     if (!item.contenido) {
    //     item.contenido = []
    //     }

    //     if (isSameDate(from, item.date)) {
    //     for (let i = 0; i < item.contenido.length; i++) {
    //         if (item.contenido[i].id === event.id) {
    //         item.contenido.splice(i, 1)
    //         break
    //         }
    //     }
    //     }

    //     if (isSameDate(to, item.date) && !hasEvent(item, event)) {
    //     item.contenido.push(buildEvent(event))
    //     }

    //     return item
    // })
}

// Private functions
function buildEvent(event) {
    const id = event.id || generateId()
  
    return Object.assign({}, event, { id })
}

function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

function findDuplicatedIds() {
    const ids = []
    events.forEach(event => {
        if (ids.indexOf(event.id) === -1) {
            ids.push(event.id)
        } else {
            console.warn('Duplicated ID ' + event.id)
        }
    })

    console.log(ids)
}