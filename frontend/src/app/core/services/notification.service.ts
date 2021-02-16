import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  private _configuration: MatSnackBarConfig;
  private _panelClass = 'default-notification-overlay';
  private _duration = 5000;

  set duration(value: number) {
    this._duration = value;
  }

  constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

  private getDefaultConfiguration() {
    this._configuration = {
      duration: this._duration,
      verticalPosition: 'top',
      panelClass: this._panelClass
    };
    return this._configuration;
  }

  private getConfiguration(panelClass: string = 'default-notification-overlay') {
    if (this._configuration) {
      return (this._configuration = {
        duration: this._configuration.duration || this.getDefaultConfiguration().duration,
        verticalPosition:
          this._configuration.verticalPosition || this.getDefaultConfiguration().verticalPosition,
        panelClass: this._configuration.panelClass || panelClass
      });
    }

    return this.getDefaultConfiguration();
  }

  setConfiguration(config: MatSnackBarConfig) {
    this._configuration = config;
  }

  info(message: string, action: string = 'OK') {
    this.show(message, action, this.getConfiguration('info-notification-overlay'));
  }

  success(message: string, action: string = 'OK') {
    this.show(message, action, this.getConfiguration('success-notification-overlay'));
  }

  warn(message: string, action: string = 'OK') {
    this.show(message, action, this.getConfiguration('warning-notification-overlay'));
  }

  error(message: string, action: string = 'OK') {
    this.show(message, action, this.getConfiguration('error-notification-overlay'));
  }

  private show(message: string, action: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, action, configuration));
  }
}
