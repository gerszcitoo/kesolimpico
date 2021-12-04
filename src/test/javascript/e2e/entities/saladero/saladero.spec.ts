import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SaladeroComponentsPage, SaladeroDeleteDialog, SaladeroUpdatePage } from './saladero.page-object';

const expect = chai.expect;

describe('Saladero e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let saladeroComponentsPage: SaladeroComponentsPage;
  let saladeroUpdatePage: SaladeroUpdatePage;
  let saladeroDeleteDialog: SaladeroDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Saladeros', async () => {
    await navBarPage.goToEntity('saladero');
    saladeroComponentsPage = new SaladeroComponentsPage();
    await browser.wait(ec.visibilityOf(saladeroComponentsPage.title), 5000);
    expect(await saladeroComponentsPage.getTitle()).to.eq('Saladeros');
    await browser.wait(ec.or(ec.visibilityOf(saladeroComponentsPage.entities), ec.visibilityOf(saladeroComponentsPage.noResult)), 1000);
  });

  it('should load create Saladero page', async () => {
    await saladeroComponentsPage.clickOnCreateButton();
    saladeroUpdatePage = new SaladeroUpdatePage();
    expect(await saladeroUpdatePage.getPageTitle()).to.eq('Create or edit a Saladero');
    await saladeroUpdatePage.cancel();
  });

  it('should create and save Saladeros', async () => {
    const nbButtonsBeforeCreate = await saladeroComponentsPage.countDeleteButtons();

    await saladeroComponentsPage.clickOnCreateButton();

    await promise.all([
      saladeroUpdatePage.setFechaEntInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      saladeroUpdatePage.setFechaSalInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      saladeroUpdatePage.setPesoInput('5'),
    ]);

    expect(await saladeroUpdatePage.getFechaEntInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaEnt value to be equals to 2000-12-31'
    );
    expect(await saladeroUpdatePage.getFechaSalInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaSal value to be equals to 2000-12-31'
    );
    expect(await saladeroUpdatePage.getPesoInput()).to.eq('5', 'Expected peso value to be equals to 5');

    await saladeroUpdatePage.save();
    expect(await saladeroUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await saladeroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Saladero', async () => {
    const nbButtonsBeforeDelete = await saladeroComponentsPage.countDeleteButtons();
    await saladeroComponentsPage.clickOnLastDeleteButton();

    saladeroDeleteDialog = new SaladeroDeleteDialog();
    expect(await saladeroDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Saladero?');
    await saladeroDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(saladeroComponentsPage.title), 5000);

    expect(await saladeroComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
