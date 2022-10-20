import { isSameDate, parseDate, parseDateAsString } from "./date.utils"

/**
 * Construye una timeline para un mes/anio con los eventos correspondientes
 * 
 * @param {number} year Anio de la timeline
 * @param {number} month Mes de la timeline
 * @param {{ Evento }[]} events Lista con todos los eventos
 * @returns Devuelve la timeline con los eventos para la fecha seleccionada
 */
export function buildTimeline(year, month, events) {
  const timeline = []
  const diasMes = new Date(year, month, 0).getDate()

  for (let dia = 1; dia <= diasMes; dia++) {
    const currentDate = parseDate(year, month, dia);
    let contenido = []

    events.forEach(event => {
      if (isSameDate(event.date, currentDate)) {
        contenido.push(buildEvent(event.contenido));
      }
    })

    timeline.push({
      date: parseDateAsString(year, month, dia),
      contenido
    })
  }

  return timeline
}

export function addEventToTimeline(event, timeline) {
  return timeline.map(item => {
    if (isSameDate((item.date), event.date)) {
      if (!item.contenido) {
        item.contenido = []
      }

      item.contenido.push(event.contenido)
    }

    return item
  })
}

export function moveEvent(from, to, event, timeline) {
  console.log(`Moving event ${JSON.stringify(event)} from ${from} to ${to}`)
  return timeline.map(item => {
    if (!item.contenido) {
      item.contenido = []
    }

    if (isSameDate(from, item.date)) {
      for (let i = 0; i < item.contenido.length; i++) {
        if (item.contenido[i].id === event.id) {
          item.contenido.splice(i, 1)
          break
        }
      }
    }

    if (isSameDate(to, item.date) && !hasEvent(item, event)) {
      console.log(event)
      item.contenido.push(buildEvent(event))
    }

    return item
  })
}

function buildEvent(contenido) {
  const id = contenido.id || generateId()

  return Object.assign({}, contenido, { id })
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

function hasEvent(item, event) {
  return !!item.contenido.find(({ id }) => id === event.id)
}
