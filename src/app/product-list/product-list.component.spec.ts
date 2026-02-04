import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';

import { select, Store } from '@ngrx/store';

const storeMock = {
  dispatch: jasmine.createSpy('dispatch'),
  select: jasmine.createSpy('select')
};

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

   it('should add the product', () => {
    expect(component.addProduct).toBeTruthy();
  });

  it('should delete the product', () => {
    expect(component.deleteProduct).toBeTruthy();
  });

    it('should cancel edit', () => {
    expect(component.cancelEdit).toBeTruthy();
  });

    it('should save edit', () => {
    expect(component.saveEdit).toBeTruthy();
  });

    it('should enable editing', () => {
    expect(component.startEdit).toBeTruthy();
  });

    it('should search the form', () => {
    expect(component.searchForm).toBeTruthy();
  });

    it('should dispatch addProduct action when addProduct is called', () => {
    component.rowData = []; // mock existing data
    component.addProduct();
    expect(storeMock.dispatch).toHaveBeenCalled();
  });

});
