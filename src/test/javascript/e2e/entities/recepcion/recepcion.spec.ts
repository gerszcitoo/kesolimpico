import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecepcionComponentsPage, RecepcionDeleteDialog, RecepcionUpdatePage } from './recepcion.page-object';

const expect = chai.expect;

describe('Recepcion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recepcionComponentsPage: RecepcionComponentsPage;
  let recepcionUpdatePage: RecepcionUpdatePage;
  let recepcionDeleteDialog: RecepcionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recepcions', async () => {
    await navBarPage.goToEntity('recepcion');
    recepcionComponentsPage = new RecepcionComponentsPage();
    await browser.wait(ec.visibilityOf(recepcionComponentsPage.title), 5000);
    expect(await recepcionComponentsPage.getTitle()).to.eq('Recepcions');
    await browser.wait(ec.or(ec.visibilityOf(recepcionComponentsPage.entities), ec.visibilityOf(recepcionComponentsPage.noResult)), 1000);
  });

  it('should load create Recepcion page', async () => {
    await recepcionComponentsPage.clickOnCreateButton();
    recepcionUpdatePage = new RecepcionUpdatePage();
    expect(await recepcionUpdatePage.getPageTitle()).to.eq('Create or edit a Recepcion');
    await recepcionUpdatePage.cancel();
  });

  it('should create and save Recepcions', async () => {
    const nbButtonsBeforeCreate = await recepcionComponentsPage.countDeleteButtons();

    await recepcionComponentsPage.clickOnCreateButton();

    await promise.all([
      recepcionUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      recepcionUpdatePage.setCalidadInput('5'),
      recepcionUpdatePage.setCantidadInput('5'),
      recepcionUpdatePage.setAnalisisInput('analisis'),
      recepcionUpdatePage.setTamboInput('tambo'),
      recepcionUpdatePage.setTemperaturaInput('5'),
    ]);

    expect(await recepcionUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await recepcionUpdatePage.getCalidadInput()).to.eq('5', 'Expected calidad value to be equals to 5');
    expect(await recepcionUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
    expect(await recepcionUpdatePage.getAnalisisInput()).to.eq('analisis', 'Expected Analisis value to be equals to analisis');
    expect(await recepcionUpdatePage.getTamboInput()).to.eq('tambo', 'Expected Tambo value to be equals to tambo');
    expect(await recepcionUpdatePage.getTemperaturaInput()).to.eq('5', 'Expected temperatura value to be equals to 5');

    await recepcionUpdatePage.save();
    expect(await recepcionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await recepcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Recepcion', async () => {
    const nbButtonsBeforeDelete = await recepcionComponentsPage.countDeleteButtons();
    await recepcionComponentsPage.clickOnLastDeleteButton();

    recepcionDeleteDialog = new RecepcionDeleteDialog();
    expect(await recepcionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Recepcion?');
    await recepcionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(recepcionComponentsPage.title), 5000);

    expect(await recepcionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
