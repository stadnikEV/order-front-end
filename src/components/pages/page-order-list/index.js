import PubSub from 'pubsub-js';
import router from 'router';
import BaseComponent from 'components/__shared/base-component';
import ButtonMain from 'components/buttons/button-main';
import ButtonText from 'components/buttons/button-text';
import OrderList from 'components/order-list';
import template from './template.hbs';
import './style.scss';

class PageOrderList extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.render();
    this.components = {};
    this.eventsPubSub = {};

    this.elements.pageOrderList = document.querySelector('[data-component="page-order-list"]');
    this.elements.buttonCreateContainer = this.elements.pageOrderList.querySelector('[data-element="page-order-list__button-create-container"]');
    this.elements.buttonStatisticsContainer = this.elements.pageOrderList.querySelector('[data-element="page-order-list__button-statistics-container"]');
    this.elements.orderListContainer = this.elements.pageOrderList.querySelector('[data-element="page-order-list__order-list-container"]');

    this.initButtonCreate();
    this.initButtonStatistics();
    this.initOrderList();
    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.clickCreate = PubSub.subscribe('click-button-create', this.onClickCreate.bind(this));
    this.eventsPubSub.clickStatistics = PubSub.subscribe('click-button-statistics', this.onClickStatistics.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initButtonCreate() {
    this.components.buttonCreate = new ButtonMain({
      el: this.elements.buttonCreateContainer,
      value: 'Создать',
      componentName: 'button-create',
      eventName: 'click-button-create',
    });
  }

  initButtonStatistics() {
    this.components.buttonStatistics = new ButtonText({
      el: this.elements.buttonStatisticsContainer,
      value: 'Посмотреть статистику',
      componentName: 'button-statistics',
      eventName: 'click-button-statistics',
    });
  }

  initOrderList() {
    this.components.orderList = new OrderList({
      el: this.elements.orderListContainer,
    });
  }

  onClickCreate() {
    router.setRouteHash({ routeHash: 'order/create' });
  }

  onClickStatistics() {
    router.setRouteHash({ routeHash: 'order/statistics' });
  }
}

export default PageOrderList;
