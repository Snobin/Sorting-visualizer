// sorting-services.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingServicesService {
  constructor() {}

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

  // mergeSort(array: number[]) {
  //   const animations: any[] = [];
  //   const tempArray = [...array];
  //   this.mergeSortHelper(array, 0, array.length - 1, tempArray, animations);
  //   return animations;
  // }

  insertionSort(array: number[]) {
    const swaps: number[][] = [];
    for (let i = 0; i < array.length; i++) {
      let current = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > current) {
        swaps.push([j, j + 1, array[j]]);
        array[j + 1] = array[j];
        j--;
      }
      swaps.push([j + 1, j + 1, current]);
      array[j + 1] = current;
    }
    return swaps;
  }
}
