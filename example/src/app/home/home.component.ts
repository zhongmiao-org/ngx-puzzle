import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'example-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('featuresSection') featuresSection!: ElementRef;
  private router = inject(Router);

  scrollToFeatures(): void {
    this.featuresSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

  navigateToComponent(type: string): void {
    this.router.navigate(['/components'], { fragment: type });
  }
}
