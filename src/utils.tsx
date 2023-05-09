// * Contains global methods accessible by all files

/**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} id - element ID
 * @return {object} DOM object associated with id.
 */
export const id = (id: any) => {
  return document.getElementById(id)!;
}

/**
 * Returns the first element that matches the given CSS selector.
 * @param {string} query - CSS query selector.
 * @return {object[]} array of DOM objects matching the query.
 */
export const qs = (query: any) => {
  return document.querySelector(query)!;
}

export class SearchResult {
  artist: string;
  title: string;
  id: string;
  genres: string[];
  imgUrl: string;

  constructor(artist: string, title: string, id: string, genres: string[], imgUrl: string) {
      this.artist = artist;
      this.title = title;
      this.id = id;
      this.genres = genres;
      this.imgUrl = imgUrl;
  }
}