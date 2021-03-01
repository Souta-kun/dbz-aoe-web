import { Injectable } from "@angular/core";
import { RedesModel } from "../models/red.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class RedService {
    redes: RedesModel[] = [
        new RedesModel( 
          "Voobly", 	
          null,
          "https://dbz.voobly.com/" 
        ),
        new RedesModel( 
          "Discord", 	
          null,
          "https://discord.gg/VPeJwzv" 
        ),
        new RedesModel( 
          "Facebook", 
          null,
          "https://www.facebook.com/dbz.aoe" 
        ),
        new RedesModel(
          "YouTube", 	
          null,
           "https://www.youtube.com/channel/UCKIgn_Z7qoGu3PS5wrZ5vxg" 
        )
    ];

    constructor() {}
    
    getRed() {
        
    }
}