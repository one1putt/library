function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false
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