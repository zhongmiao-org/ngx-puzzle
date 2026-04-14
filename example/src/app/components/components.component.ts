import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocItem, DocgeniTemplateModule } from '@docgeni/template';

@Component({
  selector: 'app-example-components',
  templateUrl: './components.component.html',
  standalone: true,
  imports: [RouterOutlet, DocgeniTemplateModule]
})
export class AppExampleComponentsComponent {
  menus: DocItem[] = [
    {
      id: 'basic',
      title: '基本使用',
      subtitle: 'Basic',
      path: 'basic'
    }
    // {
    //     id: 'groups',
    //     title: '分组展示',
    //     subtitle: 'Groups',
    //     path: 'groups'
    // },
    // {
    //     id: 'virtual-scroll',
    //     title: '虚拟滚动',
    //     subtitle: 'Virtual Scroll',
    //     path: 'virtual-scroll'
    // },
    // {
    //     id: 'custom-view',
    //     title: '自定义视图',
    //     subtitle: 'Custom View',
    //     path: 'custom-view'
    // },
    // {
    //     id: 'advanced',
    //     title: '高级使用',
    //     subtitle: 'Advanced',
    //     path: 'advanced'
    // }
  ];
}
