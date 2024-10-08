import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeyendaComponent } from './leyenda.component';

describe('LeyendaComponent', () => {
  let component: LeyendaComponent;
  let fixture: ComponentFixture<LeyendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeyendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeyendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
