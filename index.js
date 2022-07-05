document.addEventListener('DOMContentLoaded', () => {

    // global variables
    const form = document.querySelector('form')
    const searchResults = document.getElementById('search-results')
    const searchResultsList = document.getElementById('search-results-list')
    const myWatchList = document.getElementById('my-watch-list')
    const url = 'https://api.tvmaze.com/search/shows'
    let searchQuery
    let results
    let card
    let saveBtnArray
    let savedShow
    let mySavedShow
    let mySavedShowCopy
    let deleteButtonArray
    let deletedShow
    let myDeletedShow

    // function to toggle "dark mode"
    function darkMode(){
        // EVENT LISTENER 1 this loads the 'light' theme if there is no theme selected
        window.addEventListener('load', () => {
            if (!localStorage.getItem('theme')) {
                localStorage.setItem('theme', 'light');
            }
        // this sets the button emoji based on the theme
            const themeSelector = document.querySelector('#themeSelector');
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark');
                themeSelector.textContent = '☀️';
            } else {
                themeSelector.textContent = '🌙️';
            }
        // EVENT LISTENER 2 this is the actual funcitonality where a CLICK event listener changes the theme of the page
            themeSelector.addEventListener('click', () => {
                if (localStorage.getItem('theme') === 'light') {
                    localStorage.setItem('theme', 'dark');
                    themeSelector.textContent = '☀️';
                } else {
                    localStorage.setItem('theme', 'light');
                    themeSelector.textContent = '🌙️';
                }
        
                document.body.classList.toggle('dark');
            });
        });
    }

    // EVENT LISTENER 3 function with event listener for form `submit`
    function formSubmit(){
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            searchQuery = e.target[0].value
    
            // my GET request
            fetch(`${url}?q=${searchQuery}`)
            .then(res => res.json())
            .then(res => {
                filterResults(res, searchQuery)
                renderResults(results)
                saveButton()
            })
            form.reset()
        }) 
    } 

    // my function to FILTER results
    function filterResults(array, string){
        searchResultsList.innerHTML = ''
        searchResults.style.display = 'block'
        // filters results into new array
            results = array.filter(element => {
                element.name === string
                return element
            })
    } 

    // my function to RENDER results
    function renderResults(array){
        array.forEach(element => {
            card = document.createElement('li')
            const showURL = element.show.url
            const showImage = element.show.image.medium
            const showName = element.show.name
            const showID = element.show.id
            card.innerHTML = `
            <div class="card">
                <div class="poster">
                    <a href="${showURL}" target="_blank">
                        <img id="poster-image" src="${showImage}">
                            </a><br>
                            <h4>${showName}
                        </h4>
                        <button id="${showID}" class="save">❤️</button>
                                </div>
                </div>`
                searchResultsList.appendChild(card)
            })
        }
        
    // EVENT LISTENER 4 my function for the SAVE button
    function saveButton(){
        saveBtnArray = document.querySelectorAll(".save")
        saveBtnArray.forEach(element => {
            element.addEventListener('click', () => {
                savedShow = element.parentNode
                mySavedShow = savedShow.parentNode
                mySavedShowCopy = mySavedShow.cloneNode(true)
                myWatchList.appendChild(mySavedShowCopy)
                deleteButtonArray = document.getElementById("my-watch-list").querySelectorAll(".save")
                deleteButton()
            })
        })
        }

    // EVENT LISTENER 5 my function for the DELETE button
    function deleteButton(){
        deleteButtonArray.forEach(element => {
            element.className = 'delete'
            element.innerHTML = '✖️'
            element.addEventListener('click', () => {
                deletedShow = element.parentNode
                myDeletedShow = deletedShow.parentNode
                myDeletedShow.remove()
            })
        })
    }

    darkMode()
    formSubmit()
})

// END OF MY JS SCRIPT DO NOT ADD CODE

// let cardHover = document.querySelector('.card')
//                 cardHover.addEventListener('mouseover', () => {
//                     cardHover.style.transition.backgroundColor = "white"
//                     })

// save button function

// function saveButton(){
//     let likebutton = document.querySelector('card').querySelector('button')
//     if (likebutton.className == 'save'){
//         likebutton.addEventListener('click', () => {
//             savedShow = element.parentNode
//             mySavedShow = savedShow.parentNode
//             myWatchList.appendChild(mySavedShow)
//             deleteButtonArray = document.getElementById("my-watch-list").querySelectorAll(".save")
//             deleteButtonArray.className = 'delete'
//         })
//     } else if (likebutton.className == 'delete'){
//         likebutton.addEventListener('click', () => {
//             deletedShow = element.parentNode
//             myDeletedShow = deletedShow.parentNode
//             mmyWatchList.appendChild(myDeletedShow)
//         })
//     }
// }

    // // my function for the SAVE button
    // function saveButton(){
    //     saveBtnArray = document.querySelectorAll(".save")
    //     saveBtnArray.forEach(element => {
    //         element.addEventListener('click', () => {
    //             savedShow = element.parentNode
    //             mySavedShow = savedShow.parentNode
    //             // mySavedShowCopy = mySavedShow.cloneNode(true)
    //             myWatchList.appendChild(mySavedShow)
    //             deleteButton()
    //         })
    //     })
    // }
    
    // // // my function for the DELETE button
    // function deleteButton(){
    //     deleteButtonArray = document.getElementById("my-watch-list").querySelectorAll("li")
    //     deleteButtonArray.forEach(element => {
    //         element.addEventListener('click', () => {
    //             myWatchList.appendChild(element)
    //         })
    //     })
    // }