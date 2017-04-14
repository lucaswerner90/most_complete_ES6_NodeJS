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

/**
Class containing all the necessary methods to run the app
*/
var MainClass = function () {
  /**
  @constructor
  @param {Object} settings_object - Contains the main HTML elements used
  */
  function MainClass(settings_object) {
    var _this = this;

    _classCallCheck(this, MainClass);

    this._host = 'https://shielded-peak-27861.herokuapp.com';

    this._urls_data = {
      init_data: { url: this._host + '/api/books', method: 'GET' },
      title: { url: this._host + '/api/books/title', method: 'POST', body: { title: "" } },
      olid: { url: this._host + '/api/books/OLID', method: 'POST', body: { OLID: "" } }
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
        console.error(error);
        return;
      }
      _this._paintBooks(data);
    });
  }

  /**
  Check if the passed olid is valid or not
  @param {String} olid - Contains the OLID value to be verified
  @return {boolean} If the OLID is valid or not.
  */

  _createClass(MainClass, [{
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
            className: "padding_box"
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
            className: "btn button_add",
            innerHTML: 'Add to cart'
          }));

          var box_book = _self._createElement('div', {
            className: "book col-lg-4 col-md-4 col-sm-6 col-xs-12"
          });

          box_book.appendChild(div_book);

          container.appendChild(box_book);
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

  return MainClass;
}();

