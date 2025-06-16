import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterC } from './register.c';

describe('RegisterC', () => {
  let component: RegisterC;
  let fixture: ComponentFixture<RegisterC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
