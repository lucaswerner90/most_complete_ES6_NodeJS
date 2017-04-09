(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// I'm using the new ES6 features, which I consider a good improvement for JS.
// This code is compiled after to ES5 through the gulpfile.

// Here is the main class of the application
var VendigoBookStore = function () {
  function VendigoBookStore(settings_object) {
    var _this = this;

    _classCallCheck(this, VendigoBookStore);

    this._urls_data = {
      init_data: { url: 'http://localhost:4000/api/books', method: 'GET' },
      title: { url: 'http://localhost:4000/api/books/title', method: 'POST', body: { title: "" } },
      olid: { url: 'http://localhost:4000/api/books/OLID', method: 'POST', body: { OLID: "" } }
    };

    this._list_books = settings_object.list_of_books;
    this._button = settings_object.button;
    this._input = settings_object.input;

    //For test purposses
    this._last_search = "";

    this._button.addEventListener('click', function (e) {
      e.preventDefault();
      _this.sendQuery(_this._input.value);
    });

    this._loadData(this._urls_data.init_data, function (error, data) {
      if (error) {
        return;
      }
      _this._paintBooks(data);
    });
  }

  _createClass(VendigoBookStore, [{
    key: '_checkOLIDValidity',
    value: function _checkOLIDValidity(olid) {
      var regexp = /^(OL)(\d)+(M)$/;
      return regexp.test(olid);
    }
  }, {
    key: '_removeBooks',
    value: function _removeBooks(container_books) {
      while (container_books.firstChild) {
        container_books.removeChild(container_books.firstChild);
      }
    }
  }, {
    key: '_createElement',
    value: function _createElement(element, props) {
      var elem = document.createElement(element);
      for (var prop in props) {
        elem[prop] = props[prop];
      }
      return elem;
    }
  }, {
    key: '_paintBooks',
    value: function _paintBooks(books) {

      if (books.length) {

        var _self = this;

        var container = _self._list_books;

        _self._removeBooks(container);

        for (var i = 0; i < books.length; i++) {
          var book = books[i];

          var div_book = _self._createElement('div', {
            className: "book col-lg-3 col-md-3 col-sm-3 col-xs-3"
          });

          div_book.appendChild(_self._createElement('img', {
            className: "image_book",
            src: book.cover.large || book.cover.medium || book.cover.small
          }));

          div_book.appendChild(_self._createElement('p', {
            className: "title",
            innerHTML: book.title
          }));

          div_book.appendChild(_self._createElement('p', {
            className: "by_statement",
            innerHTML: 'By ' + book.authors[0].name
          }));

          div_book.appendChild(_self._createElement('p', {
            className: "description",
            innerHTML: 'Lorem ipsum....'
          }));

          div_book.appendChild(_self._createElement('p', {
            className: "price",
            innerHTML: '$24.99'
          }));

          div_book.appendChild(_self._createElement('button', {
            className: "button_add",
            innerHTML: 'Add to cart'
          }));

          container.appendChild(div_book);
        }
      }
    }
  }, {
    key: 'sendQuery',
    value: function sendQuery(input) {
      var _self = this;

      var kind_input = {};
      if (_self._checkOLIDValidity(input)) {
        kind_input = _self._urls_data.olid;
        _self._last_search = "OLID";
      } else {
        kind_input = _self._urls_data.title;
        _self._last_search = "title";
      }

      kind_input.body = JSON.stringify({ query: input });

      _self._loadData(kind_input, function (error, data) {
        if (error) {
          data = [];
        }
        _self._paintBooks(data);
        return data;
      });
    }
  }, {
    key: '_loadData',
    value: function _loadData(options, cb) {
      if (options.method === 'POST') {
        options.headers = { "Content-Type": "application/json" };
      }
      fetch(options.url, options).then(function (response) {
        return response.json();
      }).then(function (response) {
        cb(undefined, response);
      }).catch(function (error) {
        cb(error, undefined);
      });
    }
  }]);

  return VendigoBookStore;
}();

var APP = new VendigoBookStore({
  button: document.getElementById('send'),
  input: document.getElementById('query'),
  list_of_books: document.getElementById('list_books')
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7O0FBRUE7SSxBQUNNLCtCQUNKOzRCQUFBLEFBQVksaUJBQWdCO2dCQUFBOzswQkFFMUI7O1NBQUEsQUFBSztpQkFDTyxFQUFDLEtBQUQsQUFBSyxtQ0FBa0MsUUFEbkMsQUFDSixBQUE4QyxBQUN4RDthQUFNLEVBQUMsS0FBRCxBQUFLLHlDQUF3QyxRQUE3QyxBQUFvRCxRQUFPLE1BQUssRUFBQyxPQUZ6RCxBQUVSLEFBQWdFLEFBQU8sQUFDN0U7WUFBSyxFQUFDLEtBQUQsQUFBSyx3Q0FBdUMsUUFBNUMsQUFBbUQsUUFBTyxNQUFLLEVBQUMsTUFIdkUsQUFBZ0IsQUFHVCxBQUErRCxBQUFNLEFBRzVFO0FBTmdCLEFBQ2Q7O1NBS0YsQUFBSyxjQUFZLGdCQUFqQixBQUFpQyxBQUNqQztTQUFBLEFBQUssVUFBUSxnQkFBYixBQUE2QixBQUM3QjtTQUFBLEFBQUssU0FBTyxnQkFBWixBQUE0QixBQUU1Qjs7QUFDQTtTQUFBLEFBQUssZUFBTCxBQUFrQixBQUVsQjs7U0FBQSxBQUFLLFFBQUwsQUFBYSxpQkFBYixBQUE4QixTQUFRLFVBQUEsQUFBQyxHQUFJLEFBQ3pDO1FBQUEsQUFBRSxBQUNGO1lBQUEsQUFBSyxVQUFVLE1BQUEsQUFBSyxPQUFwQixBQUEyQixBQUM1QjtBQUhELEFBTUE7O1NBQUEsQUFBSyxVQUFVLEtBQUEsQUFBSyxXQUFwQixBQUErQixXQUFVLFVBQUEsQUFBQyxPQUFELEFBQU8sTUFBTyxBQUNyRDtVQUFBLEFBQUcsT0FBTSxBQUNQO0FBQ0Q7QUFDRDtZQUFBLEFBQUssWUFBTCxBQUFpQixBQUNsQjtBQUxELEFBUUQ7Ozs7O3VDLEFBR2tCLE1BQUssQUFDdEI7VUFBTSxTQUFOLEFBQWEsQUFDYjthQUFPLE9BQUEsQUFBTyxLQUFkLEFB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QUFvQixRQUFPLEFBQ3pCO2dCQUFBLEFBQVEsVUFBUSxFQUFDLGdCQUFqQixBQUFnQixBQUFnQixBQUNqQztBQUNEO1lBQU0sUUFBTixBQUFjLEtBQWQsQUFBa0IsU0FBbEIsQUFDQyxLQUFLLFVBQUEsQUFBQyxVQUFZLEFBQ2pCO2VBQU8sU0FBUCxBQUFPLEFBQVMsQUFDakI7QUFIRCxTQUFBLEFBSUMsS0FBSyxVQUFBLEFBQUMsVUFBVyxBQUNoQjtXQUFBLEFBQUcsV0FBSCxBQUFhLEFBQ2Q7QUFORCxTQUFBLEFBT0MsTUFBTSxVQUFBLEFBQUMsT0FBUSxBQUNkO1dBQUEsQUFBRyxPQUFILEFBQVMsQUFDVjtBQVRELEFBVUQ7Ozs7Ozs7QUFLSCxJQUFNLFVBQUksQUFBSTtVQUNMLFNBQUEsQUFBUyxlQURhLEFBQ3RCLEFBQXdCLEFBQy9CO1NBQU0sU0FBQSxBQUFTLGVBRmMsQUFFdkIsQUFBd0IsQUFDOUI7aUJBQWMsU0FBQSxBQUFTLGVBSHpCLEFBQVUsQUFBcUIsQUFHZixBQUF3QjtBQUhULEFBQzdCLENBRFEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG4vLyBJJ20gdXNpbmcgdGhlIG5ldyBFUzYgZmVhdHVyZXMsIHdoaWNoIEkgY29uc2lkZXIgYSBnb29kIGltcHJvdmVtZW50IGZvciBKUy5cbi8vIFRoaXMgY29kZSBpcyBjb21waWxlZCBhZnRlciB0byBFUzUgdGhyb3VnaCB0aGUgZ3VscGZpbGUuXG5cbi8vIEhlcmUgaXMgdGhlIG1haW4gY2xhc3Mgb2YgdGhlIGFwcGxpY2F0aW9uXG5jbGFzcyBWZW5kaWdvQm9va1N0b3Jle1xuICBjb25zdHJ1Y3RvcihzZXR0aW5nc19vYmplY3Qpe1xuXG4gICAgdGhpcy5fdXJsc19kYXRhPXtcbiAgICAgIGluaXRfZGF0YTp7dXJsOidodHRwOi8vbG9jYWxob3N0OjQwMDAvYXBpL2Jvb2tzJyxtZXRob2Q6J0dFVCd9LFxuICAgICAgdGl0bGU6e3VybDonaHR0cDovL2xvY2FsaG9zdDo0MDAwL2FwaS9ib29rcy90aXRsZScsbWV0aG9kOidQT1NUJyxib2R5Ont0aXRsZTpcIlwifX0sXG4gICAgICBvbGlkOnt1cmw6J2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMC9hcGkvYm9va3MvT0xJRCcsbWV0aG9kOidQT1NUJyxib2R5OntPTElEOlwiXCJ9fVxuICAgIH1cblxuICAgIHRoaXMuX2xpc3RfYm9va3M9c2V0dGluZ3Nfb2JqZWN0Lmxpc3Rfb2ZfYm9va3M7XG4gICAgdGhpcy5fYnV0dG9uPXNldHRpbmdzX29iamVjdC5idXR0b247XG4gICAgdGhpcy5faW5wdXQ9c2V0dGluZ3Nfb2JqZWN0LmlucHV0O1xuXG4gICAgLy9Gb3IgdGVzdCBwdXJwb3NzZXNcbiAgICB0aGlzLl9sYXN0X3NlYXJjaD1cIlwiO1xuXG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSk9PntcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZFF1ZXJ5KHRoaXMuX2lucHV0LnZhbHVlKTtcbiAgICB9KTtcblxuXG4gICAgdGhpcy5fbG9hZERhdGEodGhpcy5fdXJsc19kYXRhLmluaXRfZGF0YSwoZXJyb3IsZGF0YSk9PntcbiAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fcGFpbnRCb29rcyhkYXRhKTtcbiAgICB9KTtcblxuXG4gIH1cblxuXG4gIF9jaGVja09MSURWYWxpZGl0eShvbGlkKXtcbiAgICBjb25zdCByZWdleHA9L14oT0wpKFxcZCkrKE0pJC87XG4gICAgcmV0dXJuIHJlZ2V4cC50ZXN0KG9saWQpO1xuICB9XG5cbiAgX3JlbW92ZUJvb2tzKGNvbnRhaW5lcl9ib29rcyl7XG4gICAgd2hpbGUgKGNvbnRhaW5lcl9ib29rcy5maXJzdENoaWxkKSB7XG4gICAgICBjb250YWluZXJfYm9va3MucmVtb3ZlQ2hpbGQoY29udGFpbmVyX2Jvb2tzLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG5cblxuICBfY3JlYXRlRWxlbWVudChlbGVtZW50LHByb3BzKXtcbiAgICBsZXQgZWxlbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgZWxlbVtwcm9wXT1wcm9wc1twcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW07XG4gIH1cblxuXG5cbiAgX3BhaW50Qm9va3MoYm9va3Mpe1xuXG4gICAgaWYoYm9va3MubGVuZ3RoKXtcblxuICAgICAgY29uc3QgX3NlbGY9dGhpcztcblxuICAgICAgbGV0IGNvbnRhaW5lcj1fc2VsZi5fbGlzdF9ib29rcztcblxuICAgICAgX3NlbGYuX3JlbW92ZUJvb2tzKGNvbnRhaW5lcik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9va3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYm9vaz1ib29rc1tpXTtcblxuXG4gICAgICAgIGNvbnN0IGRpdl9ib29rPV9zZWxmLl9jcmVhdGVFbGVtZW50KCdkaXYnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJib29rIGNvbC1sZy0zIGNvbC1tZC0zIGNvbC1zbS0zIGNvbC14cy0zXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2ltZycse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImltYWdlX2Jvb2tcIixcbiAgICAgICAgICBzcmM6Ym9vay5jb3Zlci5sYXJnZSB8fCBib29rLmNvdmVyLm1lZGl1bSB8fCBib29rLmNvdmVyLnNtYWxsXG4gICAgICAgIH0pKTtcblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcInRpdGxlXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmJvb2sudGl0bGVcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ3AnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJieV9zdGF0ZW1lbnRcIixcbiAgICAgICAgICBpbm5lckhUTUw6YEJ5ICR7Ym9vay5hdXRob3JzWzBdLm5hbWV9YFxuICAgICAgICB9KSk7XG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmBMb3JlbSBpcHN1bS4uLi5gXG4gICAgICAgIH0pKTtcblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdwJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwicHJpY2VcIixcbiAgICAgICAgICBpbm5lckhUTUw6YCQyNC45OWBcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImJ1dHRvbl9hZGRcIixcbiAgICAgICAgICBpbm5lckhUTUw6YEFkZCB0byBjYXJ0YFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpdl9ib29rKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICB9XG5cbiAgc2VuZFF1ZXJ5KGlucHV0KXtcbiAgICBjb25zdCBfc2VsZj10aGlzO1xuXG4gICAgbGV0IGtpbmRfaW5wdXQ9e307XG4gICAgaWYoX3NlbGYuX2NoZWNrT0xJRFZhbGlkaXR5KGlucHV0KSl7XG4gICAgICBraW5kX2lucHV0PV9zZWxmLl91cmxzX2RhdGEub2xpZDtcbiAgICAgIF9zZWxmLl9sYXN0X3NlYXJjaD1cIk9MSURcIjtcbiAgICB9ZWxzZXtcbiAgICAgIGtpbmRfaW5wdXQ9X3NlbGYuX3VybHNfZGF0YS50aXRsZTtcbiAgICAgIF9zZWxmLl9sYXN0X3NlYXJjaD1cInRpdGxlXCI7XG4gICAgfVxuXG4gICAga2luZF9pbnB1dC5ib2R5PUpTT04uc3RyaW5naWZ5KHtxdWVyeTppbnB1dH0pO1xuXG4gICAgX3NlbGYuX2xvYWREYXRhKGtpbmRfaW5wdXQsKGVycm9yLGRhdGEpPT57XG4gICAgICBpZihlcnJvcil7XG4gICAgICAgIGRhdGE9W107XG4gICAgICB9XG4gICAgICBfc2VsZi5fcGFpbnRCb29rcyhkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pXG4gIH1cblxuXG5cbiAgX2xvYWREYXRhKG9wdGlvbnMsY2Ipe1xuICAgIGlmKG9wdGlvbnMubWV0aG9kPT09J1BPU1QnKXtcbiAgICAgIG9wdGlvbnMuaGVhZGVycz17XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb25cIn07XG4gICAgfVxuICAgIGZldGNoKG9wdGlvbnMudXJsLG9wdGlvbnMpXG4gICAgLnRoZW4oKHJlc3BvbnNlKT0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICBjYih1bmRlZmluZWQscmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgIGNiKGVycm9yLHVuZGVmaW5lZCk7XG4gICAgfSlcbiAgfVxuXG59XG5cblxuY29uc3QgQVBQPW5ldyBWZW5kaWdvQm9va1N0b3JlKHtcbiAgYnV0dG9uOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kJyksXG4gIGlucHV0OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeScpLFxuICBsaXN0X29mX2Jvb2tzOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0X2Jvb2tzJylcbn0pO1xuIl19
