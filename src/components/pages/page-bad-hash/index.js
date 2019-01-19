import BaseComponent from 'components/__shared/base-component';
import template from './template.hbs';
import './style.scss';

class PageBadHash extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.render();
  }

  render() {
    this.el.innerHTML = template();
  }
}

export default PageBadHash;
