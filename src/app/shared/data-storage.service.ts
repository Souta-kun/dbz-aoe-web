import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { DownloadModel } from "../models/download.model";
import { GuideModel } from "../models/guide.model";
import { RedesModel } from "../models/red.model";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
    redes = new Subject<RedesModel[]>();    
    guides = new Subject<GuideModel[]>();
    
    private downloadUrl: string = 'downloads.json'

    constructor(private http: HttpClient,
                private sanitizer: DomSanitizer) {
      /*for (let index = 0; index < this.guides.length; index++) {       
        this.guides[index].secureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.guides[index].url) 
      }*/     
    }

    getDownload() {
      this.http
        .get(`${environment.dbConection}${this.downloadUrl}`)
        .pipe(
          map(downloads => {
            return downloads;
          })
        )
        .subscribe(
          downloads => {
            console.log(downloads);
          },
          error => {
            console.log(`error: ${error}`);
          });
    }
  
    postDownload() {
      const body = [
        new DownloadModel('MUMqMdFXKKY1angXXTT', '1', '1'),
        new DownloadModel('MUZYa5cpC_G3mprdgju', '2', '2')
      ];
  
      this.http
        .post(
        `${environment.dbConection}${this.downloadUrl}`,
          body
        )
        .subscribe(result => {
          console.log(result);
        });
    }
}
