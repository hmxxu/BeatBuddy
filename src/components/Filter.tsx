// * Filter.tsx is a component for the language/genre filter feature *

import '../styles/filter.css';
//* ISOLanguage stores a JSON of all languages and its
import ISOLanguage from '../ISOLanguage.json';

import React from 'react';
import closeIcon from '../images/close-icon.png';

function Filter() {

  window.addEventListener('load', init);
  window.addEventListener('resize', updateDropdownMargin);

  function init() {
    openDropdown();
    updateDropdownMargin();
    borderForFirstLast();
    getTagsClicked();
    console.log(ISOLanguage[1]);
  }

  function getTagsClicked() {
    let myDropdown = id('myDropdown');
    myDropdown.addEventListener('click', (e) => {
      let clickedElement = e.target! as Element;
      // Confirm check if it's an 'a' tag
      if (clickedElement.tagName!.toLowerCase() === 'a') {
        e.preventDefault();
        console.log('got in');
        // console.log(clickedElement);
        console.log(clickedElement.getAttribute('id'));
      }
    })

  }

  /**
   * Positions the search dropdown correct so that it's always horizontally
   * aligned with the search bar.
   */
  function updateDropdownMargin() {
    let sh = qs('.search-header');
    let sWidth: number = sh.offsetWidth | 0;
    let sMargin: number = parseInt(getComputedStyle(sh).marginRight!);
    let offset: number = sWidth + sMargin;

    let myInputWidth: number = (id('myInput').offsetWidth | 0) - 2;
    console.log(offset);

    qs('.dropdown-content').style.marginLeft = `${offset}px`;
    qs('.dropdown-content').style.minWidth = `${myInputWidth}px`;
  }

  /**
   * Gives a curved border radius to the first and last item on search dropdown
   */
  function borderForFirstLast() {
    let myDropDown = id('myDropdown')!
    let a = myDropDown.getElementsByTagName('a');
    a[0].classList.add('firstItem');
    a[a.length - 1].classList.add('lastItem');
  }

  /**
   * Opens the dropdown for the search bar if the user clicks the
   * search bar, otherwise the dropdown will be closed.
   */
  function openDropdown() {
    let myInput = id('myInput')!;
    document.addEventListener('click', (e) => {
      const withinBoundaries: boolean = e.composedPath().includes(myInput);
      if (withinBoundaries) {
        console.log('inside');
        id('myDropdown').classList.add('show');
        id('myDropdown').classList.remove('hidden');
      } else {
        console.log('outside');
        id('myDropdown').classList.add('hidden');
        id('myDropdown').classList.remove('show');
      }
    });
  }

  /**
   * Handles searching for items inside the search bar
   */
  function filterFunction() {
    let input = id('myInput') as HTMLInputElement;
    let filter = input.value.toUpperCase();
    let div = id('myDropdown')!;
    let a = div.getElementsByTagName('a');

    let amountFound: number = 0;
    let firstItemIndex: number = 0;
    let lastItemIndex: number = 0;
    let firstItemFound: boolean = false;

    for (let i = 0; i < a.length; i++) {
      let txtValue = a[i].textContent || a[i].innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1 && !firstItemFound) {
        firstItemFound = true;
        firstItemIndex = i;
      }

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        amountFound += 1;
        lastItemIndex = i;
        a[i].style.display = '';
        a[i].classList.add('add-border');
      } else {
        a[i].style.display = 'none';
        a[i].classList.remove('add-border');
      }
    }
    // ! If the search has 1 result, then it will have curved borders,
    // ! otherwise nothing will have curved borders except for 1st and last
    // ! element of the search result.
    if (amountFound > 1) {
      console.log('amount found > 1');
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('add-border');
        a[i].classList.remove('firstItem');
        a[i].classList.remove('lastItem');
      }
      a[firstItemIndex].classList.add('firstItem');
      a[lastItemIndex].classList.add('lastItem');
    }
    console.log('firstItemIndex = ' + firstItemIndex);
    console.log('lastItemIndex = ' + lastItemIndex);
  }

  /**
 * Returns the element that has the ID attribute with the specified value.
 * @param {string} id - element ID
 * @return {object} DOM object associated with id.
 */
  function id(id: any) {
    return document.getElementById(id)!;
  }

  /**
 * Returns the array of elements that match the given CSS selector.
 * @param {string} query - CSS query selector
 * @returns {object[]} array of DOM objects matching the query.
 */
  function qsa(query: any) {
    return document.querySelectorAll(query);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} query - CSS query selector.
   * @return {object[]} array of DOM objects matching the query.
   */
  function qs(query: any) {
    return document.querySelector(query);
  }

  return(
    <div className='filter-root-container'>
      <div className='language'>
        <div>
          <input type='checkbox' id='any-language' name='any-language' />
          <label htmlFor='any-language' className='text-body'>Any language</label>
        </div>
        <h4>ds This is h4 font</h4>
      </div>
      <div className='filter-container'>
        <div className='dropdown'>
          <span className='h4 search-header'>Language</span>
          <input type='text' placeholder='Search..' id='myInput' onKeyUp={filterFunction} />
          <div id='myDropdown' className='dropdown-content hidden'>
            <a href='#en' id='en'>English</a>
            <a href='#th' id='th'>Thai</a>
            <a href='#jp' id='jp'>Japanese</a>
            <a href='#kr' id='kr'>Korean</a>
            <a href='#cn' id='cn'>Chinese</a>
            <a href='#de' id='de'>German</a>
            <a href='#it' id='it'>Italian</a>
            <a href='#fr' id='fr'>French</a>
            <a href='#es' id='es'>Spanish</a>
            <a href='#ru' id='ru'>Russian</a>
            <a href='#id' id='id'>Indonesian</a>
            <a href='#pl' id='pl'>Polish</a>
          </div>
        </div>

        {/* <div className='clear-all'>

        </div> */}
        <span className='clear-all-text'>Clear all</span>
        {/* flex - row */}
        <div className='tags-container'>
          <div className='tag'>
            <p className='tag-content'>J-rock</p>
            <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
          </div>
          <div className='tag'>
            <span className='tag-content'>Vocaloid</span>
            <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
          </div>
          <div className='tag'>
            <span className='tag-content'>Indie</span>
            <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
          </div>
          <div className='tag'>
            <span className='tag-content'>Classical</span>
            <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
          </div>
          <div className='tag'>
            <span className='tag-content'>Jazz</span>
            <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
          </div>
        </div>
      </div>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>
      <h1>h1</h1>

    </div>
  )

}

export default Filter;