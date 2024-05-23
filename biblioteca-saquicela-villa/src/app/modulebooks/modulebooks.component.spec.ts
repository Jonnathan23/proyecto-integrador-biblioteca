import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulebooksComponent } from './modulebooks.component';

describe('ModulebooksComponent', () => {
  let component: ModulebooksComponent;
  let fixture: ComponentFixture<ModulebooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulebooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulebooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
