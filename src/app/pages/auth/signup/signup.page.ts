import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    this.isLoading = true;
    const { name, email, password } = form.value;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Signing up..." })
      .then(elem => {
        elem.present();
        this.authService.signup(name, email, password).subscribe(data => {
          this.isLoading = false;
          elem.dismiss();
          this.router.navigateByUrl("/places/tabs/profil/1");
        }, error => {
          let message = "";
          for (const key in error.error.errors) {
            message += error.error.errors[key];
            break;
          }
          elem.dismiss();
          this.showAlert(message);
        });
      });
  }

  showAlert(message: string) {
    this.alertCtrl.create({ header: "Signup failed", message, buttons: ["Okey"] })
      .then(el => el.present());
  }
}
