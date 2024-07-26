import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCoordenadasComponent } from './info-coordenadas.component';

describe('InfoCoordenadasComponent', () => {
  let component: InfoCoordenadasComponent;
  let fixture: ComponentFixture<InfoCoordenadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCoordenadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCoordenadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
