import HttpError from 'utils/http-error.js';

const httpRequest = () => {
  if (window.httpRequest) {
    return window.httpRequest;
  }

  class HttpRequest {
    get({ url, options = {} }) {
      options.method = 'get';
      const params = this.prepareParams(options);
      return this.request(url, params);
    }

    post({ url, options = {} }) {
      options.method = 'post';
      const params = this.prepareParams(options);
      return this.request(url, params);
    }

    put({ url, options = {} }) {
      options.method = 'put';
      const params = this.prepareParams(options);
      return this.request(url, params);
    }

    delete({ url, options = {} }) {
      options.method = 'delete';
      return this.request(url, options);
    }


    prepareParams({ contentType = 'application/json', data, method }) {
      const params = {
        method,
        headers: {
          'Content-Type': contentType,
        },
      };

      if (data) {
        params.body = JSON.stringify(data);
      }

      return params;
    }


    request(url, options) {
      let response = null;
      let dataType = null;

      const promise = new Promise((resolve, reject) => {
        fetch(url, options)
          .then((res) => {
            response = res;
            dataType = response.headers.get('content-type');
            if (dataType === 'application/json; charset=utf-8') {
              const json = response.json();
              return json;
            }
            return Promise.reject(new HttpError({
              status: 404,
              message: 'Not found',
            }));
          })
          .then((responeData) => {
            if (response.status !== 200 && response.status !== 201) {
              return Promise.reject(new HttpError({
                status: responeData.status,
                message: responeData.message,
              }));
            }
            return resolve(responeData);
          })
          .catch((err) => {
            reject(err);
          });
      });

      return promise;
    }
  }

  window.httpRequest = new HttpRequest();
  return window.httpRequest;
};

export default httpRequest();
