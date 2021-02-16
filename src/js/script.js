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

  class Books {
    constructor(element) {
        const thisBooks = this;

        thisBooks.filters = [];

        thisBooks.initData();
        thisBooks.getElements();
        thisBooks.initActions();

    }

    initData() {
        const thisBooks = this;

        thisBooks.data = dataSource.books;

        for (let book of thisBooks.data) {    
            book.ratingBgc = thisBooks.determineRatingBgc(book.rating);
            book.ratingWidth = book.rating * 10;
      
            const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML),
              generatedHTML = bookTemplate(book),            
              generatedDOM = utils.createDOMFromHTML(generatedHTML),
              bookContainer = document.querySelector(select.containerOf.booksList);
      
            bookContainer.appendChild(generatedDOM);           
          } 
    }

    getElements() {
        const thisBooks = this;

        thisBooks.bookList = document.querySelector(select.containerOf.booksList);
        thisBooks.filterBook = document.querySelector(select.filters.filter);
    }

    initActions() {
        const thisBooks = this;
        
        const favoriteBooks = [];

        thisBooks.bookList.addEventListener('dblclick', function(event) {
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

        thisBooks.filterBook.addEventListener('click', function(event) {      

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
            const filterName = event.target.value,
            index = thisBooks.filters.indexOf(filterName);

            (event.target.checked) ? thisBooks.filters.push(filterName) : thisBooks.filters.splice(index, 1);       
        }

        thisBooks.filterBooks();
        });            
    }

    filterBooks() {
        const thisBooks = this;
        
        
        for (let book of thisBooks.data) {
          let shouldBeHidden = false;
          const bookImage = document.querySelector('.book__image[data-id="'+ book.id + '"]');
    
          for (let filter of thisBooks.filters) {
            if (!book.details[filter]) {
              shouldBeHidden = true;
              break;
            }
          }
    
          (shouldBeHidden) ? bookImage.classList.add(className.hiddenBook) : bookImage.classList.remove(className.hiddenBook);      
        }
    }

    determineRatingBgc(rating) {
        return (rating < 6) ? "linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)"
                  : (rating > 6 && rating <= 8) ? "linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)"
                  : (rating > 8 && rating <= 9) ? "linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)"
                  : "linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)";
    }
  }

  const app = new Books();  
  
}