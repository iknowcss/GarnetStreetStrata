(function () {

var SIGN_UP_ENDPOINT = 'https://euq4333spj.execute-api.ap-southeast-2.amazonaws.com/dev/distributionList';
var MOBILE_NUMBER_REGEXP = /^(?:61|0)?([45]\d{8})$/;
var signUpPasscode = (
  document.location.search
    .substr(1)
    .split('&')
    .map(function (s) { return s.split('='); })
    .find(function (s) { return s[0] === 'passcode'; })
  || []
)[1];

function FormDataAdapter(form) {
  this.formData = new FormData(form);
}

Object.assign(FormDataAdapter.prototype, {
  getDestinationAddress: function () {
    const rawInput = (this.formData.get('mobileNumber') || '').trim().replace(/[^\d]/g, '');
    if (!MOBILE_NUMBER_REGEXP.test(rawInput)) {
      return undefined;
    }
    return '+61' + rawInput.match(MOBILE_NUMBER_REGEXP)[1];
  },

  getAddressType: function () {
    return this.formData.get('addressType') || undefined;
  },

  getOccupantType: function () {
    return this.formData.get('occupantType') || undefined;
  },

  getUnitNumber: function () {
    return this.formData.get('unitNumber') || undefined;
  },

  getAcceptTerms: function () {
    return this.formData.get('acceptTerms') === 'true';
  },
});

document.getElementById('SignUpForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    var adapter = new FormDataAdapter(event.target);
    var requestBody = {
      passcode: signUpPasscode,
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

    fetch(SIGN_UP_ENDPOINT, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-type': 'application/json' },
      redirect: 'follow',
      body: JSON.stringify(requestBody),
    })
      .then(function (response) {
        console.log('response', response);
        return response.json();
      })
      .then(function (responseBody) {
        console.log('responseBody', responseBody)
      })
      .catch(function (error) {
        console.log('error', error);
      });
  });

}());
