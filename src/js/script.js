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
  };

  const className = {
    bookCart: 'favorite'
  };

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
    const bookList = document.querySelector(select.containerOf.booksList);            

                
    bookList.addEventListener('dblclick', function(event) {
      event.preventDefault();

      if (event.target.offsetParent.classList.contains('book__image')) {        

        let id = event.target.offsetParent.getAttribute('data-id');
                  
        if (favoriteBooks.length < 1) {
          event.target.offsetParent.classList.add(className.bookCart);
          favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
        } else {                        
          if (favoriteBooks.find( el => el == id)) {                            
            const index = favoriteBooks.indexOf(id);

            favoriteBooks.splice(index, 1);
            event.target.offsetParent.classList.remove(className.bookCart);
          } else {
            event.target.offsetParent.classList.add(className.bookCart);
            favoriteBooks.push(event.target.offsetParent.getAttribute('data-id'));
          }
        } 
      }                        
    });    
  }

  render();
  initActions();

}