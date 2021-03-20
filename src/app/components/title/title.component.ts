import { Component, Input } from "@angular/core";
import { RedService } from "src/app/services/red.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styles: [`
    .red {
      color: red;
      margin-left: 5px;
    }
    .green {
      color: green;
      margin-left: 5px;
    }
    .teal {
      color: #7191FE;
      margin-left: 5px;
    }
  `]
})
export class TitleComponent {
  redes: any;
  @Input() title: string;

  constructor(public redService: RedService) {
    this.redes = this.redService.redes;
  }
}
