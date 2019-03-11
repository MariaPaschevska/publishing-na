import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthErrorMessageComponent } from './auth-error-message.component';

describe('AuthErrorMessageComponent', () => {
  let component: AuthErrorMessageComponent;
  let fixture: ComponentFixture<AuthErrorMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthErrorMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
