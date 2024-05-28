import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderbienvComponent } from './headerbienv.component';

describe('HeaderbienvComponent', () => {
  let component: HeaderbienvComponent;
  let fixture: ComponentFixture<HeaderbienvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderbienvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderbienvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
