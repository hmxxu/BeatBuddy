// * Filter.tsx is a component for the language/genre filter feature *

import '../styles/filter.css';

import React, { useState, useEffect } from 'react';
import closeIcon from '../images/close-icon.png';
import ISOLanguage from '../ISOLanguage.json';
import {id, qs} from '../utils';

function Filter() {

  window.addEventListener('load', init);
  //window.addEventListener('resize', updateDropdownMargin);

  //* Initialize state at the top of the function component.
  // https://react.dev/reference/react/useState
  const [myTags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isOverlayActive, setActive] = useState(false);

  function init() {
    openDropdown();
    //updateDropdownMargin();
    borderForFirstLast();
    // getTagsClicked();
  }

  function clearAllTags() {
    setTags([]);
  }

  function showOverlay() {
    setActive(!isOverlayActive);
    // clearAllTags();
    setInputValue("");
  }

  function addTags (e: any) {
    // console.log('got in addTags');
    //& spread operator (...) allows us to quickly copy all or part of an existing array or object
    //& into another array or object.
    const lang = e.target.id;
    const tagKey = lang.toLowerCase();

    let isTagDuplicate: boolean = false;

    if (myTags.length < 1) {
      setTags([...myTags, lang]);
    } else {
      myTags.forEach((tag) => {
        if (tag.toLowerCase() === tagKey) {
          isTagDuplicate = true;
          console.log('attempting to add duplicate tags!')
        }
      })
      if (!isTagDuplicate) {
        setTags([...myTags, lang]);
      }
    }
    setInputValue("");
  }

  //* Remove tags working now, need to work on preventing dupes
  function removeTags(tagToRemove: any) {
    // console.log('got in removeTags');
    console.log(tagToRemove);
    const updatedTags = myTags.filter((language) => language !== tagToRemove);
    setTags(updatedTags);
  }

  /**
   * Positions the search dropdown correct so that it's always horizontally
   * aligned with the search bar.
   */
  // function updateDropdownMargin() {
  //   let sh = qs('.search-header');
  //   let sWidth: number = sh.offsetWidth | 0;
  //   let sMargin: number = parseFloat(getComputedStyle(sh).marginRight!);
  //   let offset: number = sWidth + sMargin;

  //   let myInputWidth: number = (qs('.myInput').offsetWidth | 0) - 2;
  //   console.log(offset);
  //   qs('.dropdown-content').style.width = `${myInputWidth}px`;
  //   qs('.dropdown-content').style.marginLeft = `${offset}px`;
  // }

  /**
   * Gives a curved border radius to the first and last item on search dropdown
   */
  function borderForFirstLast() {
    let myDropDown = id('myDropdown');
    let a = myDropDown.getElementsByTagName('a');
    a[0].classList.add('firstItem');
    a[a.length - 1].classList.add('lastItem');
  }

  /**
   * Opens the dropdown for the search bar if the user clicks the
   * search bar, otherwise the dropdown will be closed.
   */
  function openDropdown() {
    // console.log('got in openDropdown');
    let myInput = qs('.myInput')!;
    document.addEventListener('click', (e) => {
      const withinBoundaries: boolean = e.composedPath().includes(myInput);
      if (withinBoundaries) {
        // console.log('inside');
        id('myDropdown').classList.add('show');
        id('myDropdown').classList.remove('hidden');
      } else {
        // console.log('outside');
        id('myDropdown').classList.add('hidden');
        id('myDropdown').classList.remove('show');
      }
    });

    //& This line below is for debugging purposes
    // id('myDropdown').classList.toggle('hidden');
  }

  function handleChange(e: any) {
    setInputValue(e.target.value);
    filterFunction();
  }

  function handleClick(e: any) {
    openDropdown();
    filterFunction();
  }

  /**
   * Handles searching for items inside the search bar
   */
  function filterFunction() {
    let input = qs('.myInput') as HTMLInputElement;
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
    // console.log('firstItemIndex = ' + firstItemIndex);
    // console.log('lastItemIndex = ' + lastItemIndex);
  }

//   /**
//  * Returns the element that has the ID attribute with the specified value.
//  * @param {string} id - element ID
//  * @return {object} DOM object associated with id.
//  */
//   function id(id: any) {
//     return document.getElementById(id)!;
//   }

//   /**
//    * Returns the first element that matches the given CSS selector.
//    * @param {string} query - CSS query selector.
//    * @return {object[]} array of DOM objects matching the query.
//    */
//   function qs(query: any) {
//     return document.querySelector(query);
//   }

  return(
    <section id='filter-section'>
      <div className='any-language'>
        <input type='checkbox' id='any-language' className='checkbox' onClick={showOverlay} />
        <label htmlFor='any-language' className='text-body'>Any language</label>
      </div>
      <div className='filter-root-container'>
        <div className='language'>
        </div>
        <div className='filter-container'>
          <div>
            <span className='h4 search-header'>Language</span>
            <div className='dropdown'>
              <input type='text' placeholder="Search..." value={inputValue} className='myInput'
                  onClick={handleClick} onChange={handleChange} />
              <div id='myDropdown' className='dropdown-content hidden'>
                {ISOLanguage.map((language) => (
                  <a href={'#' + language.code} id={language.name} key={language.name} onClick={addTags}>
                    {language.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* <div className='clear-all'>

          </div> */}
          <span className='clear-all-text'><u onClick={clearAllTags}>Clear all</u></span>
          {/* flex - row */}
          <div className='tags-container'>

            {myTags.map(item => (
              <div className='tag' key={item}>
                <p className='tag-content'>{item}</p>
                <img src={closeIcon} alt='An icon of an x' className="x-icon" onClick={() => removeTags(item)}></img>
              </div>
            ))}
          </div>
        </div>
        <div className={`ol ${isOverlayActive ? 'overlay' : 'hidden'}`}></div>
      </div>
    </section>

  )

}

export default Filter;