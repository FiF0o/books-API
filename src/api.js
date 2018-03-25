const BASE_URL = `http://localhost:${process.env.PORT || 3000}/api`
const BOOKS_ROUTE = `books`


const api = function api(url, options, headerOpts = {}) {

  const headers = new Headers(headerOpts);
  options.headers = headers;

  return fetch(url, options)
    .then(
      (resp) => {
      const contentType = resp.headers.get('content-type');
      if (resp.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return resp.json()
            .catch(err => Promise.reject(err));
        }
        return { ok: true, resp };
      }
      return Promise.reject(resp.status);
    },
    (err) => Promise.reject(err)
  )
    .then(
      (resp) => {
      if (resp === undefined) {
        return Promise.reject({ ok: false });
      }
      if (resp && Object.prototype.hasOwnProperty.call(resp, 'ok')) {
        return resp;
      }
      return { ok: true, resp };
    })
    .catch((err) => {
      if (err.message) {
        return err.message;
      }
      return err;
    });
};


export const fetchBooks = () => api(
  `${BASE_URL}/${BOOKS_ROUTE}`,
  {method: 'GET'},
  {
    "Access-Control-Allow-Origin": "*",
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
);

export const fetchBook = bookId => api(
  `${BASE_URL}/${BOOKS_ROUTE}/${bookId}`,
  {method: 'GET'},
);

export const postBook = formData => {
  return api(
    `${BASE_URL}/${BOOKS_ROUTE}`,
    {
      method: 'POST',
      body: formData
    }
  ).then(resp => resp);
}


export { api };
