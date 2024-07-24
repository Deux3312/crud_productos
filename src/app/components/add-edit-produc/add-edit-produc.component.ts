import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-produc',
  templateUrl: './add-edit-produc.component.html',
  styleUrls: ['./add-edit-produc.component.css']
})
export class AddEditProducComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';

  constructor(private fb: FormBuilder, private _producService: ProductService, private router: Router, private toastr: ToastrService, private aRouter: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
    //console.log(this.id)
  };
  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar ';
      this.getProduct(this.id)
    }
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  getProduct(id: number) {
    this.loading = true;
    this._producService.getProduct(id).subscribe((data: Product) => {
      console.log(data);
      this.loading = false;
      this.form.patchValue(data);
    })
  }
  addProduct() {
    /*console.log(this.form.value.name);
    console.log(this.form.get('name')?.value);*/
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    }

    this.loading = true;
    if(this.id !==0)
      {
        //editar
        product.id = this.id;
        this._producService.udpdateProduct(this.id,product).subscribe(()=>{
          this.toastr.success(`El Producto ${product.name} editado correctamente`,`Producto Editado`);
          this.router.navigate(['/']);
          this.loading = false;
        })
      }else
      {
        //agregar
        this._producService.saveProduct(product).subscribe(() => {
          this.toastr.success(`El Producto ${product.name} agregado correctamente`, `Producto Registrado`);
          this.router.navigate(['/']);
          this.loading = false;
        })
      }

  
  }

}
