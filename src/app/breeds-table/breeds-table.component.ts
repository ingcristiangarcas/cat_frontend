import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatService, CatBreed } from '../core/services/cat/cat.service';

@Component({
  selector: 'app-breeds-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breeds-table.component.html',
  styleUrls: ['./breeds-table.component.scss']
})
export class BreedsTableComponent implements OnInit {
  breeds: CatBreed[] = [];

  constructor(private catService: CatService) {} // ✅ Inyectamos el servicio

  ngOnInit(): void {
    this.catService.getBreeds().subscribe((data) => {
      this.breeds = data;
    });
  }
}
