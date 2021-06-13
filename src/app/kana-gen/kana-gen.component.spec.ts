import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanaGenComponent } from './kana-gen.component';

describe('KanaGenComponent', () => {
  let component: KanaGenComponent;
  let fixture: ComponentFixture<KanaGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanaGenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanaGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
