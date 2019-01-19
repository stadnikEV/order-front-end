import PubSub from 'pubsub-js';
import BaseComponent from 'components/__shared/base-component';
import TipInline from 'components/tip-inline';
import InputText from 'components/inputs/input-text';
import Select from 'components/inputs/select';
import ButtonCancel from 'components/buttons/button-cancel';
import ButtonSubmit from 'components/buttons/button-submit';
import getValidConfig from './get-valid-config';
import tipConfig from './tip-config';
import './style.scss';
import template from './template.hbs';


export default class FormCreateOrder extends BaseComponent {
  constructor({ el }) {
    super({ el });
    this.components = {};

    this.render();
    this.elements.form = document.querySelector('[data-component="form-create-order"]');
    this.elements.inputNameContainer = this.elements.form.querySelector('[data-element="form-create-order__input-name-container"]');
    this.elements.inputAddressContainer = this.elements.form.querySelector('[data-element="form-create-order__input-address-container"]');
    this.elements.inputPhoneContainer = this.elements.form.querySelector('[data-element="form-create-order__input-phone-container"]');
    this.elements.selectStatusContainer = this.elements.form.querySelector('[data-element="form-create-order__select-status-container"]');
    this.elements.buttonCancelContainer = this.elements.form.querySelector('[data-element="form-create-order__button-cancel-container"]');
    this.elements.submitContainer = this.elements.form.querySelector('[data-element="form-create-order__submit-container"]');
    this.elements.tipNameContainer = this.elements.form.querySelector('[data-element="form-create-order__tip-name-container"]');
    this.elements.tipAddressContainer = this.elements.form.querySelector('[data-element="form-create-order__tip-address-container"]');
    this.elements.tipPhoneContainer = this.elements.form.querySelector('[data-element="form-create-order__tip-phone-container"]');

    this.initInputs();
    this.initSubmit();
    this.initButtonCancel();
    this.initTips();

    this.onClick = this.onClick.bind(this);
    this.addEvents();
  }


  render() {
    this.el.innerHTML = template();
  }

  addEvents() {
    this.elements.form.addEventListener('click', this.onClick);
  }

  removeEvents() {
    this.elements.form.removeEventListener('click', this.onClick);
  }

  onClick(e) {
    const submit = e.target.closest('[data-component="submit-create-order"]');

    if (submit) {
      if (!this.elements.form.contains(submit)) {
        return;
      }
      e.preventDefault();

      if (this.inSendProcess) {
        return;
      }

      const nameValue = this.components.inputName.getValue();
      const addressValue = this.components.inputAddress.getValue();
      const phoneValue = this.components.inputPhone.getValue();
      this.status = this.components.selectStatus.getValue();

      const isValid = this.isVAlid({
        name: nameValue,
        address: addressValue,
        phone: phoneValue,
      });
      this.tipHendler(isValid);
      this.setFocus(isValid);

      if (isValid.name
      && isValid.address
      && isValid.phone) {
        PubSub.publish('create-order-data', {
          name: nameValue,
          address: addressValue,
          phone: phoneValue,
          status: this.status,
        });
      }
    }
  }


  isVAlid(inputValues) {
    const validConfig = getValidConfig({ status: this.status });
    const isValid = {};

    Object.keys(inputValues).forEach((inputName) => {
      const isEmpty = inputValues[inputName].length === 0;
      const isRequired = Boolean(validConfig[inputName]);
      if (!isRequired || isRequired === !isEmpty) {
        isValid[inputName] = true;
        return;
      }
      isValid[inputName] = false;
    });

    return isValid;
  }


  tipHendler(isValid) {
    Object.keys(isValid).forEach((inputName) => {
      const tipName = tipConfig[inputName];
      if (!isValid[inputName]) {
        this.components[tipName].showTip({ message: 'Заполните поле' });
        return;
      }
      this.components[tipName].showTip({ message: '' });
    });
  }

  setFocus(isValid) {
    if (!isValid.name) {
      this.components.inputName.setFocus();
      return;
    }
    if (!isValid.address) {
      this.components.inputAddress.setFocus();
      return;
    }
    if (!isValid.phone) {
      this.components.inputPhone.setFocus();
      return;
    }

    document.activeElement.blur();
  }


  formDisable() {
    this.inSendProcess = true;
    this.components.inputName.disable();
    this.components.inputAddress.disable();
    this.components.inputPhone.disable();
    this.components.selectStatus.disable();
  }

  formEnable() {
    this.inSendProcess = false;
    this.components.inputName.enable();
    this.components.inputAddress.enable();
    this.components.inputPhone.enable();
    this.components.selectStatus.enable();
  }

  initInputs() {
    this.components.inputName = new InputText({
      el: this.elements.inputNameContainer,
      componentName: 'input-name',
    });
    this.components.inputAddress = new InputText({
      el: this.elements.inputAddressContainer,
      componentName: 'input-address',
    });
    this.components.inputPhone = new InputText({
      el: this.elements.inputPhoneContainer,
      componentName: 'input-phone',
    });
    this.components.selectStatus = new Select({
      el: this.elements.selectStatusContainer,
      componentName: 'select-status',
      options: [
        {
          value: 'confirmed',
          selected: 'selected',
          content: 'Подтвержден',
        },
        {
          value: 'canceled',
          content: 'Отменен',
        },
        {
          value: 'deferred',
          content: 'Отложен',
        },
      ],
    });
  }

  initButtonCancel() {
    this.components.buttonCancel = new ButtonCancel({
      el: this.elements.buttonCancelContainer,
      value: 'Отмена',
      componentName: 'button-cancel',
      eventName: 'button-cancel',
    });
  }

  initSubmit() {
    this.components.buttonSubmit = new ButtonSubmit({
      el: this.elements.submitContainer,
      componentName: 'submit-create-order',
      value: 'Сохранить',
    });
  }

  initTips() {
    this.components.tipName = new TipInline({
      el: this.elements.tipNameContainer,
      componentName: 'tip-inline-name',
    });
    this.components.tipAddress = new TipInline({
      el: this.elements.tipAddressContainer,
      componentName: 'tip-inline-address',
    });
    this.components.tipPhone = new TipInline({
      el: this.elements.tipPhoneContainer,
      componentName: 'tip-inline-phone',
    });
  }
}
