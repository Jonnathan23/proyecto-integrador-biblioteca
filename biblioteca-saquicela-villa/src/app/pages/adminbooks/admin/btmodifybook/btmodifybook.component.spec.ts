import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtmodifybookComponent } from './btmodifybook.component';

describe('BtmodifybookComponent', () => {
  let component: BtmodifybookComponent;
  let fixture: ComponentFixture<BtmodifybookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtmodifybookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtmodifybookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
