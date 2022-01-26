'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WaitListForm = function (_React$Component) {
  _inherits(WaitListForm, _React$Component);

  function WaitListForm(props) {
    _classCallCheck(this, WaitListForm);

    var _this = _possibleConstructorReturn(this, (WaitListForm.__proto__ || Object.getPrototypeOf(WaitListForm)).call(this, props));

    _this.handleSubmit = function (e) {
      e.preventDefault();
      var email = $('#wemail').val();
      var customerType = $('input[name="customerType"]:checked').val();
      var name = $('#wname').val();

      if (!email || !name) {
        return;
      }

      var data = {
        'email': email,
        'customerType': customerType,
        'name': name
      };
      _this.submitForm(data);
    };

    _this.submitForm = function (formData) {
      _this.setState(function (state) {
        return Object.assign({}, state, {
          loading: true
        });
      });

      var formSubmitSuccess = function formSubmitSuccess() {
        _this.setState(function (state) {
          return Object.assign({}, state, {
            addedToWaitingList: true
          });
        });
      };

      var formSubmitError = function formSubmitError() {
        console.log('-----------error');
      };

      var formSubmitComplete = function formSubmitComplete() {
        _this.setState(function (state) {
          return Object.assign({}, state, {
            loading: false
          });
        });
      };

      $.ajax({
        type: 'POST',
        url: 'https://g6gtqb4crj.execute-api.us-west-2.amazonaws.com/default/addToWaitlist',
        data: JSON.stringify(formData),
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        complete: function complete(xhr, textStatus) {
          formSubmitComplete();
        },
        success: function success(data, textStatus, xhr) {
          if (xhr.status === 200) {
            formSubmitSuccess();
          } else {
            formSubmitError();
          }
        },
        error: function error(request, status, _error) {}
      });
    };

    _this.handleBlur = function (e) {
      if (e.target.value !== '') {
        $(e.target).addClass('notEmpty');
      } else {
        $(e.target).removeClass('notEmpty');
      }
    };

    _this.state = {
      loading: false,
      addedToWaitingList: false,
      customerType: {
        placeholder: 'Select an option',
        option: ['Renter', 'Property manager', 'Real estate agent']
      }
    };
    return _this;
  }

  _createClass(WaitListForm, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        !this.state.addedToWaitingList && React.createElement(
          'form',
          { id: 'waitListForm', 'data-toggle': 'validator', 'data-focus': 'false', onSubmit: this.handleSubmit },
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { type: 'text', className: 'form-control-input', id: 'wname', required: true, onBlur: this.handleBlur }),
            React.createElement(
              'label',
              { className: 'label-control', htmlFor: 'wname' },
              'Full Name -',
              this.state.loading.toString(),
              '-'
            ),
            React.createElement('div', { className: 'help-block with-errors' })
          ),
          React.createElement(
            'div',
            { className: 'form-group' },
            React.createElement('input', { type: 'email', className: 'form-control-input', id: 'wemail', required: true, onBlur: this.handleBlur }),
            React.createElement(
              'label',
              { className: 'label-control', htmlFor: 'wemail' },
              'Email'
            ),
            React.createElement('div', { className: 'help-block with-errors' })
          ),
          React.createElement(
            'div',
            { className: 'form-group radio-container' },
            React.createElement(
              'div',
              { className: 'form-control-radio' },
              React.createElement('input', { type: 'radio', id: 'customerTypeRenter', name: 'customerType', value: 'renter', defaultChecked: true }),
              React.createElement(
                'label',
                { htmlFor: 'customerTypeRenter' },
                this.state.customerType.option[0]
              )
            ),
            React.createElement(
              'div',
              { className: 'form-control-radio' },
              React.createElement('input', { type: 'radio', id: 'customerTypePropertyManager', name: 'customerType', value: 'propertyManager' }),
              React.createElement(
                'label',
                { htmlFor: 'customerTypePropertyManager' },
                this.state.customerType.option[1]
              )
            ),
            React.createElement(
              'div',
              { className: 'form-control-radio' },
              React.createElement('input', { type: 'radio', id: 'customerTypeEstateAgent', name: 'customerType', value: 'estateAgent' }),
              React.createElement(
                'label',
                { htmlFor: 'customerTypeEstateAgent' },
                this.state.customerType.option[2]
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'form-group form-button' },
            !this.state.loading && React.createElement(
              'button',
              { type: 'submit', className: 'form-control-submit-button' },
              'JOIN'
            ),
            this.state.loading && React.createElement('div', { className: 'loader' })
          ),
          React.createElement(
            'div',
            { className: 'form-message' },
            React.createElement('div', { id: 'wmsgSubmit', className: 'h3 text-center hidden' })
          )
        ),
        this.state.addedToWaitingList && React.createElement(
          'div',
          { className: 'waiting-list-added' },
          React.createElement('img', { src: 'images/r-benifits.png', alt: 'alternative' }),
          React.createElement(
            'h1',
            null,
            'You have been added!'
          )
        )
      );
    }
  }]);

  return WaitListForm;
}(React.Component);

var domContainer = document.querySelector('#waiting_list_form');
ReactDOM.render(React.createElement(WaitListForm, null), domContainer);