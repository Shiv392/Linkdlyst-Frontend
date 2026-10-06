import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlShortnerInput } from './url-shortner-input';

describe('UrlShortnerInput', () => {
  let component: UrlShortnerInput;
  let fixture: ComponentFixture<UrlShortnerInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlShortnerInput],
    }).compileComponents();

    fixture = TestBed.createComponent(UrlShortnerInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
