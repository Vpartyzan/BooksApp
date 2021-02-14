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

    render();

}