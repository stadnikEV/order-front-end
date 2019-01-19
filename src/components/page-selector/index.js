import router from 'router';
import PubSub from 'pubsub-js';
import BaseComponent from 'components/__shared/base-component';
import 'components/__shared/css/reset.scss'; // css
import 'components/__shared/css/base.scss'; // css
import './style.scss';
import template from './template.hbs'; // template


export default class PageSelector extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.components = {};
    this.eventsPubSub = {};

    this.render();
    this.elements.pageSelector = document.querySelector('[data-component="page-selector"]');
    this.elements.pageOrderListContainer = this.elements.pageSelector.querySelector('[data-element="page-selector__page-order-list-container"]');
    this.elements.pageOrderCreateContainer = this.elements.pageSelector.querySelector('[data-element="page-selector__page-order-create-container"]');
    this.elements.pageOrderStatisticsContainer = this.elements.pageSelector.querySelector('[data-element="page-selector__page-order-statistics-container"]');

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
    if (routeHash === 'badHash') {
      this.initPageBadHash();
      return;
    }

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
      // return;
    }
  }

  initPageOrderList() {
    import(/* webpackChunkName: "page-order-list" */ '../pages/page-order-list')
      .then((Module) => {
        if (router.getRouteHash() !== 'order/list') {
          return;
        }
        const PageOrderList = Module.default;
        this.components.pageOrderList = new PageOrderList({ el: this.elements.pageOrderListContainer });
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
        document.documentElement.classList.add('height100Percent');
        this.components.pageOrderCreate = new PageOrderCreate({ el: this.elements.pageOrderCreateContainer });
        this.currentMainComponentName = 'pageOrderCreate';
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
        this.removeAllComponents();
        document.documentElement.classList.add('height100Percent');
        this.components.pageBadHash = new PageBadHash({ el: this.elements.pageSelector });
        this.currentMainComponentName = 'pageBadHash';
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