var APP = new MainClass({
  button: document.getElementById('send'),
  input: document.getElementById('query'),
  list_of_books: document.getElementById('list_books')
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0VBOzs7SSxBQUdNLHdCQUNKO0FBSUE7Ozs7cUJBQUEsQUFBWSxpQkFBZ0I7Z0JBQUE7OzBCQUUxQjs7U0FBQSxBQUFLLFFBQUwsQUFBVyxBQUVYOztTQUFBLEFBQUs7aUJBQ08sRUFBQyxLQUFJLEtBQUEsQUFBSyxRQUFWLEFBQWdCLGNBQWEsUUFEekIsQUFDSixBQUFvQyxBQUM5QzthQUFNLEVBQUMsS0FBSSxLQUFBLEFBQUssUUFBVixBQUFnQixvQkFBbUIsUUFBbkMsQUFBMEMsUUFBTyxNQUFLLEVBQUMsT0FGL0MsQUFFUixBQUFzRCxBQUFPLEFBQ25FO1lBQUssRUFBQyxLQUFJLEtBQUEsQUFBSyxRQUFWLEFBQWdCLG1CQUFrQixRQUFsQyxBQUF5QyxRQUFPLE1BQUssRUFBQyxNQUg3RCxBQUFnQixBQUdULEFBQXFELEFBQU0sQUFHbEU7QUFOZ0IsQUFDZDs7U0FLRixBQUFLLGNBQVksZ0JBQWpCLEFBQWlDLEFBQ2pDO1NBQUEsQUFBSyxVQUFRLGdCQUFiLEFBQTZCLEFBQzdCO1NBQUEsQUFBSyxTQUFPLGdCQUFaLEFBQTRCLEFBRTVCOztBQUNBO1NBQUEsQUFBSyxlQUFMLEFBQWtCLEFBRWxCOztTQUFBLEFBQUssUUFBTCxBQUFhLGlCQUFiLEFBQThCLFNBQVEsVUFBQSxBQUFDLEdBQUksQUFDekM7UUFBQSxBQUFFLEFBQ0Y7WUFBQSxBQUFLLFVBQVUsTUFBQSxBQUFLLE9BQXBCLEFBQTJCLEFBQzVCO0FBSEQsQUFNQTs7U0FBQSxBQUFLLFVBQVUsS0FBQSxBQUFLLFdBQXBCLEFBQStCLFdBQVUsVUFBQSxBQUFDLE9BQUQsQUFBTyxNQUFPLEFBQ3JEO1VBQUEsQUFBRyxPQUFNLEFBQ1A7Z0JBQUEsQUFBUSxNQUFSLEFBQWMsQUFDZDtBQUNEO0FBQ0Q7WUFBQSxB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TyxBQUV0Qzs7WUFBQSxBQUFNLFVBQU4sQUFBZ0IsWUFBVyxVQUFBLEFBQUMsT0FBRCxBQUFPLE1BQU8sQUFDdkM7WUFBQSxBQUFHLE9BQU0sQUFDUDtpQkFBQSxBQUFLLEFBQ047QUFDRDtjQUFBLEFBQU0sWUFBTixBQUFrQixBQUNsQjtlQUFBLEFBQU8sQUFDUjtBQU5ELEFBT0Q7Ozs7OEIsQUFJUyxTLEFBQVEsSUFBRyxBQUNuQjtVQUFHLFFBQUEsQUFBUSxXQUFYLEFBQW9CLFFBQU8sQUFDekI7Z0JBQUEsQUFBUSxVQUFRLEVBQUMsZ0JBQWpCLEFBQWdCLEFBQWdCLEFBQ2pDO0FBQ0Q7WUFBTSxRQUFOLEFBQWMsS0FBZCxBQUFrQixTQUFsQixBQUNDLEtBQUssVUFBQSxBQUFDLFVBQVksQUFDakI7ZUFBTyxTQUFQLEFBQU8sQUFBUyxBQUNqQjtBQUhELFNBQUEsQUFJQyxLQUFLLFVBQUEsQUFBQyxVQUFXLEFBQ2hCO1dBQUEsQUFBRyxXQUFILEFBQWEsQUFDZDtBQU5ELFNBQUEsQUFPQyxNQUFNLFVBQUEsQUFBQyxPQUFRLEFBQ2Q7V0FBQSxBQUFHLE9BQUgsQUFBUyxBQUNWO0FBVEQsQUFVRDs7Ozs7OztBQUtILElBQU0sVUFBSSxBQUFJO1VBQ0wsU0FBQSxBQUFTLGVBRE0sQUFDZixBQUF3QixBQUMvQjtTQUFNLFNBQUEsQUFBUyxlQUZPLEFBRWhCLEFBQXdCLEFBQzlCO2lCQUFjLFNBQUEsQUFBUyxlQUh6QixBQUFVLEFBQWMsQUFHUixBQUF3QjtBQUhoQixBQUN0QixDQURRIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxuXG4vKipcbkNsYXNzIGNvbnRhaW5pbmcgYWxsIHRoZSBuZWNlc3NhcnkgbWV0aG9kcyB0byBydW4gdGhlIGFwcFxuKi9cbmNsYXNzIE1haW5DbGFzc3tcbiAgLyoqXG4gIEBjb25zdHJ1Y3RvclxuICBAcGFyYW0ge09iamVjdH0gc2V0dGluZ3Nfb2JqZWN0IC0gQ29udGFpbnMgdGhlIG1haW4gSFRNTCBlbGVtZW50cyB1c2VkXG4gICovXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzX29iamVjdCl7XG5cbiAgICB0aGlzLl9ob3N0PSdodHRwczovL3NoaWVsZGVkLXBlYWstMjc4NjEuaGVyb2t1YXBwLmNvbSc7XG5cbiAgICB0aGlzLl91cmxzX2RhdGE9e1xuICAgICAgaW5pdF9kYXRhOnt1cmw6dGhpcy5faG9zdCsnL2FwaS9ib29rcycsbWV0aG9kOidHRVQnfSxcbiAgICAgIHRpdGxlOnt1cmw6dGhpcy5faG9zdCsnL2FwaS9ib29rcy90aXRsZScsbWV0aG9kOidQT1NUJyxib2R5Ont0aXRsZTpcIlwifX0sXG4gICAgICBvbGlkOnt1cmw6dGhpcy5faG9zdCsnL2FwaS9ib29rcy9PTElEJyxtZXRob2Q6J1BPU1QnLGJvZHk6e09MSUQ6XCJcIn19XG4gICAgfVxuXG4gICAgdGhpcy5fbGlzdF9ib29rcz1zZXR0aW5nc19vYmplY3QubGlzdF9vZl9ib29rcztcbiAgICB0aGlzLl9idXR0b249c2V0dGluZ3Nfb2JqZWN0LmJ1dHRvbjtcbiAgICB0aGlzLl9pbnB1dD1zZXR0aW5nc19vYmplY3QuaW5wdXQ7XG5cbiAgICAvL0ZvciB0ZXN0IHB1cnBvc3Nlc1xuICAgIHRoaXMuX2xhc3Rfc2VhcmNoPVwiXCI7XG5cbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kUXVlcnkodGhpcy5faW5wdXQudmFsdWUpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLl9sb2FkRGF0YSh0aGlzLl91cmxzX2RhdGEuaW5pdF9kYXRhLChlcnJvcixkYXRhKT0+e1xuICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fcGFpbnRCb29rcyhkYXRhKTtcbiAgICB9KTtcblxuXG4gIH1cblxuICAvKipcbiAgQ2hlY2sgaWYgdGhlIHBhc3NlZCBvbGlkIGlzIHZhbGlkIG9yIG5vdFxuICBAcGFyYW0ge1N0cmluZ30gb2xpZCAtIENvbnRhaW5zIHRoZSBPTElEIHZhbHVlIHRvIGJlIHZlcmlmaWVkXG4gIEByZXR1cm4ge2Jvb2xlYW59IElmIHRoZSBPTElEIGlzIHZhbGlkIG9yIG5vdC5cbiAgKi9cbiAgX2NoZWNrT0xJRFZhbGlkaXR5KG9saWQpe1xuICAgIGNvbnN0IHJlZ2V4cD0vXihPTCkoXFxkKSsoTSkkLztcbiAgICByZXR1cm4gcmVnZXhwLnRlc3Qob2xpZCk7XG4gIH1cblxuICBfcmVtb3ZlQm9va3MoY29udGFpbmVyX2Jvb2tzKXtcbiAgICB3aGlsZSAoY29udGFpbmVyX2Jvb2tzLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGNvbnRhaW5lcl9ib29rcy5yZW1vdmVDaGlsZChjb250YWluZXJfYm9va3MuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9XG5cblxuXG4gIF9jcmVhdGVFbGVtZW50KGVsZW1lbnQscHJvcHMpe1xuICAgIGxldCBlbGVtPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICBlbGVtW3Byb3BdPXByb3BzW3Byb3BdO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbTtcbiAgfVxuXG5cblxuICBfcGFpbnRCb29rcyhib29rcyl7XG5cbiAgICBpZihib29rcy5sZW5ndGgpe1xuXG4gICAgICBjb25zdCBfc2VsZj10aGlzO1xuXG4gICAgICBsZXQgY29udGFpbmVyPV9zZWxmLl9saXN0X2Jvb2tzO1xuXG4gICAgICBfc2VsZi5fcmVtb3ZlQm9va3MoY29udGFpbmVyKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBib29rcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBib29rPWJvb2tzW2ldO1xuXG5cblxuXG4gICAgICAgIGNvbnN0IGRpdl9ib29rPV9zZWxmLl9jcmVhdGVFbGVtZW50KCdkaXYnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJwYWRkaW5nX2JveFwiXG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgnaW1nJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwiaW1hZ2VfYm9va1wiLFxuICAgICAgICAgIHNyYzpib29rLmNvdmVyLmxhcmdlIHx8IGJvb2suY292ZXIubWVkaXVtIHx8IGJvb2suY292ZXIuc21hbGxcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdwJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwidGl0bGVcIixcbiAgICAgICAgICBpbm5lckhUTUw6Ym9vay50aXRsZVxuICAgICAgICB9KSk7XG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImJ5X3N0YXRlbWVudFwiLFxuICAgICAgICAgIGlubmVySFRNTDpgQnkgJHtib29rLmF1dGhvcnNbMF0ubmFtZX1gXG4gICAgICAgIH0pKTtcblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdwJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwiZGVzY3JpcHRpb25cIixcbiAgICAgICAgICBpbm5lckhUTUw6YExvcmVtIGlwc3VtLi4uLmBcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ3AnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJwcmljZVwiLFxuICAgICAgICAgIGlubmVySFRNTDpgJDI0Ljk5YFxuICAgICAgICB9KSk7XG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgnYnV0dG9uJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwiYnRuIGJ1dHRvbl9hZGRcIixcbiAgICAgICAgICBpbm5lckhUTUw6YEFkZCB0byBjYXJ0YFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgY29uc3QgYm94X2Jvb2s9X3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2Rpdicse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImJvb2sgY29sLWxnLTQgY29sLW1kLTQgY29sLXNtLTYgY29sLXhzLTEyXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYm94X2Jvb2suYXBwZW5kQ2hpbGQoZGl2X2Jvb2spO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib3hfYm9vayk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgfVxuXG4gIHNlbmRRdWVyeShpbnB1dCl7XG4gICAgY29uc3QgX3NlbGY9dGhpcztcblxuICAgIGxldCBraW5kX2lucHV0PXt9O1xuICAgIGlmKF9zZWxmLl9jaGVja09MSURWYWxpZGl0eShpbnB1dCkpe1xuICAgICAga2luZF9pbnB1dD1fc2VsZi5fdXJsc19kYXRhLm9saWQ7XG4gICAgICBfc2VsZi5fbGFzdF9zZWFyY2g9XCJPTElEXCI7XG4gICAgfWVsc2V7XG4gICAgICBraW5kX2lucHV0PV9zZWxmLl91cmxzX2RhdGEudGl0bGU7XG4gICAgICBfc2VsZi5fbGFzdF9zZWFyY2g9XCJ0aXRsZVwiO1xuICAgIH1cblxuICAgIGtpbmRfaW5wdXQuYm9keT1KU09OLnN0cmluZ2lmeSh7cXVlcnk6aW5wdXR9KTtcblxuICAgIF9zZWxmLl9sb2FkRGF0YShraW5kX2lucHV0LChlcnJvcixkYXRhKT0+e1xuICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICBkYXRhPVtdO1xuICAgICAgfVxuICAgICAgX3NlbGYuX3BhaW50Qm9va3MoZGF0YSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9KVxuICB9XG5cblxuXG4gIF9sb2FkRGF0YShvcHRpb25zLGNiKXtcbiAgICBpZihvcHRpb25zLm1ldGhvZD09PSdQT1NUJyl7XG4gICAgICBvcHRpb25zLmhlYWRlcnM9e1wiQ29udGVudC1UeXBlXCI6XCJhcHBsaWNhdGlvbi9qc29uXCJ9O1xuICAgIH1cbiAgICBmZXRjaChvcHRpb25zLnVybCxvcHRpb25zKVxuICAgIC50aGVuKChyZXNwb25zZSk9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKT0+e1xuICAgICAgY2IodW5kZWZpbmVkLHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpPT57XG4gICAgICBjYihlcnJvcix1bmRlZmluZWQpO1xuICAgIH0pXG4gIH1cblxufVxuXG5cbmNvbnN0IEFQUD1uZXcgTWFpbkNsYXNzKHtcbiAgYnV0dG9uOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kJyksXG4gIGlucHV0OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeScpLFxuICBsaXN0X29mX2Jvb2tzOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0X2Jvb2tzJylcbn0pO1xuIl19
