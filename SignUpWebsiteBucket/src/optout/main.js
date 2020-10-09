const OptOutFormDataAdapter = require('./OptOutFormDataAdapter');
const FormSubmitLock = require('../common/FormSubmitLock');

require('./main.scss');

const forEach = (list, handler) => [].forEach.call(list, handler);
const optOutForm = document.getElementById('OptOutForm');

const submitLock = new FormSubmitLock(optOutForm);
optOutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const adapter = new OptOutFormDataAdapter(event.target);
  const optOutData = {
    entry: {
      DestinationAddress: adapter.getDestinationAddress(),
      AddressType: adapter.getAddressType(),
    }
  };

  if (submitLock.lock()) {
    console.log('TODO');
  }
});
