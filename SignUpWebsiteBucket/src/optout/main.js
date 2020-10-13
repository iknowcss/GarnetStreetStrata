const OptOutFormDataAdapter = require('./OptOutFormDataAdapter');
const optOutService = require('./optOutService');
const FormSubmitLock = require('../common/FormSubmitLock');

require('./main.scss');

const SIGN_UP_ENDPOINT = 'https://euq4333spj.execute-api.ap-southeast-2.amazonaws.com/dev/distributionList';
const forEach = (list, handler) => [].forEach.call(list, handler);
const optOutForm = document.getElementById('OptOutForm');

const submitLock = new FormSubmitLock(optOutForm);
optOutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const adapter = new OptOutFormDataAdapter(event.target);

  if (submitLock.lock()) {
    optOutService.submitOptOut(adapter.getAddressType(), adapter.getDestinationAddress())
      .then((optOutResult) => {
        if (optOutResult.success) {
          optOutSuccess();
        } else {
          optOutFailure(optOutResult.errorCode);
        }
      });;
  }
});

function optOutSuccess() {
  console.log('Success!');
}

function optOutFailure(errorCode) {
  submitLock.unlock();
}
