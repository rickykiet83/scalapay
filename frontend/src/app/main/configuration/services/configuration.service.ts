import { Injectable } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Configuration, ConfigurationModel } from '../../../shared/models/configuration.model';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends DataService<ConfigurationModel> {
    getApiUrl(): string {
        return `${this.urlApi}/configurations`;
    }
    
    className(): string {
        return ConfigurationService.name;
    }

    getConfiguration(): Observable<ConfigurationModel> {
        return super.get(this.getApiUrl()).pipe(
            map(item => new ConfigurationModel(item))
        );
    }
}
