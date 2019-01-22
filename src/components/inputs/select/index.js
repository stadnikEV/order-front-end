import BaseInput from 'components/__shared/base-input';
import './style.scss';
import template from './template.hbs';


export default class Select extends BaseInput {
  constructor({
    el,
    componentName,
    options,
  }) {
    super({ el });

    this.render({ options, componentName });
    this.elements.input = document.querySelector(`[data-component="${componentName}"]`);
  }

  render(options) {
    this.el.innerHTML = template(options);
  }
}
