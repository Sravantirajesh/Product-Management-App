import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent, GetRowIdParams, ICellRendererParams } from 'ag-grid-community';

import { Product } from '../models/product';
import * as ProductActions from '../store/products/product.actions';
import { selectAllProducts } from '../store/products/product.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  rowData: Product[] = [];
  editingRowId: number | null = null;
  private gridApi!: GridApi<Product>;

  searchForm = new FormGroup({
    productId: new FormControl('', [Validators.pattern(/^[0-9]*$/)]),
    productName: new FormControl('')
  });

  columnDefs: ColDef<Product>[] = [
  {
    headerName: 'ID',
    width: 60,
    valueGetter: params =>
      params.node ? params.node.rowIndex! + 1 : ''
  },

    {
      headerName: 'Name',
      field: 'name',
      editable: p => this.isEditing(p.data?.id),
      width: 550
    },
    {
      headerName: 'Cost',
      field: 'cost',
      editable: p => this.isEditing(p.data?.id),
      width: 80
    },
    { headerName: 'Quantity', field: 'quantity', width: 100 },
    { headerName: 'Updated', field: 'updatedDate', width: 130 },

    {
      headerName: 'Actions',
      colId: 'Actions',
      width: 180,
      cellRenderer: (params: ICellRendererParams<Product>) => {
        if (!params.data) return '';

        const isEditing = this.editingRowId === params.data.id;
        const div = document.createElement('div');
        div.className = 'd-flex gap-2';

        div.innerHTML = isEditing
          ? `
            <button class="btn btn-sm btn-success">Save</button>
            <button class="btn btn-sm btn-secondary">Cancel</button>
          `
          : `
            <button class="btn btn-sm btn-primary">Edit</button>
            <button class="btn btn-sm btn-danger">Delete</button>
          `;

        const [btn1, btn2] = Array.from(div.querySelectorAll('button'));

        btn1.onclick = e => {
          e.stopPropagation();
          isEditing
            ? this.saveEdit(params.data!)
            : this.startEdit(params.data!);
        };

        btn2.onclick = e => {
          e.stopPropagation();
          isEditing
            ? this.cancelEdit()
            : this.deleteProduct(params.data!.id);
        };

        return div;
      }
    }
  ];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    // console.log("ngOnInit");
    combineLatest([
      this.store.select(selectAllProducts),
      this.searchForm.valueChanges.pipe(startWith(this.searchForm.value))
    ])
      .pipe(
        map(([products, search]) =>
          products.filter(p =>
            (!search?.productId || p.id.toString().includes(search.productId)) &&
            (!search?.productName ||
              p.name.toLowerCase().includes(search.productName.toLowerCase()))
          )
        )
      )
      .subscribe(data => {
        this.rowData = [...data];

        //  Force AG Grid to update immediately (for delete/add)
        if (this.gridApi) {

  this.gridApi.setRowData(this.rowData);
  this.gridApi.refreshCells({ force: true });
}
      });
  }
  // ngOnChanges () {
  //   console.log("ngOnChanges");
  // }

  onGridReady(e: GridReadyEvent<Product>) {
    this.gridApi = e.api;
  }

  //  required for correct delete/update
  getRowId = (params: GetRowIdParams<Product>) =>
    params.data.id.toString();

  isEditing(id?: number) {
    return this.editingRowId === id;
  }

  refreshActions() {
    this.gridApi.refreshCells({
      columns: ['Actions'],
      force: true
    });
  }

  startEdit(product: Product) {
    this.editingRowId = product.id;
    this.refreshActions();

    this.gridApi.startEditingCell({
      rowIndex: this.rowData.findIndex(p => p.id === product.id),
      colKey: 'name'
    });
  }

  saveEdit(product: Product) {
    this.gridApi.stopEditing();

    const node = this.gridApi.getRowNode(product.id.toString());
    if (!node?.data) return;

    this.store.dispatch(
      ProductActions.updateProduct({
        product: { ...node.data, updatedDate: new Date() }
      })
    );

    this.editingRowId = null;
    this.refreshActions();
  }

  cancelEdit() {
    this.gridApi.stopEditing(true);
    this.editingRowId = null;
    this.refreshActions();
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductActions.deleteProduct({ id }));
  }

  onRowClicked(e: RowClickedEvent<Product>) {
    if (this.editingRowId || !e.data) return;
    this.router.navigate(['/product', e.data.id]);
  }

  addProduct() {
    const nextId =
      this.rowData.length > 0
        ? Math.max(...this.rowData.map(p => p.id)) + 1
        : 1;

    this.store.dispatch(
      ProductActions.addProduct({
        product: {
          id: nextId,
          name: 'New Product',
          description: '',
          cost: 833,
          quantity: 148,
          rating: 5,
          updatedDate: new Date()
        }
      })
    );
  }

  resetFilter() {
    this.searchForm.reset();
  }
}
