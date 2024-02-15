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

const myLibrary = []

let book = new Book('Catch-22', 'Joseph Heller', 453, false)
myLibrary.push(book)
book = new Book('Shoe Dog', 'Phil Knight', 402, true)
myLibrary.push(book)
book = new Book('Killing the witches', "Bill O'Reily", 293, true)
myLibrary.push(book)

function addBookToLibrary(e) {
    e.preventDefault()
    book = new Book(document.forms[0][0].value, 
                    document.forms[0][1].value,
                    document.forms[0][2].value, 
                    document.forms[0][3].value)
    myLibrary.push(book)
    sideBar.removeChild(sideBar.lastChild)   
    refreshLibrary()
}

const library = document.querySelector('.library')

function refreshLibrary() {
    library.innerHTML = ''

    myLibrary.forEach( (book, index) => {
        let readNotRead = book.read ? 'read' : 'not read'
        let cardDiv = document.createElement('div')
        cardDiv.className = 'book-card'
        cardDiv.setAttribute('data-index', index)
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
                <td>read?</td>
                <td>${readNotRead}</td>
            </tr>
        </table>`
        cardDiv.innerHTML = card
        library.appendChild(cardDiv)
    })
    const deleteCard = document.querySelectorAll('.delete')
    for (card of deleteCard) {
        card.addEventListener('click', (e) => {
            removeCard(e)
        })
    }
}

function removeCard(e) {
    console.log(myLibrary)
    let index = e.target.parentElement.parentElement.getAttribute('data-index')
    myLibrary.splice(index, 1)
    console.log(myLibrary)
    refreshLibrary()
}

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
                                <input id="read" name="read-notread" type="radio" value="true">
                                <label for="read">Read</label><br>
                            </div>
                            <div>
                                <input id="not-read" type="radio" name="read-notread" value="false">
                                <label for="not-read">Not read</label>
                            </div>  
                        </div>
                        <button class="save">Save</button>
                    </form>`
    addBookForm.innerHTML   = formHTML
    sideBar.appendChild(addBookForm)
}

const addButton = document.querySelector('.add-book')
const sideBar = document.querySelector('.side-bar')
addButton.addEventListener('click', enterForm)
sideBar.addEventListener('submit', (e) => addBookToLibrary(e))
refreshLibrary()



