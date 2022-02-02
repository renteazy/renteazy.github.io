'use strict';

class WaitListEmailForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      addedToWaitingList: false,
      hasError: false,
      errorMessage: '',
      customerType: {
        placeholder: 'Select an option',
        option: [
          'Renter',
          'Property manager',
          'Real estate agent',
        ],
      },
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var email = $('#wemail').val();
    var customerType = $('input[name="customerType"]:checked').val();

    if (!email) {
      return;
    }

    var data = {
      'email': email,
      'customerType': customerType,
    };
    this.submitForm(data);
  };

  submitForm = (formData) => {
    this.setState((state) => {
      return ({
        ...state,
        loading: true,
        errorMessage: '',
        hasError: false,
      });
    });

    const formSubmitSuccess = () => {
      this.setState((state) => {
        return ({
          ...state,
          addedToWaitingList: true,
        });
      });
    };

    const errorHandling = (error) => {
      $('#waitListForm')[0].reset();
      this.setState((state) => {
        return ({
          ...state,
          errorMessage: error.message,
          hasError: true,
        });
      });
    };

    const formSubmitError = () => {
      console.log('-----------error');
    };

    const formSubmitComplete = () => {
      this.setState((state) => {
        return ({
          ...state,
          loading: false,
        });
      });
    };

    $.ajax({
      type: 'POST',
      url: 'https://g6gtqb4crj.execute-api.us-west-2.amazonaws.com/default/addToWaitlist',
      data: JSON.stringify(formData),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
      complete: function(xhr, textStatus) {
        formSubmitComplete();
      },
      success: function(data, textStatus, xhr) {
        if (xhr.status === 200) {
          if (data.error) {
            errorHandling(data.error);
            return;
          }
          formSubmitSuccess();
        } else {
          formSubmitError();
        }
      },
      error: function(request, status, error) {
      },
    });
  };

  handleBlur = (e) => {
    if (e.target.value !== '') {
      $(e.target).addClass('notEmpty');
    } else {
      $(e.target).removeClass('notEmpty');
    }
  };

  render() {
    return (
        <div>
          {!this.state.addedToWaitingList &&
          (
              <form id="waitListForm" data-toggle="validator" data-focus="false" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="email" className="form-control-input" id="wemail" required onBlur={this.handleBlur}/>
                  <label className="label-control" htmlFor="wemail">Email</label>
                  <div className="help-block with-errors"/>
                </div>
                <div className="form-group radio-container">
                  <div className="form-control-radio">
                    <input type="radio" id="customerTypeRenter" name="customerType" value="renter" defaultChecked/>
                    <label htmlFor="customerTypeRenter">{this.state.customerType.option[0]}</label>
                  </div>
                  <div className="form-control-radio">
                    <input type="radio" id="customerTypePropertyManager" name="customerType" value="propertyManager"/>
                    <label htmlFor="customerTypePropertyManager">{this.state.customerType.option[1]}</label>
                  </div>
                  <div className="form-control-radio">
                    <input type="radio" id="customerTypeEstateAgent" name="customerType" value="estateAgent"/>
                    <label htmlFor="customerTypeEstateAgent">{this.state.customerType.option[2]}</label>
                  </div>
                </div>
                <div className="form-group form-button">
                  {!this.state.loading && (
                      <button type="submit"
                              className="btn-solid-lg page-scroll form-control-submit-button">JOIN</button>
                  )}
                  {this.state.loading && (
                      <div className="loader"/>
                  )}
                </div>
                <div className="form-message">
                  <div id="wmsgSubmit" className="h3 text-center hidden"/>
                </div>
              </form>
          )}
          {this.state.addedToWaitingList && (
              <div className='waiting-list-added'>
                <h1>
                  See you soon 🥳
                </h1>
              </div>
          )}
          {this.state.hasError && (
              <div className='waiting-list-error'>
                {this.state.errorMessage} 🙏
              </div>
          )}
        </div>
    );
  }
}

const domContainerBottom = document.querySelector('#waiting-list-email-bottom');
ReactDOM.render(<WaitListEmailForm/>, domContainerBottom);


const domContainerTop = document.querySelector('#waiting-list-email-top');
ReactDOM.render(<WaitListEmailForm/>, domContainerTop);


