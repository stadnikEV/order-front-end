import PubSub from 'pubsub-js';
import router from 'router';
import BaseComponent from 'components/__shared/base-component';
import ButtonMain from 'components/buttons/button-main';
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

    this.initButtonCreate();
    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.goToOrderCreate = PubSub.subscribe('go-to-order-create', this.onGoToOrderCreate.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initButtonCreate() {
    this.components.buttonCreate = new ButtonMain({
      el: this.elements.buttonCreateContainer,
      value: 'Создать',
      componentName: 'button-create',
      eventName: 'go-to-order-create',
    });
  }

  onGoToOrderCreate() {
    router.setRouteHash({ routeHash: 'order/create' });
  }
}

export default PageOrderList;
