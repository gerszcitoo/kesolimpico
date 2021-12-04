import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SectorCuradoComponentsPage, SectorCuradoDeleteDialog, SectorCuradoUpdatePage } from './sector-curado.page-object';

const expect = chai.expect;

describe('SectorCurado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sectorCuradoComponentsPage: SectorCuradoComponentsPage;
  let sectorCuradoUpdatePage: SectorCuradoUpdatePage;
  let sectorCuradoDeleteDialog: SectorCuradoDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SectorCurados', async () => {
    await navBarPage.goToEntity('sector-curado');
    sectorCuradoComponentsPage = new SectorCuradoComponentsPage();
    await browser.wait(ec.visibilityOf(sectorCuradoComponentsPage.title), 5000);
    expect(await sectorCuradoComponentsPage.getTitle()).to.eq('Sector Curados');
    await browser.wait(
      ec.or(ec.visibilityOf(sectorCuradoComponentsPage.entities), ec.visibilityOf(sectorCuradoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create SectorCurado page', async () => {
    await sectorCuradoComponentsPage.clickOnCreateButton();
    sectorCuradoUpdatePage = new SectorCuradoUpdatePage();
    expect(await sectorCuradoUpdatePage.getPageTitle()).to.eq('Create or edit a Sector Curado');
    await sectorCuradoUpdatePage.cancel();
  });

  it('should create and save SectorCurados', async () => {
    const nbButtonsBeforeCreate = await sectorCuradoComponentsPage.countDeleteButtons();

    await sectorCuradoComponentsPage.clickOnCreateButton();

    await promise.all([
      sectorCuradoUpdatePage.setFechaEntInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sectorCuradoUpdatePage.setFechaSalInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sectorCuradoUpdatePage.setTemperaturaInput('5'),
      sectorCuradoUpdatePage.setCalidadInput('5'),
      sectorCuradoUpdatePage.setHumedadInput('5'),
      sectorCuradoUpdatePage.setCo2Input('5'),
      sectorCuradoUpdatePage.setPesoEntInput('5'),
      sectorCuradoUpdatePage.setPesoSalInput('5'),
    ]);

    expect(await sectorCuradoUpdatePage.getFechaEntInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaEnt value to be equals to 2000-12-31'
    );
    expect(await sectorCuradoUpdatePage.getFechaSalInput()).to.contain(
      '2001-01-01T02:30',
      'Expected fechaSal value to be equals to 2000-12-31'
    );
    expect(await sectorCuradoUpdatePage.getTemperaturaInput()).to.eq('5', 'Expected temperatura value to be equals to 5');
    expect(await sectorCuradoUpdatePage.getCalidadInput()).to.eq('5', 'Expected calidad value to be equals to 5');
    expect(await sectorCuradoUpdatePage.getHumedadInput()).to.eq('5', 'Expected humedad value to be equals to 5');
    expect(await sectorCuradoUpdatePage.getCo2Input()).to.eq('5', 'Expected co2 value to be equals to 5');
    expect(await sectorCuradoUpdatePage.getPesoEntInput()).to.eq('5', 'Expected pesoEnt value to be equals to 5');
    expect(await sectorCuradoUpdatePage.getPesoSalInput()).to.eq('5', 'Expected pesoSal value to be equals to 5');

    await sectorCuradoUpdatePage.save();
    expect(await sectorCuradoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sectorCuradoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SectorCurado', async () => {
    const nbButtonsBeforeDelete = await sectorCuradoComponentsPage.countDeleteButtons();
    await sectorCuradoComponentsPage.clickOnLastDeleteButton();

    sectorCuradoDeleteDialog = new SectorCuradoDeleteDialog();
    expect(await sectorCuradoDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Sector Curado?');
    await sectorCuradoDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(sectorCuradoComponentsPage.title), 5000);

    expect(await sectorCuradoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
