import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulobooksComponent } from './modulobooks.component';

describe('ModulobooksComponent', () => {
  let component: ModulobooksComponent;
  let fixture: ComponentFixture<ModulobooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulobooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulobooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
