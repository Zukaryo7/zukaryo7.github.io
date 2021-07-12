import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DakutenComponent } from './dakuten.component';

describe('DakutenComponent', () => {
  let component: DakutenComponent;
  let fixture: ComponentFixture<DakutenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DakutenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DakutenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
