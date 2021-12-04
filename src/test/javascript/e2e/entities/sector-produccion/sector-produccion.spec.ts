import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SectorProduccionComponentsPage, SectorProduccionDeleteDialog, SectorProduccionUpdatePage } from './sector-produccion.page-object';

const expect = chai.expect;

describe('SectorProduccion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sectorProduccionComponentsPage: SectorProduccionComponentsPage;
  let sectorProduccionUpdatePage: SectorProduccionUpdatePage;
  let sectorProduccionDeleteDialog: SectorProduccionDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SectorProduccions', async () => {
    await navBarPage.goToEntity('sector-produccion');
    sectorProduccionComponentsPage = new SectorProduccionComponentsPage();
    await browser.wait(ec.visibilityOf(sectorProduccionComponentsPage.title), 5000);
    expect(await sectorProduccionComponentsPage.getTitle()).to.eq('Sector Produccions');
    await browser.wait(
      ec.or(ec.visibilityOf(sectorProduccionComponentsPage.entities), ec.visibilityOf(sectorProduccionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SectorProduccion page', async () => {
    await sectorProduccionComponentsPage.clickOnCreateButton();
    sectorProduccionUpdatePage = new SectorProduccionUpdatePage();
    expect(await sectorProduccionUpdatePage.getPageTitle()).to.eq('Create or edit a Sector Produccion');
    await sectorProduccionUpdatePage.cancel();
  });

  it('should create and save SectorProduccions', async () => {
    const nbButtonsBeforeCreate = await sectorProduccionComponentsPage.countDeleteButtons();

    await sectorProduccionComponentsPage.clickOnCreateButton();

    await promise.all([
      sectorProduccionUpdatePage.setPesoInput('5'),
      sectorProduccionUpdatePage.fermentosSelectLastOption(),
      sectorProduccionUpdatePage.recepcionSelectLastOption(),
    ]);

    expect(await sectorProduccionUpdatePage.getPesoInput()).to.eq('5', 'Expected peso value to be equals to 5');

    await sectorProduccionUpdatePage.save();
    expect(await sectorProduccionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sectorProduccionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SectorProduccion', async () => {
    const nbButtonsBeforeDelete = await sectorProduccionComponentsPage.countDeleteButtons();
    await sectorProduccionComponentsPage.clickOnLastDeleteButton();

    sectorProduccionDeleteDialog = new SectorProduccionDeleteDialog();
    expect(await sectorProduccionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sector Produccion?');
    await sectorProduccionDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(sectorProduccionComponentsPage.title), 5000);

    expect(await sectorProduccionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
