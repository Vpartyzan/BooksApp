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

                let id = bookImage.getAttribute('data-id');
                
                if (favoriteBooks.length < 1) {
                    bookImage.classList.add(className.bookCart);
                    favoriteBooks.push(bookImage.getAttribute('data-id'));
                } else {                        
                    if (favoriteBooks.find( el => el == id)) {                            
                        const index = favoriteBooks.indexOf(id);

                        favoriteBooks.splice(index, 1);
                        bookImage.classList.remove(className.bookCart);
                    } else {
                        bookImage.classList.add(className.bookCart);
                        favoriteBooks.push(bookImage.getAttribute('data-id'));
                    }
                } 
                                
            })
        }
    }

    render();
    initActions();

}