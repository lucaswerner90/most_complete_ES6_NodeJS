
// I'm using the new ES6 features, which I consider a good improvement for JS.
// This code is compiled after to ES5 through the gulpfile.

// Here is the main class of the application
class VendigoBookStore{
  constructor(settings_object){

    this._urls_data={
      init_data:{url:'http://localhost:7000/api/books',method:'GET'},
      title:{url:'http://localhost:7000/api/books/title',method:'POST',body:{title:""}},
      olid:{url:'http://localhost:7000/api/books/OLID',method:'POST',body:{OLID:""}}
    }

    this._list_books=settings_object.list_of_books;
    this._button=settings_object.button;
    this._input=settings_object.input;

    //For test purposses
    this._last_search="";

    this._button.addEventListener('click',(e)=>{
      e.preventDefault();
      this.sendQuery(this._input.value);
    });


    this._loadData(this._urls_data.init_data,(error,data)=>{
      if(error){
        return;
      }
      this._paintBooks(data);
    });


  }


  _checkOLIDValidity(olid){
    const regexp=/^(OL)(\d)+(M)$/;
    return regexp.test(olid);
  }

  _removeBooks(container_books){
    while (container_books.firstChild) {
      container_books.removeChild(container_books.firstChild);
    }
  }



  _createElement(element,props){
    let elem=document.createElement(element);
    for (let prop in props) {
        elem[prop]=props[prop];
    }
    return elem;
  }



  _paintBooks(books){

    if(books.length){

      const _self=this;

      let container=_self._list_books;

      _self._removeBooks(container);

      for (let i = 0; i < books.length; i++) {
        const book=books[i];


        const div_book=_self._createElement('div',{
          className:"book col-lg-3 col-md-3 col-sm-3 col-xs-3"
        });

        div_book.appendChild(_self._createElement('img',{
          className:"image_book",
          src:book.cover.large || book.cover.medium || book.cover.small
        }));

        div_book.appendChild(_self._createElement('p',{
          className:"title",
          innerHTML:book.title
        }));


        div_book.appendChild(_self._createElement('p',{
          className:"by_statement",
          innerHTML:`By ${book.authors[0].name}`
        }));


        div_book.appendChild(_self._createElement('p',{
          className:"description",
          innerHTML:`Lorem ipsum....`
        }));


        div_book.appendChild(_self._createElement('p',{
          className:"price",
          innerHTML:`$24.99`
        }));


        div_book.appendChild(_self._createElement('button',{
          className:"button_add",
          innerHTML:`Add to cart`
        }));

        container.appendChild(div_book);
      }
    }


  }

  sendQuery(input){
    const _self=this;

    let kind_input={};
    if(_self._checkOLIDValidity(input)){
      kind_input=_self._urls_data.olid;
      _self._last_search="OLID";
    }else{
      kind_input=_self._urls_data.title;
      _self._last_search="title";
    }

    kind_input.body=JSON.stringify({query:input});

    _self._loadData(kind_input,(error,data)=>{
      if(error){
        data=[];
      }
      _self._paintBooks(data);
      return data;
    })
  }



  _loadData(options,cb){
    if(options.method==='POST'){
      options.headers={"Content-Type":"application/json"};
    }
    fetch(options.url,options)
    .then((response)=> {
      return response.json();
    })
    .then((response)=>{
      cb(undefined,response);
    })
    .catch((error)=>{
      cb(error,undefined);
    })
  }

}


const APP=new VendigoBookStore({
  button:document.getElementById('send'),
  input:document.getElementById('query'),
  list_of_books:document.getElementById('list_books')
});
