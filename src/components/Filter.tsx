// * Filter.tsx is a component for the language/genre filter feature *

import '../styles/filter.css';

import React, { useState, useEffect } from 'react';
import closeIcon from '../images/close-icon.png';
import ISOLanguage from '../ISOLanguage.json';
import {id, qs} from '../utils';

function Filter(props : any) {

  window.addEventListener('load', init);
  //window.addEventListener('resize', updateDropdownMargin);

  //* Initialize state at the top of the function component.
  // https://react.dev/reference/react/useState
  const [myTags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isOverlayActive, setActive] = useState(false);

  function init() {
    //openDropdown();
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
    // on adding a tag, hide the dropdown
    e.target.parentElement.classList.remove("showOnHover");

    // console.log('got in addTags');
    //& spread operator (...) allows us to quickly copy all or part of an existing array or object
    //& into another array or object.
    const lang = e.target.id;
    const tagKey = lang.toLowerCase();

    console.log(lang);

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
    let myDropDown = id('myDropdown-' + props.type);
    let a = myDropDown.getElementsByTagName('a');
    a[0].classList.add('firstItem');
    a[a.length - 1].classList.add('lastItem');
  }

  /**
   * Fired when filter search bar is clicked.
   * Allows for dropdown to persist after focus is off the searchbar
   * @param event - event associated with clicking filter search bar
   */
  function toggleDropdown(event : any) {
    // add class back to dropdown to have it persist after filter search is
    // out of focus
    let currDropdown = event.target.parentElement.querySelector(".myDropdown");
    currDropdown.classList.add("showOnHover");
  }

  function handleChange(e: any) {
    setInputValue(e.target.value);
    filterFunction(e);
  }

  // handle click in search bar of filter
  function handleClick(e: any) {
    //openDropdown(e);
    toggleDropdown(e);
    filterFunction(e);
  }

  /**
   * Handles searching for items inside the search bar
   */
  function filterFunction(e : any) {
    let input = e.target as HTMLInputElement;
    let filter = input.value.toUpperCase();

    // get dropdown from corresponding filter
    let div = e.target.parentElement.querySelector(".myDropdown");
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
  }

  return(
    <section id='filter-section'>
      <div className='any-language'>
        <input type='checkbox' id={'any-language-' + props.type} className='checkbox' onClick={showOverlay} />
        <label htmlFor={'any-language-' + props.type} className='text-body'></label>
        <span className='text-body'>Any language</span>
      </div>
      <div className='filter-root-container'>
        <div className='filter-container'>
          <div className="language-wrapper">
            <span className='search-header h4 bold'>Language</span>
            <div className='dropdown'>
              <input type='text' placeholder="Search..." value={inputValue} className='myInput'
                  onClick={handleClick} onChange={handleChange} />
              <div id={'myDropdown-' + props.type } className='myDropdown showOnHover dropdown-content soft-hidden'>
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
              <div className='tag h5' key={item}>
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