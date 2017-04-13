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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBO0FBQ0E7O0FBRUE7SSxBQUNNLCtCQUNKOzRCQUFBLEFBQVksaUJBQWdCO2dCQUFBOzswQkFFMUI7O1NBQUEsQUFBSyxRQUFMLEFBQVcsQUFFWDs7U0FBQSxBQUFLO2lCQUNPLEVBQUMsS0FBSSxLQUFBLEFBQUssUUFBVixBQUFnQixjQUFhLFFBRHpCLEFBQ0osQUFBb0MsQUFDOUM7YUFBTSxFQUFDLEtBQUksS0FBQSxBQUFLLFFBQVYsQUFBZ0Isb0JBQW1CLFFBQW5DLEFBQTBDLFFBQU8sTUFBSyxFQUFDLE9BRi9DLEFBRVIsQUFBc0QsQUFBTyxBQUNuRTtZQUFLLEVBQUMsS0FBSSxLQUFBLEFBQUssUUFBVixBQUFnQixtQkFBa0IsUUFBbEMsQUFBeUMsUUFBTyxNQUFLLEVBQUMsTUFIN0QsQUFBZ0IsQUFHVCxBQUFxRCxBQUFNLEFBR2xFO0FBTmdCLEFBQ2Q7O1NBS0YsQUFBSyxjQUFZLGdCQUFqQixBQUFpQyxBQUNqQztTQUFBLEFBQUssVUFBUSxnQkFBYixBQUE2QixBQUM3QjtTQUFBLEFBQUssU0FBTyxnQkFBWixBQUE0QixBQUU1Qjs7QUFDQTtTQUFBLEFBQUssZUFBTCxBQUFrQixBQUVsQjs7U0FBQSxBQUFLLFFBQUwsQUFBYSxpQkFBYixBQUE4QixTQUFRLFVBQUEsQUFBQyxHQUFJLEFBQ3pDO1FBQUEsQUFBRSxBQUNGO1lBQUEsQUFBSyxVQUFVLE1BQUEsQUFBSyxPQUFwQixBQUEyQixBQUM1QjtBQUhELEFBTUE7O1NBQUEsQUFBSyxVQUFVLEtBQUEsQUFBSyxXQUFwQixBQUErQixXQUFVLFVBQUEsQUFBQyxPQUFELEFBQU8sTUFBTyxBQUNyRDtVQUFBLEFBQUcsT0FBTSxBQUNQO2dCQUFBLEFBQVEsTUFBUixBQUFjLEFBQ2Q7QUFDRDtBQUNEO1lBQUEs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WUFBQSxBQUFNLFVBQU4sQUFBZ0IsWUFBVyxVQUFBLEFBQUMsT0FBRCxBQUFPLE1BQU8sQUFDdkM7WUFBQSxBQUFHLE9BQU0sQUFDUDtpQkFBQSxBQUFLLEFBQ047QUFDRDtjQUFBLEFBQU0sWUFBTixBQUFrQixBQUNsQjtlQUFBLEFBQU8sQUFDUjtBQU5ELEFBT0Q7Ozs7OEIsQUFJUyxTLEFBQVEsSUFBRyxBQUNuQjtVQUFHLFFBQUEsQUFBUSxXQUFYLEFBQW9CLFFBQU8sQUFDekI7Z0JBQUEsQUFBUSxVQUFRLEVBQUMsZ0JBQWpCLEFBQWdCLEFBQWdCLEFBQ2pDO0FBQ0Q7WUFBTSxRQUFOLEFBQWMsS0FBZCxBQUFrQixTQUFsQixBQUNDLEtBQUssVUFBQSxBQUFDLFVBQVksQUFDakI7ZUFBTyxTQUFQLEFBQU8sQUFBUyxBQUNqQjtBQUhELFNBQUEsQUFJQyxLQUFLLFVBQUEsQUFBQyxVQUFXLEFBQ2hCO1dBQUEsQUFBRyxXQUFILEFBQWEsQUFDZDtBQU5ELFNBQUEsQUFPQyxNQUFNLFVBQUEsQUFBQyxPQUFRLEFBQ2Q7V0FBQSxBQUFHLE9BQUgsQUFBUyxBQUNWO0FBVEQsQUFVRDs7Ozs7OztBQUtILElBQU0sVUFBSSxBQUFJO1VBQ0wsU0FBQSxBQUFTLGVBRGEsQUFDdEIsQUFBd0IsQUFDL0I7U0FBTSxTQUFBLEFBQVMsZUFGYyxBQUV2QixBQUF3QixBQUM5QjtpQkFBYyxTQUFBLEFBQVMsZUFIekIsQUFBVSxBQUFxQixBQUdmLEFBQXdCO0FBSFQsQUFDN0IsQ0FEUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbi8vIEknbSB1c2luZyB0aGUgbmV3IEVTNiBmZWF0dXJlcywgd2hpY2ggSSBjb25zaWRlciBhIGdvb2QgaW1wcm92ZW1lbnQgZm9yIEpTLlxuLy8gVGhpcyBjb2RlIGlzIGNvbXBpbGVkIGFmdGVyIHRvIEVTNSB0aHJvdWdoIHRoZSBndWxwZmlsZS5cblxuLy8gSGVyZSBpcyB0aGUgbWFpbiBjbGFzcyBvZiB0aGUgYXBwbGljYXRpb25cbmNsYXNzIFZlbmRpZ29Cb29rU3RvcmV7XG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzX29iamVjdCl7XG4gICAgXG4gICAgdGhpcy5faG9zdD0naHR0cHM6Ly9zaGllbGRlZC1wZWFrLTI3ODYxLmhlcm9rdWFwcC5jb20nO1xuXG4gICAgdGhpcy5fdXJsc19kYXRhPXtcbiAgICAgIGluaXRfZGF0YTp7dXJsOnRoaXMuX2hvc3QrJy9hcGkvYm9va3MnLG1ldGhvZDonR0VUJ30sXG4gICAgICB0aXRsZTp7dXJsOnRoaXMuX2hvc3QrJy9hcGkvYm9va3MvdGl0bGUnLG1ldGhvZDonUE9TVCcsYm9keTp7dGl0bGU6XCJcIn19LFxuICAgICAgb2xpZDp7dXJsOnRoaXMuX2hvc3QrJy9hcGkvYm9va3MvT0xJRCcsbWV0aG9kOidQT1NUJyxib2R5OntPTElEOlwiXCJ9fVxuICAgIH1cblxuICAgIHRoaXMuX2xpc3RfYm9va3M9c2V0dGluZ3Nfb2JqZWN0Lmxpc3Rfb2ZfYm9va3M7XG4gICAgdGhpcy5fYnV0dG9uPXNldHRpbmdzX29iamVjdC5idXR0b247XG4gICAgdGhpcy5faW5wdXQ9c2V0dGluZ3Nfb2JqZWN0LmlucHV0O1xuXG4gICAgLy9Gb3IgdGVzdCBwdXJwb3NzZXNcbiAgICB0aGlzLl9sYXN0X3NlYXJjaD1cIlwiO1xuXG4gICAgdGhpcy5fYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSk9PntcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2VuZFF1ZXJ5KHRoaXMuX2lucHV0LnZhbHVlKTtcbiAgICB9KTtcblxuXG4gICAgdGhpcy5fbG9hZERhdGEodGhpcy5fdXJsc19kYXRhLmluaXRfZGF0YSwoZXJyb3IsZGF0YSk9PntcbiAgICAgIGlmKGVycm9yKXtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3BhaW50Qm9va3MoZGF0YSk7XG4gICAgfSk7XG5cblxuICB9XG5cblxuICBfY2hlY2tPTElEVmFsaWRpdHkob2xpZCl7XG4gICAgY29uc3QgcmVnZXhwPS9eKE9MKShcXGQpKyhNKSQvO1xuICAgIHJldHVybiByZWdleHAudGVzdChvbGlkKTtcbiAgfVxuXG4gIF9yZW1vdmVCb29rcyhjb250YWluZXJfYm9va3Mpe1xuICAgIHdoaWxlIChjb250YWluZXJfYm9va3MuZmlyc3RDaGlsZCkge1xuICAgICAgY29udGFpbmVyX2Jvb2tzLnJlbW92ZUNoaWxkKGNvbnRhaW5lcl9ib29rcy5maXJzdENoaWxkKTtcbiAgICB9XG4gIH1cblxuXG5cbiAgX2NyZWF0ZUVsZW1lbnQoZWxlbWVudCxwcm9wcyl7XG4gICAgbGV0IGVsZW09ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgIGVsZW1bcHJvcF09cHJvcHNbcHJvcF07XG4gICAgfVxuICAgIHJldHVybiBlbGVtO1xuICB9XG5cblxuXG4gIF9wYWludEJvb2tzKGJvb2tzKXtcblxuICAgIGlmKGJvb2tzLmxlbmd0aCl7XG5cbiAgICAgIGNvbnN0IF9zZWxmPXRoaXM7XG5cbiAgICAgIGxldCBjb250YWluZXI9X3NlbGYuX2xpc3RfYm9va3M7XG5cbiAgICAgIF9zZWxmLl9yZW1vdmVCb29rcyhjb250YWluZXIpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGJvb2s9Ym9va3NbaV07XG5cblxuXG5cbiAgICAgICAgY29uc3QgZGl2X2Jvb2s9X3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ2Rpdicse1xuICAgICAgICAgIGNsYXNzTmFtZTpcInBhZGRpbmdfYm94XCJcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdpbWcnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJpbWFnZV9ib29rXCIsXG4gICAgICAgICAgc3JjOmJvb2suY292ZXIubGFyZ2UgfHwgYm9vay5jb3Zlci5tZWRpdW0gfHwgYm9vay5jb3Zlci5zbWFsbFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ3AnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJ0aXRsZVwiLFxuICAgICAgICAgIGlubmVySFRNTDpib29rLnRpdGxlXG4gICAgICAgIH0pKTtcblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdwJyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwiYnlfc3RhdGVtZW50XCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmBCeSAke2Jvb2suYXV0aG9yc1swXS5uYW1lfWBcbiAgICAgICAgfSkpO1xuXG5cbiAgICAgICAgZGl2X2Jvb2suYXBwZW5kQ2hpbGQoX3NlbGYuX2NyZWF0ZUVsZW1lbnQoJ3AnLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJkZXNjcmlwdGlvblwiLFxuICAgICAgICAgIGlubmVySFRNTDpgTG9yZW0gaXBzdW0uLi4uYFxuICAgICAgICB9KSk7XG5cblxuICAgICAgICBkaXZfYm9vay5hcHBlbmRDaGlsZChfc2VsZi5fY3JlYXRlRWxlbWVudCgncCcse1xuICAgICAgICAgIGNsYXNzTmFtZTpcInByaWNlXCIsXG4gICAgICAgICAgaW5uZXJIVE1MOmAkMjQuOTlgXG4gICAgICAgIH0pKTtcblxuXG4gICAgICAgIGRpdl9ib29rLmFwcGVuZENoaWxkKF9zZWxmLl9jcmVhdGVFbGVtZW50KCdidXR0b24nLHtcbiAgICAgICAgICBjbGFzc05hbWU6XCJidG4gYnV0dG9uX2FkZFwiLFxuICAgICAgICAgIGlubmVySFRNTDpgQWRkIHRvIGNhcnRgXG4gICAgICAgIH0pKTtcblxuICAgICAgICBjb25zdCBib3hfYm9vaz1fc2VsZi5fY3JlYXRlRWxlbWVudCgnZGl2Jyx7XG4gICAgICAgICAgY2xhc3NOYW1lOlwiYm9vayBjb2wtbGctNCBjb2wtbWQtNCBjb2wtc20tNiBjb2wteHMtMTJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBib3hfYm9vay5hcHBlbmRDaGlsZChkaXZfYm9vayk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGJveF9ib29rKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICB9XG5cbiAgc2VuZFF1ZXJ5KGlucHV0KXtcbiAgICBjb25zdCBfc2VsZj10aGlzO1xuXG4gICAgbGV0IGtpbmRfaW5wdXQ9e307XG4gICAgaWYoX3NlbGYuX2NoZWNrT0xJRFZhbGlkaXR5KGlucHV0KSl7XG4gICAgICBraW5kX2lucHV0PV9zZWxmLl91cmxzX2RhdGEub2xpZDtcbiAgICAgIF9zZWxmLl9sYXN0X3NlYXJjaD1cIk9MSURcIjtcbiAgICB9ZWxzZXtcbiAgICAgIGtpbmRfaW5wdXQ9X3NlbGYuX3VybHNfZGF0YS50aXRsZTtcbiAgICAgIF9zZWxmLl9sYXN0X3NlYXJjaD1cInRpdGxlXCI7XG4gICAgfVxuXG4gICAga2luZF9pbnB1dC5ib2R5PUpTT04uc3RyaW5naWZ5KHtxdWVyeTppbnB1dH0pO1xuXG4gICAgX3NlbGYuX2xvYWREYXRhKGtpbmRfaW5wdXQsKGVycm9yLGRhdGEpPT57XG4gICAgICBpZihlcnJvcil7XG4gICAgICAgIGRhdGE9W107XG4gICAgICB9XG4gICAgICBfc2VsZi5fcGFpbnRCb29rcyhkYXRhKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0pXG4gIH1cblxuXG5cbiAgX2xvYWREYXRhKG9wdGlvbnMsY2Ipe1xuICAgIGlmKG9wdGlvbnMubWV0aG9kPT09J1BPU1QnKXtcbiAgICAgIG9wdGlvbnMuaGVhZGVycz17XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb25cIn07XG4gICAgfVxuICAgIGZldGNoKG9wdGlvbnMudXJsLG9wdGlvbnMpXG4gICAgLnRoZW4oKHJlc3BvbnNlKT0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfSlcbiAgICAudGhlbigocmVzcG9uc2UpPT57XG4gICAgICBjYih1bmRlZmluZWQscmVzcG9uc2UpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcik9PntcbiAgICAgIGNiKGVycm9yLHVuZGVmaW5lZCk7XG4gICAgfSlcbiAgfVxuXG59XG5cblxuY29uc3QgQVBQPW5ldyBWZW5kaWdvQm9va1N0b3JlKHtcbiAgYnV0dG9uOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW5kJyksXG4gIGlucHV0OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdWVyeScpLFxuICBsaXN0X29mX2Jvb2tzOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0X2Jvb2tzJylcbn0pO1xuIl19
