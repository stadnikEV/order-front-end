export default () => {
  const promise = new Promise((resolve, reject) => {
    if (window.fetch) {
      resolve();
      return;
    }
    import(/* webpackChunkName: "fetch-polyfill" */ 'whatwg-fetch')
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
};
