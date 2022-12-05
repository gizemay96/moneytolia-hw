import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCampaignModelComponent } from './edit-campaign-model.component';

describe('EditCampaignModelComponent', () => {
  let component: EditCampaignModelComponent;
  let fixture: ComponentFixture<EditCampaignModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCampaignModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCampaignModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
