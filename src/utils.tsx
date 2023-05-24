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

/**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} query - CSS query selector
 * @return {object[]} array of DOM objects matching the query.
 */
export const qsa = (query: any) => {
  return document.querySelectorAll(query)!;
}

export function hideGenerateButton() {
  id("generateReady").classList.add('close-mood-container');
  id("generateReady").classList.remove('open-mood-container');
  setTimeout(() => {
    id("generateReady").classList.add('hidden');
  }, 200);
}
export function showGenerateButton() {
  id("generateReady").classList.remove('hidden');
  id("generateReady").classList.remove('close-mood-container');
  id("generateReady").classList.add('open-mood-container');
}

export function hideMoodContainer() {
  qs('.mood-container').classList.add('close-mood-container');
  qs('.mood-container').classList.remove('open-mood-container');
  //! This should not be here. Saved as a last resort.
  setTimeout(() => {
    qs('.mood-container').classList.add('hidden');
  }, 200);
}
export function showMoodContainer() {
  setTimeout(() => {
    qs('.mood-container').classList.remove('hidden');
    qs('.mood-container').classList.remove('close-mood-container');
    qs('.mood-container').classList.add('open-mood-container');
  }, 500);
}

export function hideSearchDropdown() {
  id("search-results").classList.add('close-container');
  //! This should not be here. Saved as a last resort.
  setTimeout(() => {
    id("search-results").classList.add('hidden');
  }, 100);
}

export function hideSearchContainer() {
  qs(".search-container").classList.add('close-container');
  setTimeout(() => {
    qs(".search-container").classList.add('hidden');
  }, 200);
}
export function showSearchContainer() {
  setTimeout(() => {
    qs(".search-container").classList.remove('hidden');
    qs(".search-container").classList.remove('close-container');
    qs(".search-container").classList.add('open-container');
  }, 500);
}

export function hidePlaylistContainer() {
  id('playlist-container').classList.add('close-container');
  id('playlist-container').classList.remove('open-container');
}

export function showPlaylistContainer() {
  id('playlist-container').classList.add('open-container');
  id('playlist-container').classList.remove('close-container');
}

/**
 * Reset the mood button states (i.e. no buttons are selected)
 */
export function clearMoodButtons() {
  let container = id('mood-btns-container');
  let childrenElement = container.querySelectorAll('*');
  childrenElement.forEach((button) => {
    button.classList.remove('selected-mood');
  })
}


export class SearchResult {
  artist: string;
  artistId: string;
  title: string;
  id: string;
  genres: string[];
  imgUrl: string;

  constructor(artist: string, artistId: string, title: string, id: string, genres: string[], imgUrl: string) {
      this.artist = artist;
      this.artistId = artistId;
      this.title = title;
      this.id = id;
      this.genres = genres;
      this.imgUrl = imgUrl;
  }
}


// Helper function that helps rgbToHex convert values
function componentToHex(c: any) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// Takes in the (r, g, b) value and converts rgb to hex, returning them in a 'rgb(r, g, b)' format
function rgbToHex(r: any, g: any, b: any) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// Takes in the (r, g, b) value and converts rgb to hsl, returning them in an array --> '[h, s, l]' format
function rgbToHsl(r: any, g: any, b: any) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;
  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  // Make negative hues positive behind 360°
  if (h < 0)
    h += 360;
  l = (cmax + cmin) / 2;
  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
}

// Converts rgb string to array of [r,b,b] (ex. 'rgb(0,0,0)' -> [0, 0, 0])
function extractRGBValues(rgbString: any) {
  var regex = /rgb\((\d+), (\d+), (\d+)\)/;
  var matches = rgbString.match(regex);
  if (matches) {
    var red = parseInt(matches[1]);
    var green = parseInt(matches[2]);
    var blue = parseInt(matches[3]);
    return [red, green, blue];
  }
  return null; // Return null if the string does not match the expected format
}

// inverts hex
function invertHex(hex: number) {
  return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substring(1).toUpperCase()
}

/**
 * Generates a new class specifically to handle color changes with transition
 * @param className The name of the class
 * @param color The color of the background inside that class
 */
function cClass(className: any, color: any) {
  var style = document.createElement('style');
  // style.type = 'text/css';
  style.setAttribute('type', 'text/css');
  style.innerHTML =
    `.${className} {
        background: ${color};
        transition: ease-in-out 0.5s;
    }`;
  document.getElementsByTagName('head')[0].appendChild(style);
}

