import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesessionComponent } from './modulesession.component';

describe('ModulesessionComponent', () => {
  let component: ModulesessionComponent;
  let fixture: ComponentFixture<ModulesessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModulesessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulesessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
