const MOBILE_NUMBER_REGEXP = /^(?:61|0)?([45]\d{8})$/;

function OptOutFormDataAdapter(form) {
  this.formData = new FormData(form);
}

Object.assign(OptOutFormDataAdapter.prototype, {
  getDestinationAddress: function () {
    const rawInput = (this.formData.get('mobileNumber') || '')
      .trim()
      .replace(/[^\d]/g, '');
    if (!MOBILE_NUMBER_REGEXP.test(rawInput)) {
      return undefined;
    }
    return '+61' + rawInput.match(MOBILE_NUMBER_REGEXP)[1];
  },

  getAddressType: function () {
    return this.formData.get('addressType') || undefined;
  }
});

module.exports = OptOutFormDataAdapter;
module.exports.MOBILE_NUMBER_REGEXP = MOBILE_NUMBER_REGEXP;
