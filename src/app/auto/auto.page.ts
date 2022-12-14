import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.page.html',
  styleUrls: ['./auto.page.scss'],
})
export class AutoPage implements OnInit {

  formularioViaje: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {

    this.formularioViaje = this.fb.group({
      'destino': new FormControl("",Validators.required),
      'capacidad': new FormControl("",Validators.required),
      'tarifa': new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  async solicitar(){

    var j = this.formularioViaje.value;

    if(this.formularioViaje.invalid){
      const alert = await this.alertController.create({
        header:"Datos incompletos",
        message:'Tienes que llenar todos los campos.',
        buttons:['Aceptar']
      });
      await alert.present();
      return;
    }

    var viaje = {
      destino: j.destino,
      capacidad: j.capacidad,
      tarifa: j.tarifa
    }

    localStorage.setItem('viaje',JSON.stringify(viaje));
    this.navCtrl.navigateRoot('mensaje');
  }
}
