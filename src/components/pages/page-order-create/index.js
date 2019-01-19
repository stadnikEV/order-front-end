import PubSub from 'pubsub-js';
import router from 'router';
import httpRequest from 'utils/http-request.js';
import BaseComponent from 'components/__shared/base-component';
import FormCreateOrder from 'components/forms/form-create-order';
import template from './template.hbs';
import './style.scss';

class PageOrderCreate extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.render();
    this.components = {};
    this.eventsPubSub = {};

    this.elements.pageOrderCreate = document.querySelector('[data-component="page-order-create"]');
    this.elements.formCreateOrderContainer = this.elements.pageOrderCreate.querySelector('[data-element="page-order-create__form-create-order"]');

    this.initFormCreateOrder();
    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.createOrderData = PubSub.subscribe('create-order-data', this.onSendData.bind(this));
    this.eventsPubSub.cancel = PubSub.subscribe('button-cancel', this.onCancel.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initFormCreateOrder() {
    this.components.formCreateOrder = new FormCreateOrder({
      el: this.elements.formCreateOrderContainer,
    });
  }

  onSendData(msg, data) {
    this.components.formCreateOrder.formDisable();
    httpRequest.put({
      url: 'http://localhost:8080/orders',
      options: { data },
    })
      .then(() => {
        router.setRouteHash({ routeHash: 'order/list' });
      })
      .catch((err) => {
        this.components.formCreateOrder.formEnable();
        console.warn(err);
      });
  }

  onCancel() {
    router.setRouteHash({ routeHash: 'order/list' });
  }
}

export default PageOrderCreate;
