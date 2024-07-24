import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent {
  listProducts:Product[]= []
  loading: boolean = false;
  constructor(private _ProductService:ProductService, private toastr: ToastrService)
  {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListProducts();
    
  }

  getListProducts()
  {
    this.loading = true;
    this._ProductService.getListProducts().subscribe((data: Product[])=>{
      //caches;this.getListProducts
      //console.log(data);
      this.listProducts = data;
      this.loading = false;
    })
  }
  
  deleteProduct(id:number)
  {
      this.loading = true;
      this._ProductService.deleteProduct(id).subscribe(()=>{
      //caches;this.getListProducts
      //console.log(data);
      //this.loading = false;
      this.getListProducts();
      this.toastr.success('Producto eliminado correctamente','Producto Eliminado');
    })
  }
}
