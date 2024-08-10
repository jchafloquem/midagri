import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapasComponent } from './capas.component';

describe('CapasComponent', () => {
  let component: CapasComponent;
  let fixture: ComponentFixture<CapasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
