// app.component.ts
import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { SortingServicesService } from './sorting-services.service';


enum SortType {
  Selection = 'selection',
  Bubble = 'bubble',
  Merge = 'merge',
  Insertion = 'insertion',
  Heap = 'heap',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'sorting-visualizer';
  array: number[] = [];
  timeout:number=20;
  numberOfElements: number;
  selectedSort: any; // Default to Bubble Sort
  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('barsContainer', { static: true }) barsContainer: ElementRef;

  constructor(
    private renderer: Renderer2,
    private sortingService: SortingServicesService
  ) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.array = [];
    for (let i = 0; i < this.numberOfElements; i++) {
      this.array.push(Math.random());
    }
    this.showBars();
  }

  play() {
    const copy = [...this.array];
    let swaps: number[][];
    switch (this.selectedSort) {
      case SortType.Bubble:

        swaps = this.sortingService.bubblesort(copy);
        break;
      case SortType.Selection:
        swaps = this.sortingService.selectionSort(copy);
        break;
      case SortType.Insertion:
        swaps = this.sortingService.insertionSort(copy);
        break;
        case SortType.Heap:
          swaps = this.sortingService.heapSort(copy);
          break;
          case SortType.Merge:
            swaps = this.sortingService.mergeSort(copy);
            break;
      default:
        console.error('Invalid sort type');
        return;
    }

    this.animate(swaps);
  }

  reset() {
    this.array = [];
    this.showBars();
  }


  animate(swaps: any) {
    if (swaps.length == 0) {
      this.showBars();
      return;
    }
    const [i, j] = swaps.shift();
    [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
    this.showBars([i, j]);
    setTimeout(() => {
      this.animate(swaps);
    }, this.timeout);
  }


  showBars(indices?: number[]) {
    this.clearBars();

    for (let i = 0; i < this.array.length; i++) {
      const bar = this.renderer.createElement('div');
      const roundedHeight = this.array[i] * 100;
      this.renderer.setStyle(bar, 'width', '10px');
      this.renderer.setStyle(bar, 'height', `${roundedHeight}px`);
      this.renderer.setStyle(bar, 'background-color', 'black');

      if (indices && indices.includes(i)) {
        this.renderer.setStyle(bar, 'background-color', 'red');
      }

      this.renderer.appendChild(this.barsContainer.nativeElement, bar);
    }
  }

  clearBars() {
    this.barsContainer.nativeElement.innerHTML = '';
  }
}
