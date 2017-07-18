import { OtShopClientPage } from './app.po';

describe('ot-shop-client App', () => {
  let page: OtShopClientPage;

  beforeEach(() => {
    page = new OtShopClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
