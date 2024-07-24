import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  email: string = "";
  loading: boolean = false;
  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  addUser() {
    //Validando que el usuario adicione algo en los imputs
    if (this.username == "" || this.password == "" || this.email == "") {
      //alert("todos los campos son obligatorios");
      this.toastr.info('Todos los campos son obligatorios', 'Advertencia!!');
      return;
    }
    //validando qeu las contraseñas sean iguales
    if (this.username.length < 4 || this.password.length < 7 || this.email.length < 9) {
      //alert("todos los campos son obligatorios");
      this.toastr.info('Usuario acepta minimo de 4 caracteres, contaseña 8 caracteres y email 10', 'Advertencia!!');
      return;
    }
    const user: User = {
      username: this.username,
      password: this.password
    }
    console.log(user);
    this.loading = true;
    this._userService.sigIn(user).subscribe({
      next: (v) => {
        this.toastr.success('Usuario: ' + this.username + ' Creado Exitosamente', 'Usuario Creado');
        this.username = "";
        this.password = "";
        this.email = "";
        this.loading = false;
        this.router.navigate(['/listproducts']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        if (e.error.msg) {
          this.toastr.error(e.error.msg, ' Error')
        }
        else {
          this.toastr.error('Ha ocurrido un error', ' Error')
        }
      },
      complete: () => console.info('complete')
    })
    /*this._userService.sigIn(user).subscribe(data=>{
      //console.log(data);
      this.toastr.success('Usuario: '+this.username+' Creado Exitosamente','Usuario Creado');
      this.username = "";
      this.password = "";
      this.email = "";
      this.loading = false;
      this.router.navigate(['/listproducts']);
    }, (event: HttpErrorResponse) => {
      this.loading = false;
      if(event.error.msg){
        this.toastr.error(event.error.msg, ' Error')
      }
      else{
        this.toastr.error('Ha ocurrido un error', ' Error')
      }
    })*/
  }

}
