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
    },
    filters: {
      filter: '.filters',
    }        
  };

  const className = {
    bookCart: 'favorite',
    hiddenBook: 'hidden'
  };

  const favoriteBooks = [];
  const filters = [];

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
    const filterBooks = document.querySelector(select.filters.filter);

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
    
    filterBooks.addEventListener('click', function(event) {      

      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        const filterName = event.target.value,
          index = filters.indexOf(filterName);

        (event.target.checked) ? filters.push(filterName) : filters.splice(index, 1);       
      }

      window.filterBooks();
    });

  }

  function filterBooks() {
    const books = dataSource.books;
    
    
    for (let book of books) {
      let shouldBeHidden = false;
      const bookImage = document.querySelector('.book__image[data-id="'+ book.id + '"]');

      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      (shouldBeHidden) ? bookImage.classList.add(className.hiddenBook) : bookImage.classList.remove(className.hiddenBook);      
    }

  }

  render();
  initActions();

}