import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CommonNavbar } from './common-navbar';

describe('CommonNavbar', () => {
  let component: CommonNavbar;
  let fixture: ComponentFixture<CommonNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonNavbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
