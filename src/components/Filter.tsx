// * Filter.tsx is a component for the language/genre filter feature *

import '../styles/filter.css';

import React, { useState } from 'react';
import closeIcon from '../images/close-icon.png';
import ISOLanguage from '../ISOLanguage.json';

function Filter() {

  window.addEventListener('load', init);
  window.addEventListener('resize', updateDropdownMargin);

  //* Initialize state at the top of the function component.
  // https://react.dev/reference/react/useState
  const [tagComponent, setTagComponent] = useState<React.ReactNode[]>([]);
  const [myTags, setTags] = useState<string[]>([]);

  function init() {
    openDropdown();
    updateDropdownMargin();
    borderForFirstLast();
    getTagsClicked();
  }

  // TODO: Right now duplicate tags can still be added <-- fix this
  function addTags (e: any) {
    console.log('got in addTags');
    //& spread operator (...) allows us to quickly copy all or part of an existing array or object
    //& into another array or object.
    const lang = e.target.id;
    const tagKey = lang.toLowerCase();

    //? old implement
    // const newTag = (
    //   <div className='tag' key={tagKey}>
    //     <p className='tag-content'>{language}</p>
    //     <img src={closeIcon} alt='An icon of an x' className="x-icon" onClick={() => removeTags(tagKey)}></img>
    //   </div>
    // );
    // setTags([...myTags, newTag]);
    // myTags.filter((language) => {
    //   console.log("language = " + language);
    //   console.log("tagKey = " + tagKey);

    //   if(language.toLowerCase() !== tagKey) {
    //     return true;
    //   }
    //   return false;
    // });

    if (myTags.length < 1) {
      setTags([...myTags, lang]);
    } else {
      myTags.forEach((tag) => {
        if (tag.toLowerCase() !== tagKey) {
          setTags([...myTags, lang]);
          console.log('adding non-duplicate tags, all good');
        } else {
          console.log('attempting to add duplicate tags!')
        }
      })
    }
    //? new implement

  }

  //* Remove tags working now, need to work on preventing dupes
  function removeTags(tagToRemove: any) {
    console.log('got in removeTags');
    console.log(tagToRemove);
    const updatedTags = myTags.filter((language) => language !== tagToRemove);
    setTags(updatedTags);
  }

  // function updateLang(e: any) {
  //   console.log('Clicked ons: ', e.target.id);
  //   let language = e.target.id;
  //   setTagComponent([...tagComponent, <Tags langName={language} key={language} />]);
  // }

  // function removeTag(index: number) {
  //   setTagComponent(tagComponent.filter((_, i) => i !== index));
  // }

  function getTagsClicked() {
    let myDropdown = id('myDropdown');
    myDropdown.addEventListener('click', (e) => {
      let clickedElement = e.target! as Element;
      // Confirm check if it's an 'a' tag
      if (clickedElement.tagName!.toLowerCase() === 'a') {
        e.preventDefault();
        let langName = clickedElement.getAttribute('id');
        let tagsContainer = document.querySelector('.tags-container') !;
        // tagsContainer.appendChild(<Tags langName={langName}/>)
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
    qs('.dropdown-content').style.width = `${myInputWidth}px`;
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
        // console.log('inside');
        id('myDropdown').classList.add('show');
        id('myDropdown').classList.remove('hidden');
      } else {
        // console.log('outside');
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
          {/* <div id='myDropdown' className='dropdown-content hidden'>
            <a href='#en' id='en'>English</a>
            <a href='#th' id='th'>Thai</a>
            <a href='#ja' id='ja'>Japanese</a>
            <a href='#kr' id='kr'>Korean</a>
            <a href='#cn' id='cn'>Chinese</a>
            <a href='#de' id='de'>German</a>
            <a href='#it' id='it'>Italian</a>
            <a href='#fr' id='fr'>French</a>
            <a href='#es' id='es'>Spanish</a>
            <a href='#ru' id='ru'>Russian</a>
            <a href='#id' id='id'>Indonesian</a>
            <a href='#pl' id='pl'>Polish</a>
          </div> */}
          {/* <LanguageList onClick={updateLang}/> */}
          <div id='myDropdown' className='dropdown-content hidden'>
            {ISOLanguage.map((language) => (
              <a href={'#' + language.code} id={language.name} key={language.name} onClick={addTags}>
                {language.name}
              </a>
            ))}
          </div>

          <div id='myDropdown' className='dropdown-content hidden'>

          </div>
        </div>

        {/* <div className='clear-all'>

        </div> */}
        <span className='clear-all-text'>Clear all</span>
        {/* flex - row */}
        <div className='tags-container'>

          {myTags.map(item => (
            <div className='tag' key={item}>
              <p className='tag-content'>{item}</p>
              <img src={closeIcon} alt='An icon of an x' className="x-icon" onClick={() => removeTags(item)}></img>
            </div>
          ))}

          {/* {myTags} */}
          {/* {tagComponent} */}
          {/* {showTags && <Tags langName="jp"/>} */}

          {/* <div className='tag'>
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
          </div> */}
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

// function LanguageList(props: any) {
//   function updateLang(e: any) {
//     let language = e.target.id;
//     props.onClick(language);
//   }

//   const langList = ISOLanguage.map((language) => (
//     <a href={'#' + language.code} id={language.name} key={language.name} onClick={updateLang}>
//       {language.name}
//     </a>
//   ));

//   return (
//     <div id='myDropdown' className='dropdown-content hidden'>{langList}</div>
//   )
// }
function LanguageList() {
  const langList = ISOLanguage.map((language) => (
    <a href={'#' + language.code} id={language.name} key={language.name}>
      {language.name}
    </a>
  ));

  return (
    <div id='myDropdown' className='dropdown-content hidden'>{langList}</div>
  )
}

// function Tags(props: any) {
//   let langName = props.langName;
//   // let langName = "untitled";

//   return (
//     <div className='tag'>
//       <p className='tag-content'>{langName}</p>
//       <img src={closeIcon} alt='An icon of an x' className="x-icon"></img>
//     </div>
//   )
// };

export default Filter;