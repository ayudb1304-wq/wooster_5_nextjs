/** Dispatched on `window` when a case card asks the film section to scroll into view and play with sound. */
export const PLAY_FILM_EVENT = "wooster:play-film";

export function requestFilmPlayback() {
  window.dispatchEvent(new Event(PLAY_FILM_EVENT));
}
