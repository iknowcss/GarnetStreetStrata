const FormDataAdapter = require('./FormDataAdapter');
const FormSubmitLock = require('../common/FormSubmitLock');
const { addClassNames, removeClassNames } = require('../common/domUtil');
const { getSignUpPasscode, submitSignUp } = require('./signUpService');

require('./main.scss');

const signUpForm = document.getElementById('SignUpForm');
const signUpFormContainer = document.getElementById('SignUpFormContainer');
const signUpFormSubmitRow = document.getElementById('SignUpFormSubmitRow');
const signUpSuccessContainer = document.getElementById('SignUpSuccessContainer');
const signUpFormErrorRow = document.getElementById('SignUpFormErrorRow');

const formSubmitLock = new FormSubmitLock(signUpForm);
function lockSignUp() {
  if (formSubmitLock.lock()) {
    addClassNames(signUpFormSubmitRow, 'gss-form-submit-row--processing');
    signUpFormErrorRow.style.display = 'none';
    return true;
  }
  return false;
}

function unlockSignUp() {
  if (formSubmitLock.unlock()) {
    removeClassNames(signUpFormSubmitRow, 'gss-form-submit-row--processing');
    return true;
  }
  return false;
}

function signUpSuccess() {
  signUpFormContainer.style.display = 'none';
  signUpSuccessContainer.style.display = 'block';
}

const ERROR_CODE_MAP = {
  TERMS_NOT_ACCEPTED: 'You must agree to the terms to use this service.',
  INVALID_SIGN_UP_DATA: 'Some of the information you provided is incorrect. Please check that ' +
    'the information you provided is correct and submit again.',
  INVALID_PASSCODE: 'This form is out of date. Please scan the latest QR code or visit the ' +
    'latest sign-up link.'
};

function signUpFailure(errorCode) {
  unlockSignUp();
  signUpFormErrorRow.innerHTML = ERROR_CODE_MAP[errorCode]
    || 'An unexpected error prevented us from processing your sign-up. Please try again later.';
  signUpFormErrorRow.style.display = 'block';
}

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const adapter = new FormDataAdapter(event.target);
  const signUpData = {
    passcode: getSignUpPasscode(),
    acceptTerms: adapter.getAcceptTerms(),
    entry: {
      DestinationAddress: adapter.getDestinationAddress(),
      AddressType: adapter.getAddressType(),
      RecipientInfo: {
        occupantType: adapter.getOccupantType(),
        unitNumber: adapter.getUnitNumber(),
      }
    }
  };

  if (lockSignUp()) {
    submitSignUp(signUpData)
      .then((signUpResult) => {
        if (signUpResult.success) {
          signUpSuccess();
        } else {
          signUpFailure(signUpResult.errorCode);
        }
      });
  }
});
