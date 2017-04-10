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
      init_data: { url: 'http://localhost:7000/api/books', method: 'GET' },
      title: { url: 'http://localhost:7000/api/books/title', method: 'POST', body: { title: "" } },
      olid: { url: 'http://localhost:7000/api/books/OLID', method: 'POST', body: { OLID: "" } }
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

  return VendigoBookStore;
}();

var APP = new VendigoBookStore({
  button: document.getElementById('send'),
  input: document.getElementById('query'),
  list_of_books: document.getElementById('list_books')
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7O0FBRUE7SSxBQUNNLCtCQUNKOzRCQUFBLEFBQVksaUJBQWdCO2dCQUFBOzswQkFFMUI7O1NBQUEsQUFBSztpQkFDTyxFQUFDLEtBQUQsQUFBSyxtQ0FBa0MsUUFEbkMsQUFDSixBQUE4QyxBQUN4RDthQUFNLEVBQUMsS0FBRCxBQUFLLHlDQUF3QyxRQUE3QyxBQUFvRCxRQUFPLE1BQUssRUFBQyxPQUZ6RCxBQUVSLEFBQWdFLEFBQU8sQUFDN0U7WUFBSyxFQUFDLEtBQUQsQUFBSyx3Q0FBdUMsUUFBNUMsQUFBbUQsUUFBTyxNQUFLLEVBQUMsTUFIdkUsQUFBZ0IsQUFHVCxBQUErRCxBQUFNLEFBRzVFO0FBTmdCLEFBQ2Q7O1NBS0YsQUFBSyxjQUFZLGdCQUFqQixBQUFpQyxBQUNqQztTQUFBLEFBQUssVUFBUSxnQkFBYixBQUE2QixBQUM3QjtTQUFBLEFBQUssU0FBTyxnQkFBWixBQUE0QixBQUU1Qjs7QUFDQTtTQUFBLEFBQUssZUFBTCxBQUFrQixBQUVsQjs7U0FBQSxBQUFLLFFBQUwsQUFBYSxpQkFBYixBQUE4QixTQUFRLFVBQUEsQUFBQyxHQUFJLEFBQ3pDO1FBQUEsQUFBRSxBQUNGO1lBQUEsQUFBSyxVQUFVLE1BQUEsQUFBSyxPQUFwQixBQUEyQixBQUM1QjtBQUhELEFBTUE7O1NBQUEsQUFBSyxVQUFVLEtBQUEsQUFBSyxXQUFwQixBQUErQixXQUFVLFVBQUEsQUFBQyxPQUFELEFBQU8sTUFBTyxBQUNyRDtVQUFBLEFBQUcsT0FBTSxBQUNQO2dCQUFBLEFBQVEsTUFBUixBQUFjLEFBQ2Q7QUFDRDtBQUNEO1lBQUEsQUFBSyxZQUFMLEFBQWlCLEFBQ2xCO0FBTkQsQUFTRDs7Ozs7dUMsQUFHa0IsTUFBSyxBQUN0QjtVQUFNLFNBQU4sQUFBYSxB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QUFDUDtpQkFBQSxBQUFLLEFBQ047QUFDRDtjQUFBLEFBQU0sWUFBTixBQUFrQixBQUNsQjtlQUFBLEFBQU8sQUFDUjtBQU5ELEFBT0Q7Ozs7OEIsQUFJUyxTLEFBQVEsSUFBRyxBQUNuQjtVQUFHLFFBQUEsQUFBUSxXQUFYLEFBQW9CLFFBQU8sQUFDekI7Z0JBQUEsQUFBUSxVQUFRLEVBQUMsZ0JBQWpCLEFBQWdCLEFBQWdCLEFBQ2pDO0FBQ0Q7WUFBTSxRQUFOLEFBQWMsS0FBZCxBQUFrQixTQUFsQixBQUNDLEtBQUssVUFBQSxBQUFDLFVBQVksQUFDakI7ZUFBTyxTQUFQLEFBQU8sQUFBUyxBQUNqQjtBQUhELFNBQUEsQUFJQyxLQUFLLFVBQUEsQUFBQyxVQUFXLEFBQ2hCO1dBQUEsQUFBRyxXQUFILEFBQWEsQUFDZDtBQU5ELFNBQUEsQUFPQyxNQUFNLFVBQUEsQUFBQyxPQUFRLEFBQ2Q7V0FBQSxBQUFHLE9BQUgsQUFBUyxBQUNWO0FBVEQsQUFVRDs7Ozs7OztBQUtILElBQU0sVUFBSSxBQUFJO1VBQ0wsU0FBQSxBQUFTLGVBRGEsQUFDdEIsQUFBd0IsQUFDL0I7U0FBTSxTQUFBLEFBQVMsZUFGYyxBQUV2QixBQUF3QixBQUM5QjtpQkFBYyxTQUFBLEFBQVMsZUFIekIsQUFBVSxBQUFxQixBQUdmLEFBQXdCO0FBSFQsQUFDN0IsQ0FEUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIEknbSB1c2luZyB0aGUgbmV3IEVTNiBmZWF0dXJlcywgd2hpY2ggSSBjb25zaWRlciBhIGdvb2QgaW1wcm92ZW1lbnQgZm9yIEpTLlxuLy8gVGhpcyBjb2RlIGlzIGNvbXBpbGVkIGFmdGVyIHRvIEVTNSB0aHJvdWdoIHRoZSBndWxwZmlsZS5cblxuLy8gSGVyZSBpcyB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgYXBwbGljYXRpb25cbmNsYXNzIFZlbmRpZ29Cb29rU3RvcmV7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzX29iamVjdCl7XG5cbiAgICB0aGlzLl91cmxzX2RhdGE9e1xuICAgICAgaW5pdF9kYXRhOnt1cmw6J2h0dHA6Ly9sb2NhbGhvc3Q6NzAwMC9hcGkvYm9va3MnLG1ldGhvZDonR0VUJ30sXG4gICAgICB0aXRsZTp7dXJsOidodHRwOi8vbG9jYWxob3N0OjcwMDAvYXBpL2Jvb2tzL3RpdGxlJyxtZXRob2Q6J1BPU1QnLGJvZHk6e3RpdGxlOlwiXCJ9fSxcbiAgICAgIG9saWQ6e3VybDonaHR0cDovL2xvY2FsaG9zdDo3MDAwL2FwaS9ib29rcy9PTElEJyxtZXRob2Q6J1BPU1QnLGJvZHk6e09MSUQ6XCJcIn19XG4gICAgfVxuXG4gICAgdGhpcy5fbGlzdF9ib29rcz1zZXR0aW5nc19vYmplY3QubGlzdF9vZl9ib29rcztcbiAgICB0aGlzLl9idXR0b249c2V0dGluZ3Nfb2JqZWN0LmJ1dHRvbjtcbiAgICB0aGlzLl9pbnB1dD1zZXR0aW5nc19vYmplY3QuaW5wdXQ7XG5cbiAgICAvL0ZvciB0ZXN0IHB1cnBvc3Nlc1xuICAgIHRoaXMuX2xhc3Rfc2VhcmNoPVwiXCI7XG5cbiAgICB0aGlzLl9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5zZW5kUXVlcnkodGhpcy5faW5wdXQudmFsdWUpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLl9sb2FkRGF0YSh0aGlzLl91cmxzX2RhdGEuaW5pdF9kYXRhLChlcnJvcixkYXRhKT0+e1xuICAgICAgaWYoZXJyb3Ipe1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fcGFpbnRCb29rcyhkYXRhKTtcbiAgICB9KTtcblxuXG4gIH1cblxuXG4gIF9jaGVja09MSURWYWxpZGl0eShvbGlkKXtcbiAgICBjb25zdCByZWdleHA9L14oT0wpKFxcZCkrKE0pJC87XG4gICAgcmV0dXJuIHJlZ2V4cC50ZXN0KG9saWQpO1xuICB9XG5cbiAgX3JlbW92ZUJvb2tzKGNvbnRhaW5lcl9ib29rcyl7XG4gICAgd2hpbGUgKGNvbnRhaW5lcl9ib29rcy5maXJzdENoaWxkKSB7XG4gICAgICBjb250YWluZXJfYm9va3MucmVtb3ZlQ2hpbGQoY29udGFpbmVyX2Jvb2tzLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG5cblxuICBfY3JlYXRlRWxlbWVudChlbGVtZW50LHByb3BzKXtcbiAgICBsZXQgZWxlbT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgZWxlbVtwcm9wXT1wcm9wc1twcm9wXTtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW07XG4gIH1cblxuXG5cbiAgX3BhaW50Qm9va3MoYm9va3Mpe1xuXG4gICAgaWYoYm9va3MubGVuZ3RoKXtcblxuICAgICAgY29uc3QgX3NlbGY9dGhpcztcblxuICAgICAgbGV0IGNvbnRhaW5lcj1fc2VsZi5fbGlzdF9ib29rcztcblxuICAgICAgX3NlbGYuX3JlbW92ZUJvb2tzKGNvbnRhaW5lcik7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9va3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYm9vaz1ib29rc1tpXTtcblxuXG5cblxuICAgICAgICBjb25zdCBkaXZfYm9vaz1fc2VsZi5fY3JlYXRlRWxlbWVudCgnZGl2Jyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwicGFkZGluZ19ib3hcIlxuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2ltZycse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImltYWdlX2Jvb2tcIixcbiAgICAgICAgICBzcmM6Ym9vay5jb3Zlci5sYXJnZSB8fCBib29rLmNvdmVyLm1lZGl1bSB8fCBib29rLmNvdmVyLnNtYWxsXG4gICAgICAgIH0pKTtcblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcInRpdGxlXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmJvb2sudGl0bGVcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ3AnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJieV9zdGF0ZW1lbnRcIixcbiAgICAgICAgICBpbm5lckhUTUw6YEJ5ICR7Ym9vay5hdXRob3JzWzBdLm5hbWV9YFxuICAgICAgICB9KSk7XG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImRlc2NyaXB0aW9uXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmBMb3JlbSBpcHN1bS4uLi5gXG4gICAgICAgIH0pKTtcblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdwJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwicHJpY2VcIixcbiAgICAgICAgICBpbm5lckhUTUw6YCQyNC45OWBcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2J1dHRvbicse1xuICAgICAgICAgIGNsYXNzTmFtZTpcImJ0biBidXR0b25fYWRkXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmBBZGQgdG8gY2FydGBcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGNvbnN0IGJveF9ib29rPV9zZWxmLl9jcmVhdGVFbGVtZW50KCdkaXYnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJib29rIGNvbC1sZy00IGNvbC1tZC00IGNvbC1zbS02IGNvbC14cy0xMlwiXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGJveF9ib29rLmFwcGVuZENoaWxkKGRpdl9ib29rKTtcblxuICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYm94X2Jvb2spO1xuICAgICAgfVxuICAgIH1cblxuXG4gIH1cblxuICBzZW5kUXVlcnkoaW5wdXQpe1xuICAgIGNvbnN0IF9zZWxmPXRoaXM7XG5cbiAgICBsZXQga2luZF9pbnB1dD17fTtcbiAgICBpZihfc2VsZi5fY2hlY2tPTElEVmFsaWRpdHkoaW5wdXQpKXtcbiAgICAgIGtpbmRfaW5wdXQ9X3NlbGYuX3VybHNfZGF0YS5vbGlkO1xuICAgICAgX3NlbGYuX2xhc3Rfc2VhcmNoPVwiT0xJRFwiO1xuICAgIH1lbHNle1xuICAgICAga2luZF9pbnB1dD1fc2VsZi5fdXJsc19kYXRhLnRpdGxlO1xuICAgICAgX3NlbGYuX2xhc3Rfc2VhcmNoPVwidGl0bGVcIjtcbiAgICB9XG5cbiAgICBraW5kX2lucHV0LmJvZHk9SlNPTi5zdHJpbmdpZnkoe3F1ZXJ5OmlucHV0fSk7XG5cbiAgICBfc2VsZi5fbG9hZERhdGEoa2luZF9pbnB1dCwoZXJyb3IsZGF0YSk9PntcbiAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgZGF0YT1bXTtcbiAgICAgIH1cbiAgICAgIF9zZWxmLl9wYWludEJvb2tzKGRhdGEpO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSlcbiAgfVxuXG5cblxuICBfbG9hZERhdGEob3B0aW9ucyxjYil7XG4gICAgaWYob3B0aW9ucy5tZXRob2Q9PT0nUE9TVCcpe1xuICAgICAgb3B0aW9ucy5oZWFkZXJzPXtcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vanNvblwifTtcbiAgICB9XG4gICAgZmV0Y2gob3B0aW9ucy51cmwsb3B0aW9ucylcbiAgICAudGhlbigocmVzcG9uc2UpPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICAgIC50aGVuKChyZXNwb25zZSk9PntcbiAgICAgIGNiKHVuZGVmaW5lZCxyZXNwb25zZSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKT0+e1xuICAgICAgY2IoZXJyb3IsdW5kZWZpbmVkKTtcbiAgICB9KVxuICB9XG5cbn1cblxuXG5jb25zdCBBUFA9bmV3IFZlbmRpZ29Cb29rU3RvcmUoe1xuICBidXR0b246ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbmQnKSxcbiAgaW5wdXQ6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1ZXJ5JyksXG4gIGxpc3Rfb2ZfYm9va3M6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3RfYm9va3MnKVxufSk7XG4iXX0=
