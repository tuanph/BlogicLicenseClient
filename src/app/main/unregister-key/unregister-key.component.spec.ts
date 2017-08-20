import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterProductComponent } from './unregister-product.component';

describe('UnregisterProductComponent', () => {
  let component: UnregisterProductComponent;
  let fixture: ComponentFixture<UnregisterProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
