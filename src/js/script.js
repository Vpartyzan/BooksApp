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
      book.ratingBgc = determineRatingBgc(book.rating);
      book.ratingWidth = book.rating * 10;

      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
        generatedHTML = bookTemplate(book),            
        generatedDOM = utils.createDOMFromHTML(generatedHTML),
        bookContainer = document.querySelector(select.containerOf.booksList);

      bookContainer.appendChild(generatedDOM);           
    }        
  }

  function initActions() {
    const bookList = document.querySelector(select.containerOf.booksList);
    const filterBook = document.querySelector(select.filters.filter);

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
    
    filterBook.addEventListener('click', function(event) {      

      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        const filterName = event.target.value,
          index = filters.indexOf(filterName);

        (event.target.checked) ? filters.push(filterName) : filters.splice(index, 1);       
      }

      filterBooks();
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

  function determineRatingBgc(rating) {
    return (rating < 6) ? "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)"
              : (rating > 6 && rating <= 8) ? "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)"
              : (rating > 8 && rating <= 9) ? "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)"
              : "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
  }

  render();
  initActions();
  
  
}