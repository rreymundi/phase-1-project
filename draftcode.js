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
        window.addEventListener('load', () => {
            if (!localStorage.getItem('theme')) {
                localStorage.setItem('theme', 'light');
            }
        
            const themeSelector = document.querySelector('#themeSelector');
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark');
                themeSelector.textContent = '☀️';
            } else {
                themeSelector.textContent = '🌙️';
            }
        
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

    // function with event listener for form `submit`
    function formSubmit(){
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            searchQuery = e.target[0].value
    
            // my GET request
            fetch(`${url}?q=${searchQuery}`)
            .then(res => res.json())
            .then(res => {
                filterResults(res, searchQuery)
                renderResults()
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
    function renderResults(){
        results.forEach(element => {
            card = document.createElement('li')
            card.innerHTML = `
            <div class="card">
                <div class="poster">
                    <a href="${element.show.url}">
                        <img src="${element.show.image.medium}">
                            </a><br>
                            <h4>${element.show.name}
                        </h4>
                        <button id="${element.show.id}" class="save">❤️</button>
                                </div>
                </div>`
            searchResultsList.appendChild(card)
        })
    }

    // my function for the SAVE button
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

    // // my function for the DELETE button
    function deleteButton(){
        deleteButtonArray.forEach(element => {
            element.className = 'delete'
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