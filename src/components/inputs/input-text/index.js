import BaseInput from 'components/__shared/base-input';
import './style.scss';
import template from './template.hbs';


export default class InputText extends BaseInput {
  constructor({ el, componentName }) {
    super({ el });

    this.render({ componentName });
    this.elements.input = document.querySelector(`[data-component="${componentName}"]`);
  }

  render({ componentName }) {
    this.el.innerHTML = template({ componentName });
  }
}
