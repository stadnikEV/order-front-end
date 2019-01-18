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
    this.elements.page = document.querySelector('[data-component="page"]');
    this.elements.orderListContainer = this.elements.page.querySelector('[data-element="page__order-list-container"]');
    this.elements.orderCreateContainer = this.elements.page.querySelector('[data-element="page__order-create-container"]');
    this.elements.orderStatisticsContainer = this.elements.page.querySelector('[data-element="page__order-statistics-container"]');

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
      this.initBadHash();
      return;
    }

    if (this.currentMainComponentName !== undefined) {
      this.removeComponent({ componentName: this.currentMainComponentName });
      document.documentElement.classList.remove('height100Percent');
    }

    if (routeHash === 'order/list') {
      this.initOrderList();
      // return;
    }
  }

  initOrderList() {
    import(/* webpackChunkName: "order-list" */ '../pages/page-order-list')
      .then((Module) => {
        if (router.getRouteHash() !== 'order/list') {
          return;
        }
        const PageOrderList = Module.default;
        this.components.orderList = new PageOrderList({ el: this.elements.orderListContainer });
        this.currentMainComponentName = 'orderList';
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  initBadHash() {
    import(/* webpackChunkName: "bad-hash" */ '../pages/page-bad-hash')
      .then((Module) => {
        if (router.getRouteHash() !== 'badHash') {
          return;
        }
        const PageBadHash = Module.default;
        this.removeAllComponents();
        document.documentElement.classList.add('height100Percent');
        this.components.badHash = new PageBadHash({ el: this.elements.page });
        this.currentMainComponentName = 'badHash';
      })
      .catch((err) => {
        console.warn(err);
      });
  }
}
