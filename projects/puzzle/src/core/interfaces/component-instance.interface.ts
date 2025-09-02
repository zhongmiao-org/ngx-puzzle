import { Type } from '@angular/core';
import { ComponentConfig } from 'ngx-puzzle/core';

export interface ComponentInstance {
  component: Type<any>;
  config: ComponentConfig;
}
