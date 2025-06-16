import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginC } from './login.c';

describe('LoginC', () => {
  let component: LoginC;
  let fixture: ComponentFixture<LoginC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
