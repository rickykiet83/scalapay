import { Injectable } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { Configuration } from '../../../shared/models/configuration.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends DataService<Configuration> {
    
    private uri = `${this.urlApi}/configuration`;

    className(): string {
        return ConfigurationService.name;
    }

    getConfiguration(): Observable<Configuration> {
        return super.get(this.uri);
    }
}
