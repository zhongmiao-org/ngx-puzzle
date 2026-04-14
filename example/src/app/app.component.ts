import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocgeniTemplateModule } from '@docgeni/template';

@Component({
  selector: 'example-root',
  templateUrl: `./app.component.html`,
  styles: [],
  standalone: true,
  imports: [RouterOutlet, DocgeniTemplateModule]
})
export class AppComponent {
  @HostBinding(`class.dg-main`) isRoot = true;
  title = 'example';
}
