module.exports.addClassNames = function (element, ...newClassNames) {
  const classNames = (element.getAttribute('class') || '').split(/\s+/);
  element.setAttribute('class', [...classNames, ...newClassNames].join(' '));
};

module.exports.removeClassNames = function (element, ...removeClassNames) {
  const classNames = (element.getAttribute('class') || '').split(/\s+/);
  const filteredNames = classNames.filter(className => removeClassNames.indexOf(className) < 0);
  element.setAttribute('class', filteredNames.join(' '));
};
