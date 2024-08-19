export function createQueryString(
  queryObject: {
    [key: string]: string | number | boolean | string[] | number[];
  } = {},
) {
  let queryString = Object.keys(queryObject)
    .filter((key) => queryObject[key] && !(Array.isArray(queryObject[key]) && !queryObject[key].length))
    .map((key) => {
      return Array.isArray(queryObject[key])
        ? queryObject[key].map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`).join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`;
    })
    .join('&');
  return queryString ? `?${queryString}` : '';
}

export function queryStringToObject(
  queryString: string = '',
  options: {
    [key: string]: string | number | boolean | string[];
  } = {},
) {
  let queryObject: {
    [key: string]: string | number | boolean | string[];
  } = {};
  queryString &&
    decodeURIComponent(queryString.replace('?', ''))
      .split('&')
      .map((itemString) => {
        let [itemKey, itemValue] = itemString.split('=');
        if (options.hasOwnProperty(itemKey)) {
          if (!queryObject[itemKey] && Array.isArray(options[itemKey])) {
            queryObject[itemKey] = [];
          }
          Array.isArray(options[itemKey])
            ? (queryObject[itemKey] as string[]).push(itemValue)
            : (queryObject[itemKey] = typeof options[itemKey] === 'number' ? parseInt(itemValue) : itemValue);
        }
      });
  return queryObject;
}
