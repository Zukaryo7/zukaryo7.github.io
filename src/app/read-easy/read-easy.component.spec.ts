import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEasyComponent } from './read-easy.component';

describe('ReadEasyComponent', () => {
  let component: ReadEasyComponent;
  let fixture: ComponentFixture<ReadEasyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEasyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
