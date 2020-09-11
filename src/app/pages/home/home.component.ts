import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 Lista=[];
 formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
this.LimpiarVariables();

  this.Lista=[];
  const data =localStorage.getItem('lista');
   const list =JSON.parse(data);

  this.Lista =list;
  }

  validacion():boolean{
   var validar=false;
    this.Lista.forEach(element => {
      if( element.usuario === this.formGroup.value.usuario){
         validar=true;
      }
    });
    return validar;
  }

  Agregar(){

    if(!this.validacion()){
      const buscar = this.Lista.find(x => x.id === this.formGroup.value.id);
      if(buscar === undefined){
        const id= Math.floor(Math.random() * (100 - 1 + 1) + 1);
        this.formGroup.controls['id'].setValue(id);
        this.Lista.push(this.formGroup.value);
      }
      else{
        this.Lista.forEach(element => {
          if(element.id === this.formGroup.value.id){
            element.id= this.formGroup.value.id;
            element.correo=this.formGroup.value.correo;
            element.usuario=this.formGroup.value.usuario;
          }
       });
      }
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Proceso exitoso!',
        showConfirmButton: false,
        timer: 1500
      })
      localStorage.setItem('lista',JSON.stringify(this.Lista));
      this.LimpiarVariables();
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Ya existe un usuario con ese nombre',
        showConfirmButton: false,
        timer: 1500
      })
    }



  }

  editar(item:any):void{
    this.formGroup.controls['id'].setValue(item.id);
    this.formGroup.controls['usuario'].setValue(item.usuario);
    this.formGroup.controls['correo'].setValue(item.correo);
  }

  eliminar(index:number):void{
    Swal.fire({
      title: 'Esta seguro?',
      text: "No podra revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText:'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.Lista.splice(index,1);
        localStorage.clear();
        localStorage.setItem('lista',JSON.stringify(this.Lista));
        this.LimpiarVariables();
        Swal.fire(
          'Proceso exitoso',
          'se ha eliminado!',
          'success'
        )
      }
    })

  }

  LimpiarVariables():void{
    this.formGroup = this._formBuilder.group({
      correo   : ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      id:0
  });
  }
}
