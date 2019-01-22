import PubSub from 'pubsub-js';
import router from 'router';
import httpRequest from 'utils/http-request.js';
import BaseComponent from 'components/__shared/base-component';
import ButtonEdit from 'components/buttons/button-edit';
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
        this.elements.pageOrderList = document.querySelector('[data-component="order-list"]');
        this.initButtons(date);
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
    this.eventsPubSub.clickButtonEdit = PubSub.subscribe('go-to-order-edit', this.onClickButtonEdit.bind(this));
  }

  removeEvents() {
    this.unsubscribe();
  }

  initButtons(date) {
    date.forEach((order) => {
      const { id } = order;
      const buttonContainer = this.elements.pageOrderList.querySelector(`[data-element="order-list__button-edit-container-${id}"]`);

      this.components.buttonCreate = new ButtonEdit({
        el: buttonContainer,
        value: 'Редактировать',
        componentName: 'button-edit',
        eventName: 'go-to-order-edit',
        data: { id },
      });
    });
  }

  onClickButtonEdit(msg, data) {
    router.setRouteHash({ routeHash: `order/edit/${data.id}` });
  }

  getData() {
    return httpRequest.get({ url: '<%publicPathApi%>/orders' });
  }
}