// ************ For color quantization **********
// ** Note: We are using the median cut algorithm to quantize color **
/**
 * The median cut algorithm works in the following steps:

  1. Load the image and extract its pixel colors in RGB format.
  2. Create a single subspace that contains all the colors in the image.
  3. Choose the color component with the largest range (i.e., the greatest difference between the minimum and maximum values) as the splitting axis.
  4. Sort the colors along the splitting axis and find the median color.
  5. Split the subspace into two new subspaces using the median color as the dividing point along the splitting axis.
  6. Repeat steps 3-5 recursively for each subspace until the desired number of representative colors is reached.
  7. Assign each pixel in the image to its nearest representative color and display the quantized image.
 */

/**
* Takes in the song cover photo and applies color quantization + text background contrast checker on the whole page
* @param src The image source
*/
export function processImage(src: any) {
  console.log('processImage called');
  const image = new Image();
  image.src = src;
  image.crossOrigin = "Anonymous";
  let count = 1;
  image.onload = async () => {

    // ** Setting up the image and getting the image Data
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    // ** Gets rgb values for every pixel of image and applies color quantization
    let rgbValues = buildRgb(imageData);
    let result = quantizeColor(rgbValues, 3);
    // ** Generating the rgba of primary and secondary colors.
    let primaryColor = getRgba(result[0], 1.0);
    let secondaryColor = getRgba(result[1], 1.0);

    let hoverColor = generateHoverColorHSL(result[1], 10, 10);
    let bodyLinearGradient = "linear-gradient(" + primaryColor + ", " + secondaryColor + ")";

    //** Applying color change + transition to the body
    document.documentElement.style.setProperty("--body-color", primaryColor);

    // ** Gets foreground (text color) and background color and Checks for text color contrast
    let foregroundColor = window.getComputedStyle(document.documentElement).getPropertyValue('--song-result-text-color').substring(1);
    console.log('foregrnd = ' + foregroundColor);
    let backgroundColor = rgbToHex(result[1].r, result[1].g, result[1].b);
    console.log('bckgrnd = ' + backgroundColor);
    // .song-result-mobile, .song-result
    let contrastRatio: number = 4.5;
    try {
      const response = await fetchContrastRatio(foregroundColor, backgroundColor);
      contrastRatio = response;
    } catch (error) {
      console.log(error);
    }
    console.log('contrast ratio = ' + contrastRatio);

    // ** Applying color changes + transition to song-result-container and play button on desktop
    document.documentElement.style.setProperty("--song-result-color", secondaryColor);
    document.documentElement.style.setProperty("--play-btn-color", secondaryColor);
    document.documentElement.style.setProperty("--hover-color", hoverColor);
    if (contrastRatio < 4.5) {
      if (foregroundColor === "000000") {
        // to white
        document.documentElement.style.setProperty("--song-result-text-color", "#ffffff");
      } else {
        // to black
        document.documentElement.style.setProperty("--song-result-text-color", "#000000");
      }
    }
  }
}


async function fetchContrastRatio (foregroundColor: string, backgroundColor: string) {
  const response = await fetch(`https://webaim.org/resources/contrastchecker/?fcolor=${foregroundColor}&bcolor=${backgroundColor}&api`, {
    method: "GET"
  });
  let ratio = parseFloat((await response.json()).ratio);  return ratio;
}

export function getColorClass(result: any, opacity: any) {
  return "rgba-" + result.r + "-" + result.g + "-" + result.b + "-" + opacity;
}

/**
 *
 * @param rgbClass An rgb class (looks like this: {r: 90, b: 12, b: 19})
 * @param opacity The opacity, or the "a" value in rgba
 * @returns A string in rgba format, for example -> "rgba(25, 15, 15, 0.7)"
 */
export function getRgba(rgbClass: any, opacity: any) {
  return "rgba(" + rgbClass.r + ", " + rgbClass.g + ", " + rgbClass.b + ", " + opacity + ")";
}

/**
 *
 * @param rgbClass An rgb class (looks like this: {r: 90, b: 12, b: 19})
 * @param dSaturation Saturation value change (in %) (will either increase/decrease based on conditions) for hover cover
 * @param dLightness Lightness value change (in %) (will either increase/decrease based on conditions) for hover cover
 * @returns an hsl value for the hover color (for example, returns )
 */
