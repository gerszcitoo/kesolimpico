import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FermentosComponentsPage, FermentosDeleteDialog, FermentosUpdatePage } from './fermentos.page-object';

const expect = chai.expect;

describe('Fermentos e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fermentosComponentsPage: FermentosComponentsPage;
  let fermentosUpdatePage: FermentosUpdatePage;
  let fermentosDeleteDialog: FermentosDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fermentos', async () => {
    await navBarPage.goToEntity('fermentos');
    fermentosComponentsPage = new FermentosComponentsPage();
    await browser.wait(ec.visibilityOf(fermentosComponentsPage.title), 5000);
    expect(await fermentosComponentsPage.getTitle()).to.eq('Fermentos');
    await browser.wait(ec.or(ec.visibilityOf(fermentosComponentsPage.entities), ec.visibilityOf(fermentosComponentsPage.noResult)), 1000);
  });

  it('should load create Fermentos page', async () => {
    await fermentosComponentsPage.clickOnCreateButton();
    fermentosUpdatePage = new FermentosUpdatePage();
    expect(await fermentosUpdatePage.getPageTitle()).to.eq('Create or edit a Fermentos');
    await fermentosUpdatePage.cancel();
  });

  it('should create and save Fermentos', async () => {
    const nbButtonsBeforeCreate = await fermentosComponentsPage.countDeleteButtons();

    await fermentosComponentsPage.clickOnCreateButton();

    await promise.all([
      fermentosUpdatePage.setFechaInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      fermentosUpdatePage.setPesoInput('5'),
      fermentosUpdatePage.setCalidadInput('5'),
      fermentosUpdatePage.setDetalleInput('detalle'),
      fermentosUpdatePage.setTipoQuesoInput('tipoQueso'),
    ]);

    expect(await fermentosUpdatePage.getFechaInput()).to.contain('2001-01-01T02:30', 'Expected fecha value to be equals to 2000-12-31');
    expect(await fermentosUpdatePage.getPesoInput()).to.eq('5', 'Expected peso value to be equals to 5');
    expect(await fermentosUpdatePage.getCalidadInput()).to.eq('5', 'Expected calidad value to be equals to 5');
    expect(await fermentosUpdatePage.getDetalleInput()).to.eq('detalle', 'Expected Detalle value to be equals to detalle');
    expect(await fermentosUpdatePage.getTipoQuesoInput()).to.eq('tipoQueso', 'Expected TipoQueso value to be equals to tipoQueso');

    await fermentosUpdatePage.save();
    expect(await fermentosUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fermentosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Fermentos', async () => {
    const nbButtonsBeforeDelete = await fermentosComponentsPage.countDeleteButtons();
    await fermentosComponentsPage.clickOnLastDeleteButton();

    fermentosDeleteDialog = new FermentosDeleteDialog();
    expect(await fermentosDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Fermentos?');
    await fermentosDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(fermentosComponentsPage.title), 5000);

    expect(await fermentosComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
