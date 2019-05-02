import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLoading = false;
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() { }

  onLogin() {
    this.isLoading = true;
    this.authService.login(this.email, this.password);
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in..." })
      .then(elem => {
        elem.present();
        setTimeout(() => {
          this.isLoading = false;
          elem.dismiss();
          this.router.navigateByUrl("/places/tabs/profil/1");
        }, 2000);
      });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;
    const { email, password } = form.value;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in ..." })
      .then(elem => {
        elem.present();
        this.authService.login(email, password).subscribe(data => {
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