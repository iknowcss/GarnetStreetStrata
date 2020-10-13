const SIGN_UP_ENDPOINT = 'https://euq4333spj.execute-api.ap-southeast-2.amazonaws.com/dev/distributionList';

module.exports.submitOptOut = (addressType, destinationAddress) => fetch([
  SIGN_UP_ENDPOINT,
  addressType,
  destinationAddress,
].join('/'), {
  method: 'DELETE',
  mode: 'cors',
  cache: 'no-cache',
  headers: { 'Content-type': 'application/json' },
  redirect: 'follow',
})
  .then(response => response.json().then(body => ({ status: response.status, body })))
  .then(({ status, body }) => {
    if (status !== 200) {
      console.error('Unexpected status code', status);
      return { success: false, errorCode: body.ErrorCode };
    }
    return { success: body.Success === true, errorCode: body.ErrorCode };
  })
  .catch(error => {
    console.error(error);
    return { success: false, error };
  });
