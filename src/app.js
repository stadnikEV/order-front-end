import initPolyfillFetch from 'utils/polyfills/init-polyfill-fetch';
import PageSelector from 'components/page-selector';
import router from 'router';

initPolyfillFetch()
  .then(() => {
    new PageSelector({ el: document.body });

    const routeHash = router.getRouteHash();
    if (routeHash === '') {
      router.setRouteHash({ routeHash: 'order/list' });
      return;
    }
    router.initRouteHash();
  })
  .catch((err) => {
    console.warn(err);
  });
