import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn: 'root'})
export class RedService {

    constructor(private dataStorageService: DataStorageService) {}
    
    getRed() {
        
    }
}