{
    'use strict';

    const select = {
        templateOf:{
          bookCart: '#template-book',
        },
        containerOf: {
          booksList: '.books-list',
        },
        bookItem: {
          image: '.book__image',
        }        
      }

    const className = {
        bookCart: 'favorite'
    }

    const favoriteBooks = [];

    function render() {
        const books = dataSource.books;        

        for (let book of books) {    
            const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
                generatedHTML = bookTemplate(book),            
                generatedDOM = utils.createDOMFromHTML(generatedHTML),
                bookContainer = document.querySelector(select.containerOf.booksList);

            bookContainer.appendChild(generatedDOM);           
        }        
    }

    function initActions() {
        const bookList = document.querySelector(select.containerOf.booksList),
            bookImages = bookList.querySelectorAll(select.bookItem.image);
            

        for (let bookImage of bookImages) {            
            bookImage.addEventListener('dblclick', function(event) {
                event.preventDefault();

                bookImage.classList.add(className.bookCart);
                favoriteBooks.push(bookImage.getAttribute('data-id'));                
            })
        }
    }

    render();
    initActions();

}