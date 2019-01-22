import PubSub from 'pubsub-js';
import router from 'router';
import httpRequest from 'utils/http-request.js';
import BaseComponent from 'components/__shared/base-component';
import './style.scss';
import template from './template.hbs';


export default class orderList extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.components = {};
    this.eventsPubSub = {};

    this.getData()
      .then((date) => {
        this.render(date);
      })
      .catch((e) => {
        console.warn(e);
      });

    this.addEvents();
  }


  render(date) {
    this.el.innerHTML = template({ date });
  }

  addEvents() {
    this.eventsPubSub.clickList = PubSub.subscribe('go-to-order-edit', this.onClickList.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  onClickList() {
    router.setRouteHash({ routeHash: 'order/list' });
  }

  getData() {
    return httpRequest.get({ url: '<%publicPathApi%>/orders-statistics' });
  }
}
