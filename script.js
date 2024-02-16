const myLibrary = [] //this will be an array of Book objects
const addButton = document.querySelector('.add-book')
const sideBar = document.querySelector('.side-bar')
addButton.addEventListener('click', enterForm)
sideBar.addEventListener('submit', (e) => addBookToLibrary(e))
const library = document.querySelector('.library')

// This is Book constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function () {
        let readText
        if (read) {
            readText = 'read'
        } else {
            readText = 'not yet read'
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readText}`
    }
}

// populate the database with three books so we have some data to work with
// at this stage, we are not storing this in a database as that 
// functionality will come later 
let book = new Book('Catch-22', 'Joseph Heller', 453, false)
myLibrary.push(book)
book = new Book('Shoe Dog', 'Phil Knight', 402, true)
myLibrary.push(book)
book = new Book('Killing the witches', "Bill O'Reily", 293, true)
myLibrary.push(book)

// whenever we change the database, we run this function to update the
// library section of the screen with the changes
function refreshLibrary() {
    library.innerHTML = ''

    myLibrary.forEach( (book, index) => {
        let readNotRead = book.read ? 'Read' : 'Not read'
        // we create a new div to hold the card
        let cardDiv = document.createElement('div')
        cardDiv.className = 'book-card'
        cardDiv.setAttribute('data-index', index)
        // then we create the card elements that we add to the card
        let card = `<div class='title'><h4>"${book.title}"</h4><button class='delete'>X</button></div>
        <table>
            <tr>
                <td>Author:</td>
                <td>${book.author}</td>
            </tr>
            <tr>
                <td>Pages:</td>
                <td>${book.pages}</td>
            </tr>
            <tr>
                <td><button class='status'>Status</button></td>
                <td>${readNotRead}</td>
            </tr>
        </table>`
        cardDiv.innerHTML = card //add the elements to the new card div
        library.appendChild(cardDiv) //then add to our index html
    })
    
    // I could not get it working with adding the addEventListeners in the loop above. so i added these two extra loops to add the addEventListeners after the fact
    const deleteCard = document.querySelectorAll('.delete')
    for (card of deleteCard) {
        card.addEventListener('click', (e) => {
            removeCard(e)
        })
    }
    const statusButtons = document.querySelectorAll('.status')
    for (button of statusButtons) {
        button.addEventListener('click', (e) => {
            changeReadStatus(e)
        })
    }
}

// executed when the save button is pushed to add a new book
function addBookToLibrary(e) {
    e.preventDefault()
    let read
    console.log(document.forms[0])
    let radios = document.querySelectorAll("input[name='read-notread']")
    console.log(radios)
    radios.forEach((radio) => {
        if (radio.checked) {
            read = radio.value
            read = (read === 'true')
        }
    })
    console.log(read)
    book = new Book(document.forms[0][0].value, 
                    document.forms[0][1].value,
                    document.forms[0][2].value, 
                    read)
    console.log(book)
    myLibrary.push(book)
    sideBar.removeChild(sideBar.lastChild)   
    refreshLibrary()
}


function changeReadStatus(e) {
    let index = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute('data-index')
    myLibrary[index].read ? myLibrary[index].read = false : myLibrary[index].read = true
    refreshLibrary()
}

// to delete a book from the database
function removeCard(e) {
    let index = e.target.parentElement.parentElement.getAttribute('data-index')
    myLibrary.splice(index, 1)
    refreshLibrary()
}

// this function gets executed when the add book button is pushed. It creates the whole html for the form and displays it in the sideBar
function enterForm() {
    const addBookForm = document.createElement('div')
    let formHTML = `<form action="">
                        <label for="title">Title</label>
                        <input id="title" type="text" focus>
                        <label for="author">Author</label>
                        <input id="author" type="text">
                        <label for="pages">Number of Pages</label>
                        <input id="pages" type="text">
                        <div class="radio">
                            <div>
                                <input id="read" name="read-notread" type="radio" value=true>
                                <label for="read">Read</label><br>
                            </div>
                            <div>
                                <input id="not-read" type="radio" name="read-notread" value=false>
                                <label for="not-read">Not read</label>
                            </div>  
                        </div>
                        <button class="save">Save</button>
                    </form>`
    addBookForm.innerHTML   = formHTML
    sideBar.appendChild(addBookForm)
}

refreshLibrary()



