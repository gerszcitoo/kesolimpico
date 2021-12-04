import { element, by, ElementFinder } from 'protractor';

export class RecepcionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recepcion div table .btn-danger'));
  title = element.all(by.css('jhi-recepcion div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class RecepcionUpdatePage {
  pageTitle = element(by.id('jhi-recepcion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaInput = element(by.id('field_fecha'));
  calidadInput = element(by.id('field_calidad'));
  cantidadInput = element(by.id('field_cantidad'));
  analisisInput = element(by.id('field_analisis'));
  tamboInput = element(by.id('field_tambo'));
  temperaturaInput = element(by.id('field_temperatura'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setCalidadInput(calidad: string): Promise<void> {
    await this.calidadInput.sendKeys(calidad);
  }

  async getCalidadInput(): Promise<string> {
    return await this.calidadInput.getAttribute('value');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setAnalisisInput(analisis: string): Promise<void> {
    await this.analisisInput.sendKeys(analisis);
  }

  async getAnalisisInput(): Promise<string> {
    return await this.analisisInput.getAttribute('value');
  }

  async setTamboInput(tambo: string): Promise<void> {
    await this.tamboInput.sendKeys(tambo);
  }

  async getTamboInput(): Promise<string> {
    return await this.tamboInput.getAttribute('value');
  }

  async setTemperaturaInput(temperatura: string): Promise<void> {
    await this.temperaturaInput.sendKeys(temperatura);
  }

  async getTemperaturaInput(): Promise<string> {
    return await this.temperaturaInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RecepcionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recepcion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recepcion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
