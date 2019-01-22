import router from 'router';
import PubSub from 'pubsub-js';
import BaseComponent from 'components/__shared/base-component';
import 'components/__shared/css/reset.scss';
import 'components/__shared/css/base.scss';
import './style.scss';
import template from './template.hbs';


export default class PageSelector extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.components = {};
    this.eventsPubSub = {};

    this.render();
    this.elements.pageSelector = document.querySelector('[data-component="page-selector"]');

    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.hashChange = PubSub.subscribe('routeHashChange', this.onHashChange.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  onHashChange(msg, { routeHash }) {
    if (this.currentMainComponentName !== undefined) {
      this.removeComponent({ componentName: this.currentMainComponentName });
      document.documentElement.classList.remove('height100Percent');
    }

    if (routeHash === 'order/list') {
      this.initPageOrderList();
      return;
    }
    if (routeHash === 'order/create') {
      this.initPageOrderCreate();
      return;
    }
    if (routeHash.search(/^order\/edit\/[0-9]+$/) !== -1) {
      this.initPageOrderEdit();
      return;
    }
    if (routeHash === 'badHash') {
      this.initPageBadHash();
      return;
    }
    if (routeHash === 'order/statistics') {
      this.initPageStatistics();
    }
  }

  initPageOrderList() {
    import(/* webpackChunkName: "page-order-list" */ '../pages/page-order-list')
      .then((Module) => {
        if (router.getRouteHash() !== 'order/list') {
          return;
        }
        const PageOrderList = Module.default;
        this.components.pageOrderList = new PageOrderList({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageOrderList';
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  initPageOrderCreate() {
    import(/* webpackChunkName: "page-order-create" */ '../pages/page-order-create')
      .then((Module) => {
        if (router.getRouteHash() !== 'order/create') {
          return;
        }
        const PageOrderCreate = Module.default;
        this.components.pageOrderCreate = new PageOrderCreate({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageOrderCreate';
        document.documentElement.classList.add('height100Percent');
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  initPageOrderEdit() {
    import(/* webpackChunkName: "page-order-edit" */ '../pages/page-order-edit')
      .then((Module) => {
        if (router.getRouteHash()
          .search(/^order\/edit\/[0-9]+$/) === -1) {
          return;
        }
        const PageOrderEdit = Module.default;
        this.components.pageOrderEdit = new PageOrderEdit({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageOrderEdit';
        document.documentElement.classList.add('height100Percent');
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  initPageStatistics() {
    import(/* webpackChunkName: "page-order-statistics" */ '../pages/page-order-statistics')
      .then((Module) => {
        if (router.getRouteHash() !== 'order/statistics') {
          return;
        }
        const PageOrderStatistics = Module.default;
        this.components.pageOrderStatistics = new PageOrderStatistics({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageOrderStatistics';
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  initPageBadHash() {
    import(/* webpackChunkName: "page-bad-hash" */ '../pages/page-bad-hash')
      .then((Module) => {
        if (router.getRouteHash() !== 'badHash') {
          return;
        }
        const PageBadHash = Module.default;
        this.components.pageBadHash = new PageBadHash({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageBadHash';
        document.documentElement.classList.add('height100Percent');
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
