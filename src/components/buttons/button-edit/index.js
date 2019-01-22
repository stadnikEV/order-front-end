import BaseButton from 'components/__shared/base-button';
import './style.scss';


export default class ButtonMain extends BaseButton {
  constructor(options) {
    options.className = 'button-edit';
    super(options);
  }
}
