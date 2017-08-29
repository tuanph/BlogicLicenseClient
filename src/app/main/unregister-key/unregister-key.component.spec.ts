import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterKeyComponent } from './unregister-key.component';

describe('UnregisterKeyComponent', () => {
  let component: UnregisterKeyComponent;
  let fixture: ComponentFixture<UnregisterKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
