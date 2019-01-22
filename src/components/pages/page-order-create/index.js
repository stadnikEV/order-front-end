import PubSub from 'pubsub-js';
import router from 'router';
import httpRequest from 'utils/http-request.js';
import BaseComponent from 'components/__shared/base-component';
import FormOrder from 'components/forms/form-order';
import template from './template.hbs';
import './style.scss';

class PageOrderCreate extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.render();
    this.components = {};
    this.eventsPubSub = {};

    this.elements.pageOrderCreate = document.querySelector('[data-component="page-order-create"]');
    this.elements.formOrderContainer = this.elements.pageOrderCreate.querySelector('[data-element="page-order-create__form-order"]');

    this.initFormOrder();
    this.addEvents();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.orderData = PubSub.subscribe('order-data', this.onSendData.bind(this));
    this.eventsPubSub.clickCancel = PubSub.subscribe('button-cancel', this.onClickCancel.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initFormOrder() {
    this.components.formOrder = new FormOrder({
      el: this.elements.formOrderContainer,
    });
  }

  onSendData(msg, data) {
    this.components.formOrder.formDisable();
    httpRequest.put({
      url: '<%publicPathApi%>/orders',
      options: { data },
    })
      .then(() => {
        router.setRouteHash({ routeHash: 'order/list' });
      })
      .catch((err) => {
        this.components.formOrder.formEnable();
        console.warn(err);
      });
  }

  onClickCancel() {
    router.setRouteHash({ routeHash: 'order/list' });
  }
}

export default PageOrderCreate;
