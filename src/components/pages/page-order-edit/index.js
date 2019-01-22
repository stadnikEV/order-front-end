import PubSub from 'pubsub-js';
import router from 'router';
import httpRequest from 'utils/http-request.js';
import BaseComponent from 'components/__shared/base-component';
import FormOrder from 'components/forms/form-order';
import template from './template.hbs';
import './style.scss';

class PageOrderEdit extends BaseComponent {
  constructor({ el }) {
    super({ el });

    this.render();
    this.components = {};
    this.eventsPubSub = {};

    this.elements.pageOrderEdit = document.querySelector('[data-component="page-order-edit"]');
    this.elements.formOrderContainer = this.elements.pageOrderEdit.querySelector('[data-element="page-order-edit__form-order"]');

    this.id = this.getId();

    this.getData()
      .then((data) => {
        this.initFormOrder(data);
        this.addEvents();
      })
      .catch((e) => {
        if (e.status === 404) {
          router.setRouteHash({ routeHash: 'badHash' });
          return;
        }
        console.warn(e);
      });

    this.getId();
  }

  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.eventsPubSub.orderData = PubSub.subscribe('order-data', this.onSendData.bind(this));
    this.eventsPubSub.cancel = PubSub.subscribe('button-cancel', this.onCancel.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initFormOrder(data) {
    this.components.formOrder = new FormOrder({
      el: this.elements.formOrderContainer,
      values: data,
    });
  }

  getData() {
    return httpRequest.get({ url: `<%publicPathApi%>/orders/${this.id}` });
  }

  getId() {
    const hash = router.getRouteHash();
    return hash.substring(11);
  }

  onSendData(msg, data) {
    httpRequest.post({
      url: `<%publicPathApi%>/orders/${this.id}`,
      options: { data },
    })
      .then(() => {
        router.setRouteHash({ routeHash: 'order/list' });
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  onCancel() {
    router.setRouteHash({ routeHash: 'order/list' });
  }
}

export default PageOrderEdit;
