import { element, by, ElementFinder } from 'protractor';

export class SectorProduccionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sector-produccion div table .btn-danger'));
  title = element.all(by.css('jhi-sector-produccion div h2#page-heading span')).first();
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

export class SectorProduccionUpdatePage {
  pageTitle = element(by.id('jhi-sector-produccion-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  pesoInput = element(by.id('field_peso'));

  fermentosSelect = element(by.id('field_fermentos'));
  recepcionSelect = element(by.id('field_recepcion'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setPesoInput(peso: string): Promise<void> {
    await this.pesoInput.sendKeys(peso);
  }

  async getPesoInput(): Promise<string> {
    return await this.pesoInput.getAttribute('value');
  }

  async fermentosSelectLastOption(): Promise<void> {
    await this.fermentosSelect.all(by.tagName('option')).last().click();
  }

  async fermentosSelectOption(option: string): Promise<void> {
    await this.fermentosSelect.sendKeys(option);
  }

  getFermentosSelect(): ElementFinder {
    return this.fermentosSelect;
  }

  async getFermentosSelectedOption(): Promise<string> {
    return await this.fermentosSelect.element(by.css('option:checked')).getText();
  }

  async recepcionSelectLastOption(): Promise<void> {
    await this.recepcionSelect.all(by.tagName('option')).last().click();
  }

  async recepcionSelectOption(option: string): Promise<void> {
    await this.recepcionSelect.sendKeys(option);
  }

  getRecepcionSelect(): ElementFinder {
    return this.recepcionSelect;
  }

  async getRecepcionSelectedOption(): Promise<string> {
    return await this.recepcionSelect.element(by.css('option:checked')).getText();
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

export class SectorProduccionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sectorProduccion-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sectorProduccion'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