export function generateHoverColorHSL(rgbClass: any, dSaturation: number, dLightness: number) {
  let HSLColor =rgbToHsl(rgbClass.r, rgbClass.g, rgbClass.b);
  console.log("old: hsl(" + HSLColor[0] + "," + HSLColor[1] + "%," + HSLColor[2] + "%)");

  let max = 100;

  // Change the saturation value
  if (HSLColor[1] + dSaturation < max) {
    HSLColor[1] = HSLColor[1] + dSaturation;
  } else {
    HSLColor[1] = HSLColor[1] - dSaturation;
  }
  // Change the lightness value
  if (HSLColor[2] < 70 && HSLColor[2] + dLightness < max) {
    HSLColor[2] = HSLColor[2] + dLightness;
  } else {
    HSLColor[2] = HSLColor[2] - dLightness;
  }

  console.log("new: hsl(" + HSLColor[0] + "," + HSLColor[1] + "%," + HSLColor[2] + "%)");
  return "hsl(" + HSLColor[0] + "," + HSLColor[1] + "%," + HSLColor[2] + "%)";
  // return "rgba(" + (result.r + 3) + ", " + (result.g + 3) + ", " + (result.b + 3) + ", " + opacity + ")";
}

/**
 * Takes in an image data and returns an array containing rgb values for every
 * pixel of the image.
 * @param imageData The image data
 * @returns rgbValues, an array that contains all rgb values of an image
 */
export function buildRgb(imageData: any) {
  const rgbValues = [];
  for (let i = 0; i < imageData?.data.length!; i += 4) {
    const rgb: {r: number, g: number, b: number} = {
      r: imageData?.data[i],
      g: imageData?.data[i + 1],
      b: imageData?.data[i + 2],
    };
    rgbValues.push(rgb);
  }
  return rgbValues;
}

/**
 * Takes in the parameter and applies color quantization using the median cut
 * algorithm
 * @param rgbValues An array that contains all rgb values of an image
 * @param depth For example, a depth of 1 gives us 8 colors, depth of 2 gives us
 * 4 colors, depth of 3 gives us 2 colors
 * @returns
 */
export function quantizeColor(rgbValues: any, depth: number): any {
  const MAX_DEPTH = 4;
  if (depth === MAX_DEPTH || rgbValues.length === 0) {
    const color = rgbValues.reduce(
      (prev: any, curr: any) => {
        prev.r += curr.r;
        prev.g += curr.g;
        prev.b += curr.b;
        return prev;
      },
      {
        r: 0,
        g: 0,
        b: 0,
      }
    );
    color.r = Math.round(color.r / rgbValues.length);
    color.g = Math.round(color.g / rgbValues.length);
    color.b = Math.round(color.b / rgbValues.length);
    return [color];
  }

  const componentToSortBy = findBiggestColorRange(rgbValues);
  rgbValues.sort((p1: any, p2: any) => {
    return p1[componentToSortBy] - p2[componentToSortBy];
  });

  const mid = rgbValues.length / 2;
  return [
    ...quantizeColor(rgbValues.slice(0, mid), depth + 1),
    ...quantizeColor(rgbValues.slice(mid + 1), depth + 1),
  ];
}

/**
 *
 * @param rgbValues An array that contains all rgb values of an image
 * @returns A string indicating which color range (between r, g, b) is the biggest.
 * For example, it can return "r", meaning that red is the biggest range.
 */
export function findBiggestColorRange(rgbValues: any) {
  let rMin: number, gMin: number, bMin: number;
  rMin = gMin = bMin = Number.MAX_VALUE;
  let rMax: number, gMax: number, bMax: number;
  rMax = gMax = bMax = Number.MIN_VALUE;
  rgbValues.forEach((pixel: any) => {
    // Gets the minimum rgb values in rgbValues
    rMin = Math.min(rMin, pixel.r);
    gMin = Math.min(gMin, pixel.g);
    bMin = Math.min(bMin, pixel.b);

    // Gets the maximum rgb values in rgbValues
    rMax = Math.max(rMax, pixel.r);
    gMax = Math.max(gMax, pixel.g);
    bMax = Math.max(bMax, pixel.b);
  });

  const rRange = rMax - rMin;
  const gRange = gMax - gMin;
  const bRange = bMax - bMin;

  const biggestRange = Math.max(rRange, gRange, bRange);
  if (biggestRange === rRange) {
    return "r";
  } else if (biggestRange === gRange) {
    return "g";
  } else {
    return "b";
  }
}

// ********************************************************

