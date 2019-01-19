import BaseComponent from 'components/__shared/base-component';
import './style.scss';
import template from './template.hbs';


export default class ButtonSubmit extends BaseComponent {
  constructor({
    el,
    value,
    componentName,
  }) {
    super({ el });
    this.eventsPubSub = {};

    this.render({ value, componentName });
  }

  render(options) {
    this.el.innerHTML = template(options);
  }
}
