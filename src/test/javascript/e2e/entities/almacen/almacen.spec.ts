import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AlmacenComponentsPage, AlmacenDeleteDialog, AlmacenUpdatePage } from './almacen.page-object';

const expect = chai.expect;

describe('Almacen e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let almacenComponentsPage: AlmacenComponentsPage;
  let almacenUpdatePage: AlmacenUpdatePage;
  let almacenDeleteDialog: AlmacenDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Almacens', async () => {
    await navBarPage.goToEntity('almacen');
    almacenComponentsPage = new AlmacenComponentsPage();
    await browser.wait(ec.visibilityOf(almacenComponentsPage.title), 5000);
    expect(await almacenComponentsPage.getTitle()).to.eq('Almacens');
    await browser.wait(ec.or(ec.visibilityOf(almacenComponentsPage.entities), ec.visibilityOf(almacenComponentsPage.noResult)), 1000);
  });

  it('should load create Almacen page', async () => {
    await almacenComponentsPage.clickOnCreateButton();
    almacenUpdatePage = new AlmacenUpdatePage();
    expect(await almacenUpdatePage.getPageTitle()).to.eq('Create or edit a Almacen');
    await almacenUpdatePage.cancel();
  });

  it('should create and save Almacens', async () => {
    const nbButtonsBeforeCreate = await almacenComponentsPage.countDeleteButtons();

    await almacenComponentsPage.clickOnCreateButton();

    await promise.all([
      almacenUpdatePage.setEstadoInput('5'),
      almacenUpdatePage.setFechaEntInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      almacenUpdatePage.setFechaSalInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
    ]);

    expect(await almacenUpdatePage.getEstadoInput()).to.eq('5', 'Expected estado value to be equals to 5');
    expect(await almacenUpdatePage.getFechaEntInput()).to.contain('2001-01-01T02:30', 'Expected fechaEnt value to be equals to 2000-12-31');
    expect(await almacenUpdatePage.getFechaSalInput()).to.contain('2001-01-01T02:30', 'Expected fechaSal value to be equals to 2000-12-31');

    await almacenUpdatePage.save();
    expect(await almacenUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await almacenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Almacen', async () => {
    const nbButtonsBeforeDelete = await almacenComponentsPage.countDeleteButtons();
    await almacenComponentsPage.clickOnLastDeleteButton();

    almacenDeleteDialog = new AlmacenDeleteDialog();
    expect(await almacenDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Almacen?');
    await almacenDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(almacenComponentsPage.title), 5000);

    expect(await almacenComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
