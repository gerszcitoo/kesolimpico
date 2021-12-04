import { element, by, ElementFinder } from 'protractor';

export class AlmacenComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-almacen div table .btn-danger'));
  title = element.all(by.css('jhi-almacen div h2#page-heading span')).first();
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

export class AlmacenUpdatePage {
  pageTitle = element(by.id('jhi-almacen-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  estadoInput = element(by.id('field_estado'));
  fechaEntInput = element(by.id('field_fechaEnt'));
  fechaSalInput = element(by.id('field_fechaSal'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setEstadoInput(estado: string): Promise<void> {
    await this.estadoInput.sendKeys(estado);
  }

  async getEstadoInput(): Promise<string> {
    return await this.estadoInput.getAttribute('value');
  }

  async setFechaEntInput(fechaEnt: string): Promise<void> {
    await this.fechaEntInput.sendKeys(fechaEnt);
  }

  async getFechaEntInput(): Promise<string> {
    return await this.fechaEntInput.getAttribute('value');
  }

  async setFechaSalInput(fechaSal: string): Promise<void> {
    await this.fechaSalInput.sendKeys(fechaSal);
  }

  async getFechaSalInput(): Promise<string> {
    return await this.fechaSalInput.getAttribute('value');
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

export class AlmacenDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-almacen-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-almacen'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
