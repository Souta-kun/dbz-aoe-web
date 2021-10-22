import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RedService {
    redes = {
      facebook: { name: "Facebook", url: "https://www.facebook.com/dbz.aoe" },
      whatsapp: { name: 'Whatsapp', url: 'https://chat.whatsapp.com/IWsT9yIi0OhHpW2bc0gjo0' },
      discord: { name: "Discord", url: "https://discord.gg/VPeJwzv" },
      voobly: { name: "Voobly", url: "https://dbz.voobly.com/" },
      youtube: { name: "YouTube", url: "https://www.youtube.com/channel/UCKIgn_Z7qoGu3PS5wrZ5vxg" }
    };
}
