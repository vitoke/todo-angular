import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoControlsComponent } from './todo-controls.component';

describe('TodoControlsComponent', () => {
  let component: TodoControlsComponent;
  let fixture: ComponentFixture<TodoControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
