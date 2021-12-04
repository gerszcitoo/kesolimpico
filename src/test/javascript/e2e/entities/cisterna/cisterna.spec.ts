import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CisternaComponentsPage, CisternaDeleteDialog, CisternaUpdatePage } from './cisterna.page-object';

const expect = chai.expect;

describe('Cisterna e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cisternaComponentsPage: CisternaComponentsPage;
  let cisternaUpdatePage: CisternaUpdatePage;
  let cisternaDeleteDialog: CisternaDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cisternas', async () => {
    await navBarPage.goToEntity('cisterna');
    cisternaComponentsPage = new CisternaComponentsPage();
    await browser.wait(ec.visibilityOf(cisternaComponentsPage.title), 5000);
    expect(await cisternaComponentsPage.getTitle()).to.eq('Cisternas');
    await browser.wait(ec.or(ec.visibilityOf(cisternaComponentsPage.entities), ec.visibilityOf(cisternaComponentsPage.noResult)), 1000);
  });

  it('should load create Cisterna page', async () => {
    await cisternaComponentsPage.clickOnCreateButton();
    cisternaUpdatePage = new CisternaUpdatePage();
    expect(await cisternaUpdatePage.getPageTitle()).to.eq('Create or edit a Cisterna');
    await cisternaUpdatePage.cancel();
  });

  it('should create and save Cisternas', async () => {
    const nbButtonsBeforeCreate = await cisternaComponentsPage.countDeleteButtons();

    await cisternaComponentsPage.clickOnCreateButton();

    await promise.all([cisternaUpdatePage.setEstadoInput('estado'), cisternaUpdatePage.setVolumenInput('5')]);

    expect(await cisternaUpdatePage.getEstadoInput()).to.eq('estado', 'Expected Estado value to be equals to estado');
    expect(await cisternaUpdatePage.getVolumenInput()).to.eq('5', 'Expected volumen value to be equals to 5');

    await cisternaUpdatePage.save();
    expect(await cisternaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cisternaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cisterna', async () => {
    const nbButtonsBeforeDelete = await cisternaComponentsPage.countDeleteButtons();
    await cisternaComponentsPage.clickOnLastDeleteButton();

    cisternaDeleteDialog = new CisternaDeleteDialog();
    expect(await cisternaDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Cisterna?');
    await cisternaDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(cisternaComponentsPage.title), 5000);

    expect(await cisternaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
