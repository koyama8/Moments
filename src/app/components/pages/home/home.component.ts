import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { environment } from 'src/environments/environment';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  //todo search
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) { }

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((items) => {
      const data = items.data;

      data.map((item) => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = items.data;
      this.moments = items.data;
    });

    // Chama a função para digitar automaticamente no input
    this.autoType();
  }

  // Função para digitar automaticamente no placeholder do campo de busca
  autoType() {
    const typingText = 'Ou busque por um momento...'; // Texto que será digitado
    const typingSpeed = 400; // Velocidade da "digitação" (em milissegundos)
    let currentIndex = 0;

    const inputElement: HTMLInputElement | null = document.querySelector('input[type="text"]');

    if (inputElement) {
      inputElement.placeholder = ''; // Inicia o placeholder vazio

      const intervalId = setInterval(() => {
        if (currentIndex < typingText.length) {
          inputElement.placeholder += typingText.charAt(currentIndex);
          currentIndex++;
        } else {
          currentIndex = 0;
          inputElement.placeholder = ''; // Reinicia a digitação
        }
      }, typingSpeed);
    }
  }

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.moments = this.allMoments.filter((moment) =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
