import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'sorting-visualizer';
  array: number[] = [];
  numberOfElements: number;

  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('barsContainer', { static: true }) barsContainer: ElementRef;

  constructor(private renderer: Renderer2) {}

  init() {

    this.array=[];
    for (let i = 0; i < this.numberOfElements; i++) {
      this.array.push(Math.random());
    }
    this.showbars();
  }

  play() {
    const copy=[...this.array]
    const swaps=this.bubblesort(copy);
    this.animate(swaps);
    // this.showbars();
  }
  animate(swaps:any){
    if (swaps.length==0){
      return;
    }
    const [i,j]=swaps.shift();
    [this.array[i],this.array[j]]=[this.array[j],this.array[i]];
    this.showbars();
    setTimeout(() => {
      this.animate(swaps);
    }, 5);
  }
  showbars() {
    // Clear previous bars
    this.clearBars();
  
    for (let i = 0; i < this.array.length; i++) {
      const bar = this.renderer.createElement('div');
      const roundedHeight = this.array[i] * 100;
      this.renderer.setStyle(bar, 'width', '10px');
      this.renderer.setStyle(bar, 'height', `${roundedHeight}px`);
      this.renderer.setStyle(bar, 'background-color', 'black');
      this.renderer.appendChild(this.barsContainer.nativeElement, bar);
    }
  }
  
  clearBars() {
    // Clear the barsContainer
    this.barsContainer.nativeElement.innerHTML = '';
  }
  

  bubblesort(array: number[]) {
    const swaps: number[][] = [];
    do {
      var swapped = false;
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          swapped = true;
          swaps.push([i - 1, i]);
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
        }
      }
    } while (swapped);
    return swaps;
  }
  
}
