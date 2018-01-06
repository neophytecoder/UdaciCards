export const makeid = (length) => {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export const makeUniqueId = (length, data = []) => {
  let generatedId = makeid(length);
  while (data.filter(datum => datum.id === generatedId).length !== 0) {
    generatedId = makeid(length);
  }
  return generatedId;
}

export const filterUnwanted = (data = [], unwanted = {}) => {
  return data.filter(datum => datum.id !== unwanted.id);
}
