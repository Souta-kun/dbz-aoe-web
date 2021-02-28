import { SafeResourceUrl } from "@angular/platform-browser";

export class GuideModel { 
    public secureUrl: SafeResourceUrl
    
    constructor(
        public _id: string,
        public title: string,
        public description: string,        
        public url: string
    ) {}
}