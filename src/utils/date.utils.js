/**
 * Convierte una fecha con formato DD/MM/YYYY
 * 
 * @param {number} year Anio
 * @param {number} month Mes (de 1 a 12)
 * @param {number} day Dia
 * @returns La fecha en formato DD/MM/YYYY
 */
export function parseDateAsString(year, month, day) {
    return `${day <= 9 ? "0" : ""}${day}/${month <= 9 ? "0" : ""}${month}/${year}`;
}

/**
 * Crea una nueva fecha
 * 
 * @param {number} year Anio
 * @param {number} month Mes (de 1 a 12)
 * @param {number} day Dia
 * @returns La fecha de tipo {Date}
 */
export function parseDate(year, month, day) {
    return new Date(year, month - 1, day);
}
 
/**
 * Comprueba que las dos fechas son las mismas
 * 
 * @param {Date} first Primera fecha
 * @param {Date} second Segunda fecha
 * @returns Si es la misma fecha o no
 */
export function isSameDate(first/*Date*/, second/*Date*/) {
    return first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();
}