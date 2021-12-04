import { element, by, ElementFinder } from 'protractor';

export class FermentosComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-fermentos div table .btn-danger'));
  title = element.all(by.css('jhi-fermentos div h2#page-heading span')).first();
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

export class FermentosUpdatePage {
  pageTitle = element(by.id('jhi-fermentos-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaInput = element(by.id('field_fecha'));
  pesoInput = element(by.id('field_peso'));
  calidadInput = element(by.id('field_calidad'));
  detalleInput = element(by.id('field_detalle'));
  tipoQuesoInput = element(by.id('field_tipoQueso'));

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

  async setPesoInput(peso: string): Promise<void> {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput(): Promise<string> {
    return await this.pesoInput.getAttribute('value');
  }

  async setCalidadInput(calidad: string): Promise<void> {
    await this.calidadInput.sendKeys(calidad);
  }

  async getCalidadInput(): Promise<string> {
    return await this.calidadInput.getAttribute('value');
  }

  async setDetalleInput(detalle: string): Promise<void> {
    await this.detalleInput.sendKeys(detalle);
  }

  async getDetalleInput(): Promise<string> {
    return await this.detalleInput.getAttribute('value');
  }

  async setTipoQuesoInput(tipoQueso: string): Promise<void> {
    await this.tipoQuesoInput.sendKeys(tipoQueso);
  }

  async getTipoQuesoInput(): Promise<string> {
    return await this.tipoQuesoInput.getAttribute('value');
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

export class FermentosDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-fermentos-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-fermentos'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
