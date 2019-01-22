import PubSub from 'pubsub-js';
import router from 'router';
import BaseComponent from 'components/__shared/base-component';
import ButtonText from 'components/buttons/button-text';
import OrderStatistics from 'components/order-statistics';
import template from './template.hbs';
import './style.scss';

class PageOrderStatistics extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.render();
    this.components = {};
    this.eventsPubSub = {};

    this.elements.pageOrderStatistics = document.querySelector('[data-component="page-order-statistics"]');
    this.elements.buttonListContainer = this.elements.pageOrderStatistics.querySelector('[data-element="page-order-statistics__button-list-container"]');
    this.elements.orderStatisticsContainer = this.elements.pageOrderStatistics.querySelector('[data-element="page-order-statistics__order-statistics-container"]');


    this.initButtonList();
    this.initOrderStatistics();
    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.clickList = PubSub.subscribe('click-button-list', this.onClickList.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initButtonList() {
    this.components.buttonList = new ButtonText({
      el: this.elements.buttonListContainer,
      value: 'Список заказов',
      componentName: 'button-list',
      eventName: 'click-button-list',
    });
  }

  initOrderStatistics() {
    this.components.orderStatistics = new OrderStatistics({
      el: this.elements.orderStatisticsContainer,
    });
  }

  onClickList() {
    router.setRouteHash({ routeHash: 'order/list' });
  }
}

export default PageOrderStatistics;
