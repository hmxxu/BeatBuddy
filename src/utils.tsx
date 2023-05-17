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

// Converts takes in the (r, g, b) value and converts rgb to hex
function rgbToHex(r: any, g: any, b: any) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
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

export function processImage(src: any, imgWidth: number, imgHeight: number) {
  const image = new Image();
  image.src = src;
  image.onload= async () => {
    console.log(image.src);
    // ** Setting up the image and getting the image Data
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    image.crossOrigin = "Anonymous";
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(image, 0, 0);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

    // ** Gets rgb values for every pixel of image and applies color quantization
    let rgbValues = buildRgb(imageData);
    let result = quantizeColor(rgbValues, 3);

    // ** Generating the rgba of primary and secondary colors.
    let opacity = 1.0;
    let primaryColor = getRgba(result[0], opacity);
    let secondaryColor = getRgba(result[1], opacity);
    let bodyLinearGradient = "linear-gradient(" + primaryColor + ", " + secondaryColor + ")";
    // document.body.style.background = bodyLinearGradient;

    //** Applying color change + transition to the body
    let bodyColorClass = "body-color-change";
    cClass(bodyColorClass, primaryColor);
    document.body.classList.add("class", bodyColorClass);

    // ** Generating the rgba of child primary and child secondary colors.
    opacity = 0.2;
    let childPrimaryColor = getRgba(result[0], opacity);
    let childSecondaryColor = getRgba(result[1], opacity);
    let childLinearGradient = "linear-gradient(" + childPrimaryColor + ", " + childSecondaryColor + ")";

    // ** Applying color changes + transition to playlist-wrapper
    let playlistWrapperColorClass = "playlist-wrapper-color-change";
    cClass(playlistWrapperColorClass, childPrimaryColor);
    id('playlist-wrapper').classList.add("class", playlistWrapperColorClass);


    //TODO: THIS PART (changing text color based on contrast) IS CURRENTLY BROKEN BECAUSE
    // TODO: SOMEHOW THE image onload IS FIRING TWICE WHEN IT SHOULD ONLY FIRE ONCE
    // ** Check for text color contrast
    let foregroundColor = qs('.song-result').style.color;
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
    //TODO: ^THIS PART (changing text color based on contrast) IS CURRENTLY BROKEN BECAUSE
    // TODO: SOMEHOW THE image onload IS FIRING TWICE WHEN IT SHOULD ONLY FIRE ONCE



    // & Desktop version
    // ** Applying color changes + transition to song-result-container on desktop
    qsa('#playlist-wrapper > .song-results-container-parent > .song-result-container').forEach((element) => {
      // element.firstChild.style.background = secondaryColor;
      let containerColorClass = "container-color-change";
      cClass(containerColorClass, secondaryColor);
      element.firstChild.classList.add("class", containerColorClass);
      if (contrastRatio < 4.5) {
        if (foregroundColor === "black") {
          element.firstChild.style.color = "white";
        } else {
          element.firstChild.style.color = "black";
        }
      }
    });

    // & Mobile version
    // ** Applying color changes + transition to song-result-container on mobile
    qsa('#playlist-wrapper-mobile > .results-mobile > .song-result-container').forEach((element) => {
      // element.childNodes[2].style.background = secondaryColor;
      let mobileContainerColorClass = "mobile-container-color-change";
      cClass(mobileContainerColorClass, secondaryColor);
      element.childNodes[2].classList.add("class", mobileContainerColorClass);
      if (contrastRatio < 4.5) {
        if (foregroundColor === "black") {
          element.firstChild.style.color = "white";
        } else {
          element.firstChild.style.color = "black";
        }
      }
    });

    // ** Applying color changes + transition to the music player on desktop
    // qs('#song-player .play-btn-container').style.background = secondaryColor;
    let playerColorClass = "player-color-change";
    cClass(playerColorClass, secondaryColor);
    qs('#song-player .play-btn-container').classList.add("class", playerColorClass);

    image.onload = null;
  }
}


async function fetchContrastRatio (foregroundColor: string, backgroundColor: string) {
  const response = await axios.get(`https://webaim.org/resources/contrastchecker/?fcolor=${foregroundColor}&bcolor=${backgroundColor}&api`);
  let ratio = parseFloat(response.data.ratio);
  return ratio;
}

export function getColorClass(result: any, opacity: any) {
  return "rgba-" + result.r + "-" + result.g + "-" + result.b + "-" + opacity;
}

/**
 *
 * @param result An rgb class (looks like this: {r: 90, b: 12, b: 19})
 * @param opacity The opacity, or the "a" value in rgba
 * @returns A string in rgba format, for example -> "rgba(25, 15, 15, 0.7)"
 */
export function getRgba(result: any, opacity: any) {
  return "rgba(" + result.r + ", " + result.g + ", " + result.b + ", " + opacity + ")";
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

