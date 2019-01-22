import BaseInput from 'components/__shared/base-input';
import './style.scss';
import template from './template.hbs';


export default class InputText extends BaseInput {
  constructor({ el, componentName, value }) {
    super({ el });

    this.render({ componentName });
    this.elements.input = document.querySelector(`[data-component="${componentName}"]`);

    if (value) {
      this.setValue(value);
    }
  }

  render({ componentName }) {
    this.el.innerHTML = template({ componentName });
  }

  setValue(value) {
    this.elements.input.value = value;
  }
}
