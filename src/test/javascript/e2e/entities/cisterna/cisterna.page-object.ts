import { element, by, ElementFinder } from 'protractor';

export class CisternaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cisterna div table .btn-danger'));
  title = element.all(by.css('jhi-cisterna div h2#page-heading span')).first();
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

export class CisternaUpdatePage {
  pageTitle = element(by.id('jhi-cisterna-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  estadoInput = element(by.id('field_estado'));
  volumenInput = element(by.id('field_volumen'));

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

  async setVolumenInput(volumen: string): Promise<void> {
    await this.volumenInput.sendKeys(volumen);
  }

  async getVolumenInput(): Promise<string> {
    return await this.volumenInput.getAttribute('value');
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

export class CisternaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cisterna-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cisterna'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
