import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService, CatBreed, CatImage } from '../../core/services/cat/cat.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-breeds',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './breeds.component.html',
  styleUrls: ['./breeds.component.scss']
})
export class BreedsComponent implements OnInit, OnDestroy {
  breeds: CatBreed[] = [];
  filteredBreeds: CatBreed[] = [];
  selectedBreedId: string = '';
  selectedBreed: CatBreed | null = null;
  images: CatImage[] = [];
  currentIndex: number = 0;

  isSidebarOpen: boolean = false;
  isFilterView: boolean = false;
  searchText: string = '';
  errorMessage: string = ''; // 🔥 nuevo: mensaje de error

  private carouselInterval: any;

  constructor(private catService: CatService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.catService.getBreeds().subscribe({
      next: (data) => {
        this.breeds = data;
        this.filteredBreeds = data;
      },
      error: (err) => console.error('❌ Error al obtener razas:', err)
    });

    
    this.carouselInterval = setInterval(() => {
      this.nextImage();
    }, 8000);
  }
  
goToGuardian() {
  this.router.navigate(['/guardian']);
}

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  goToFilterView(): void {
    this.isFilterView = true;
    this.isSidebarOpen = false;
    this.errorMessage = ''; // limpiamos mensaje al entrar al filtro
  }

  applyFilterOnEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const query = this.searchText.trim().toLowerCase();

      if (!query) {
        this.errorMessage = 'Por favor escribe algo para filtrar.';
        return;
      }

      const resultados = this.breeds.filter(breed =>
        breed.name.toLowerCase().includes(query) ||
        breed.origin.toLowerCase().includes(query) ||
        breed.temperament.toLowerCase().includes(query)
      );

      if (resultados.length === 0) {
        this.errorMessage = 'No se encontraron razas con ese criterio.';
        return; // ❌ no avanzamos
      }

      // ✅ si hay resultados
      this.filteredBreeds = resultados;
      this.isFilterView = false;
      this.searchText = '';
      this.errorMessage = ''; // limpiamos mensaje
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // redirige a la vista de login
  }

  onSelectBreed(): void {
    if (!this.selectedBreedId) return;

    this.filteredBreeds = this.breeds;

    this.catService.getBreedById(this.selectedBreedId).subscribe({
      next: (breed) => { this.selectedBreed = breed; },
      error: (err) => console.error('❌ Error al obtener datos de la raza:', err)
    });

    this.catService.getImagesByBreedId(this.selectedBreedId).subscribe({
      next: (imgs) => {
        this.images = imgs;
        this.currentIndex = 0;
      },
      error: (err) => console.error('❌ Error al obtener imágenes:', err)
    });
  }

  nextImage(): void {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

  prevImage(): void {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }
}
