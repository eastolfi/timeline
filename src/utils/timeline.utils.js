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
      let contenido = {}

      events.forEach(event => {
        if (isSameDate(event.date, currentDate)) {
          contenido = event.contenido;
        }
      })

      timeline.push({
        date: parseDateAsString(year, month, dia),
        contenido
      })
    }

    return timeline
}