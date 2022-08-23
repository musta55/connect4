import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoStartsComponent } from './who-starts.component';

describe('WhoStartsComponent', () => {
  let component: WhoStartsComponent;
  let fixture: ComponentFixture<WhoStartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoStartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoStartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
