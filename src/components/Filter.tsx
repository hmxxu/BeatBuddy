// * Filter.tsx is a component for the language/genre filter feature *

import '../styles/filter.css';

import React, { useState, useEffect } from 'react';
import closeIcon from '../images/close-icon.png';
import ISOLanguage from '../ISOLanguage.json';
import decadeList from '../DecadeList.json';
import {id, qs} from '../utils';
import { returnGenres } from '../beatbuddy/src/APIFunctions/ReturnSongStats';

function Filter(props : any) {

  window.addEventListener('load', init);
  //window.addEventListener('resize', updateDropdownMargin);

  //* Initialize state at the top of the function component.
  // https://react.dev/reference/react/useState
  const [myTags, setTags] = useState<string[]>([]);

  type Tag = {
    name: string;
    id: string;
  }
  const [mTags, setMTags] = useState<Tag[]>([]);

  const [inputValue, setInputValue] = useState('');
  const [isOverlayActive, setActive] = useState(true);

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchGenre();
  }, []);

  async function init() {
    // borderForFirstLast();
    // testTags();
  }

  async function fetchGenre() {
    let genreDropdown: any = [];
    let genreList = await returnGenres();
    genreList.genres.forEach((genre: string) => {
      genreDropdown.push({
        id: genre,
        genre: kebabToTitleCase(genre)
      });
      // console.log(genreDropdown);
      // console.log("0 = " + genreDropdown[0].id);
      // console.log("0 = " + genreDropdown[0].genre);
    });
    setData(genreDropdown);
  }

  /**
   *
   * @param str Converts the kebab case to title case (e.g. "j-pop" --> "J Pop")
   */
  function kebabToTitleCase(str: string) {
    let result = str.split('-')
      .map(s => s[0].toUpperCase() + s.substring(1).toLowerCase())
      .join(' ');
    return result;
  }

  /**
   *
   * @param content A string passed in as a prop specifying whether the content
   * under the dropdown is a list of genre or a list of language.
   * @returns an HTML element for the dropdown list
   */
  function renderDropdownContent(content: string) {
    if (content.toLowerCase() === 'language') {
      return ISOLanguage.map(function (language) {
        return (
          <a href={'#' + language.code} id={language.name} key={language.name} onClick={addTags}>
            {language.name}
          </a>
        )
      });
    } else if (content.toLowerCase() === 'genre') {
      if (data != null) {
        return data.map(function (genre: any) {
          return (
            <a href={'#' + genre.id} id={genre.id} key={genre.id} onClick={addTags}>
              {genre.genre}
            </a>
          )
        });
      }
    } else if (content.toLowerCase() === 'time period') {
      return decadeList.map(function (decade) {
        return (
          <a href={'#' + decade.name} id={decade.range} key={decade.range} onClick={addTags}>
            {decade.name}
          </a>
        )
      });
    }
  }

  function clearAllTags() {
    setTags([]);
    setMTags([]);
  }

  function showOverlay() {
    // if overlay is active, send to parent entire array of genres
    if (!isOverlayActive) {
      props.childToParent(data, data);
    }
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
    const mData = e.target;
    const mID = e.target.id.toLowerCase();

    console.log('mData = ' + mData.innerHTML);
    console.log('mID = ' + mID);

    console.log(data);

    let isTagDuplicate: boolean = false;

    console.log("mTags len = " + mTags.length);
    if (mTags.length < 1) {
      console.log('case less than equal 1');
      setMTags([...mTags,
        {
          name: mData.innerHTML,
          id: mID
        }
      ]);

    } else {
      console.log('case > 1');
      mTags.forEach((data) => {
        if (data.id.toLowerCase() === mID) {
          isTagDuplicate = true;
          console.log('M: attempting to add duplicate tags!')
        }
      })

      if (!isTagDuplicate) {
        setMTags([...mTags,
          {
            name: mData.innerHTML,
            id: mID
          }
        ]);
      }
    }
    setInputValue("");
    console.log(myTags);

    // send updated list of selected tags to parent
    props.childToParent(mTags, data);
  }

  //* Remove tags working now, need to work on preventing dupes
  function removeTags(tagToRemove: any) {
    // console.log('got in removeTags');
    const updatedMTags = mTags.filter((data) => data.id !== tagToRemove.id);
    console.log('updatedMTags = ');
    console.log(updatedMTags);
    setMTags(updatedMTags);

    // send updated mTags to parent
    props.childToParent(mTags, data);
  }

  /**
   * Gives a curved border radius to the first and last item on search dropdown
   */
  function borderForFirstLast() {
    console.log('render');
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

  // Adds tag to filter
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
        <input type='checkbox' id={'any-language-' + props.type} className='checkbox' defaultChecked={true} onClick={showOverlay} />
        <label htmlFor={'any-language-' + props.type} className='text-body'></label>
        <span className='text-body'>Any {props.content}</span>
      </div>
      <div className='filter-root-container'>
        <div className='filter-container'>
          <div className="language-wrapper">
            <span className='search-header h4 bold'>{props.content}</span>
            <div className='dropdown'>
              <input type='text' placeholder="Search..." value={inputValue} className='myInput'
                  onClick={handleClick} onChange={handleChange} />
              <div id={'myDropdown-' + props.type } className='myDropdown showOnHover dropdown-content soft-hidden'>
                {/* {ISOLanguage.map((language) => (
                  <a href={'#' + language.code} id={language.name} key={language.name} onClick={addTags}>
                    {language.name}
                  </a>
                ))} */}
                { renderDropdownContent(props.content === undefined ? '' : props.content) }
                {/* {data.map((genre) => (
                  <a href={'#' + genre.id} id={genre.id} key={genre.id} onClick={addTags}>
                    {genre.genre}
                  </a>
                ))} */}
              </div>
            </div>
          </div>

          {/* <div className='clear-all'>

          </div> */}
          <span className='clear-all-text'><u onClick={clearAllTags}>Clear all</u></span>
          {/* flex - row */}
          <div className='tags-container'>

            {/* {myTags.map(item => (
              <div className='tag h5' key={item}>
                <p className='tag-content'>{item}</p>
                <img src={closeIcon} alt='An icon of an x' className="x-icon" onClick={() => removeTags(item)}></img>
              </div>
            ))} */}

            {mTags.map(item => (
              <div className='tag h5' key={item.id} id={item.id} >
                <p className='tag-content'>{item.name}</p>
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