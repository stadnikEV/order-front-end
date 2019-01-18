import BaseButton from 'components/__shared/base-button';
import './style.scss';


export default class ButtonCreate extends BaseButton {
  constructor(options) {
    options.className = 'button-create';
    super(options);
  }
}
