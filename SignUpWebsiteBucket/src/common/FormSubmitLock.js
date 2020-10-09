const forEach = (list, handler) => [].forEach.call(list, handler);

function FormSubmitLock(form) {
  this.form = form;
  this.isLocked = false;
}

Object.assign(FormSubmitLock.prototype, {
  lock: function () {
    if (this.isLocked) {
      return false;
    }
    this.isLocked = true;
    this.reEnableList = [];
    forEach(this.form.elements, (element) => {
      if (!element.getAttribute('disabled')) {
        element.setAttribute('disabled', 'disabled');
        this.reEnableList.push(element);
      }
    });
    return true;
  },

  unlock: function () {
    if (this.isLocked) {
      forEach(this.reEnableList, element => element.removeAttribute('disabled'));
      this.reEnableList = null;
      this.isLocked = false;
      return true;
    }
    return false;
  },
});

module.exports = FormSubmitLock;
