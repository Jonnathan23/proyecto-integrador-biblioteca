import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciosessionComponent } from './iniciosession.component';

describe('IniciosessionComponent', () => {
  let component: IniciosessionComponent;
  let fixture: ComponentFixture<IniciosessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IniciosessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IniciosessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
