import PubSub from 'pubsub-js';
import BaseComponent from 'components/__shared/base-component';
import './style.scss';
import template from './template.hbs';


export default class BaseButton extends BaseComponent {
  constructor({
    el,
    value,
    componentName,
    className,
    eventName,
    data,
  }) {
    super({ el });

    this.componentName = componentName;
    this.eventName = eventName;
    this.data = data;

    this.render({
      value,
      componentName,
      className,
    });

    this.elements.button = el.querySelector(`[data-component="${componentName}"]`);
    this.onButtonClick = this.onButtonClick.bind(this);

    this.addEvents();
  }

  render(options) {
    this.el.innerHTML = template(options);
  }

  addEvents() {
    this.elements.button.addEventListener('click', this.onButtonClick);
  }

  removeEvents() {
    this.elements.button.removeEventListener('click', this.onButtonClick);
  }

  onButtonClick(e) {
    e.preventDefault();
    PubSub.publish(this.eventName, this.data);
  }
}
