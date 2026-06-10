/**
 * src/utils/progres.js
 * Helper untuk baca/tulis progres bintang ke localStorage.
 */
const KEY = 'tajwid_progres';

export function bacaProgres() {
  try   { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}

export function simpanProgres(arabHuruf, bintang) {
  const data = bacaProgres();
  data[arabHuruf] = Math.max(data[arabHuruf] || 0, bintang);
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function resetProgres() {
  localStorage.removeItem(KEY);
}
