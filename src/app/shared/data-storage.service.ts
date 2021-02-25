import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DownloadModel } from "../models/download.model";
import { GuideModel } from "../models/guide.model";
import { RedesModel } from "../models/red.model";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
    redes = [
      new RedesModel('Voobly', null, 'https://dbz.voobly.com/'),
      new RedesModel('Discord', null, 'https://discord.gg/VPeJwzv'),
      new RedesModel('Facebook', null, 'https://www.facebook.com/dbz.aoe'),
      new RedesModel('YouTube', null, 'https://www.youtube.com/channel/UCKIgn_Z7qoGu3PS5wrZ5vxg')
    ];
    
    downloads = [
        new DownloadModel('Age Of Empires II', 'https://mega.nz/file/s5Eh0QLS#DiR3fBHeH8Vcrvba7rnEu238whkENnqEsCyBpW0aD7k'),
        new DownloadModel('Age Of Empires II: The Conqueros', 'https://mega.nz/file/4dkWXTKC#39ddgAVSMhQerqiIOxB_oFQyVT_Um403esevGpwP08M'),
        new DownloadModel('Pusywood', 'https://drive.google.com/file/d/1RvNUczf-tOqtUEKN1vjn8tXy1i4QFzDy/view?usp=sharing'),
        new DownloadModel('WololoKindowns 5.8.1', 'https://drive.google.com/file/d/19F3P4CNH4hjPR-DIngAyNDtkhngcVYxV/view')
    ];

    guides = [
      new GuideModel(
        'Drush + Fast Castle',
        '"¿Quieres atacar rápido e ir a la edad del castillo antes de los 17 minutos? ¡Este es el orden de construcción para ti!" St4rk.',
        'https://www.youtube.com/embed/funFxtKRagk'
      ),
      new GuideModel(
        'Scouts Pop 22',
        '¿Te gusta la Caballeria y quieres atacar rapido en feudal? ¡Esta es tu estrategia!',
        'https://www.youtube.com/embed/fBvLLIP2R5k'
      ),
      new GuideModel(
        'Archers Pop 23',
        'Estrategia de Arqueros en feudal, muy popular siendo ala o punta en team games o 1v1.',
        'https://www.youtube.com/embed/WNlTdpuaurg'
      ),
      new GuideModel(
        'Fast Castle (Knights)',
        'Aprende hacer el Fast Castle, util cuando sos pocket en Team Games.',
        'https://www.youtube.com/embed/6rs7hsyRIkU'
      ),
    ];

    constructor(private sanitizer: DomSanitizer) {
      for (let index = 0; index < this.guides.length; index++) {       
        this.guides[index].secureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.guides[index].url) 
      }      
    }
}
