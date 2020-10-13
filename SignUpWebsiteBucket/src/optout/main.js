const FormSubmitLock = require('../common/FormSubmitLock');
const { addClassNames, removeClassNames } = require('../common/domUtil');
const OptOutFormDataAdapter = require('./OptOutFormDataAdapter');
const optOutService = require('./optOutService');

require('./main.scss');

const optOutForm = document.getElementById('OptOutForm');
const optOutSubmitRow = optOutForm.querySelector('.gss-form-submit-row');
const optOutErrorRow = optOutForm.querySelector('.gss-form-error-row');
const optOutFormContainer = document.getElementById('OptOutFormContainer');
const optOutResultContainer = document.getElementById('OptOutResultContainer');

const submitLock = new FormSubmitLock(optOutForm);
optOutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const adapter = new OptOutFormDataAdapter(event.target);

  if (submitLock.lock()) {
    addClassNames(optOutSubmitRow, 'gss-form-submit-row--processing');
    optOutErrorRow.style.display = 'none';
    optOutService.submitOptOut(adapter.getAddressType(), adapter.getDestinationAddress())
      .then((optOutResult) => {
        if (optOutResult.success) {
          optOutSuccess();
        } else {
          optOutFailure(optOutResult.errorCode);
        }
      });
  }
});

function optOutSuccess() {
  optOutFormContainer.style.display = 'none';
  optOutResultContainer.style.display = 'block';
}

function optOutFailure(errorCode) {
  submitLock.unlock();
  removeClassNames(optOutSubmitRow, 'gss-form-submit-row--processing');
  optOutErrorRow.innerHTML = errorCode ||
    'An unexpected error prevented us from processing your opt-out request. Please try again later.';
  optOutErrorRow.style.display = 'block';
}
