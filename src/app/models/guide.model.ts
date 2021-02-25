import { SafeResourceUrl } from "@angular/platform-browser";

export class GuideModel { 
    public secureUrl: SafeResourceUrl
    
    constructor(
        public title: string,
        public description: string,        
        public url: string
    ) {}
}