import BaseButton from 'components/__shared/base-button';
import './style.scss';


export default class ButtonList extends BaseButton {
  constructor(options) {
    options.className = 'button-list';
    super(options);
  }
}
