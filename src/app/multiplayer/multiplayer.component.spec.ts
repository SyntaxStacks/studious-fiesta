import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplayerModule } from './';
import { MultiplayerComponent } from './multiplayer.component';

describe('MultiplayerComponent', () => {
  let component: MultiplayerComponent;
  let fixture: ComponentFixture<MultiplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MultiplayerModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
