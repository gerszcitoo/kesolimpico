import { element, by, ElementFinder } from 'protractor';

export class SectorCuradoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sector-curado div table .btn-danger'));
  title = element.all(by.css('jhi-sector-curado div h2#page-heading span')).first();
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

export class SectorCuradoUpdatePage {
  pageTitle = element(by.id('jhi-sector-curado-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  fechaEntInput = element(by.id('field_fechaEnt'));
  fechaSalInput = element(by.id('field_fechaSal'));
  temperaturaInput = element(by.id('field_temperatura'));
  calidadInput = element(by.id('field_calidad'));
  humedadInput = element(by.id('field_humedad'));
  co2Input = element(by.id('field_co2'));
  pesoEntInput = element(by.id('field_pesoEnt'));
  pesoSalInput = element(by.id('field_pesoSal'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
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

  async setTemperaturaInput(temperatura: string): Promise<void> {
    await this.temperaturaInput.sendKeys(temperatura);
  }

  async getTemperaturaInput(): Promise<string> {
    return await this.temperaturaInput.getAttribute('value');
  }

  async setCalidadInput(calidad: string): Promise<void> {
    await this.calidadInput.sendKeys(calidad);
  }

  async getCalidadInput(): Promise<string> {
    return await this.calidadInput.getAttribute('value');
  }

  async setHumedadInput(humedad: string): Promise<void> {
    await this.humedadInput.sendKeys(humedad);
  }

  async getHumedadInput(): Promise<string> {
    return await this.humedadInput.getAttribute('value');
  }

  async setCo2Input(co2: string): Promise<void> {
    await this.co2Input.sendKeys(co2);
  }

  async getCo2Input(): Promise<string> {
    return await this.co2Input.getAttribute('value');
  }

  async setPesoEntInput(pesoEnt: string): Promise<void> {
    await this.pesoEntInput.sendKeys(pesoEnt);
  }

  async getPesoEntInput(): Promise<string> {
    return await this.pesoEntInput.getAttribute('value');
  }

  async setPesoSalInput(pesoSal: string): Promise<void> {
    await this.pesoSalInput.sendKeys(pesoSal);
  }

  async getPesoSalInput(): Promise<string> {
    return await this.pesoSalInput.getAttribute('value');
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

export class SectorCuradoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sectorCurado-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sectorCurado'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
