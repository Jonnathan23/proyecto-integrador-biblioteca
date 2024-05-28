import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtaddbookComponent } from './btaddbook.component';

describe('BtaddbookComponent', () => {
  let component: BtaddbookComponent;
  let fixture: ComponentFixture<BtaddbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtaddbookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtaddbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
