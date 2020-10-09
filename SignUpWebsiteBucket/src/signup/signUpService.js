const SIGN_UP_ENDPOINT = 'https://euq4333spj.execute-api.ap-southeast-2.amazonaws.com/dev/distributionList';

module.exports.getSignUpPasscode = function () {
  const queryParamPairs = document.location.search.substr(1)
    .split('&')
    .map(s => s.split('='));
  const [, encodedPasscode] = queryParamPairs.find(([key]) => key === 'passcode') || [];
  if (encodedPasscode) {
    return atob(decodeURIComponent(encodedPasscode));
  }
  return undefined;
};

module.exports.submitSignUp = (signUpData) => fetch(SIGN_UP_ENDPOINT, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-type': 'application/json' },
  redirect: 'follow',
  body: JSON.stringify(signUpData),
})
  .then(response => response.json().then(body => ({ status: response.status, body })))
  .then(({ status, body}) => {
    if (status !== 200) {
      return { success: false, errorCode: body.ErrorCode };
    }
    return { success: body.Success === true, errorCode: body.ErrorCode };
  })
  .catch(error => {
    console.error(error);
    return { success: false, error };
  });
