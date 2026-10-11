import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonPaginator } from './common-paginator';

describe('CommonPaginator', () => {
  let component: CommonPaginator;
  let fixture: ComponentFixture<CommonPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonPaginator],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonPaginator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
