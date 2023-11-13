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

  selectionSort(array: number[]) {
    const swaps: number[][] = [];
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
      swaps.push([i, minIndex, array[minIndex]]);
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
    return swaps;
  }

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
  heapSort(array: number[]) {
    const swaps: number[][] = [];
    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      this.heapify(array, n, i, swaps);
    }

    for (let i = n - 1; i > 0; i--) {
      swaps.push([0, i, array[i]]);
      [array[0], array[i]] = [array[i], array[0]];
      this.heapify(array, i, 0, swaps);
    }

    return swaps;
  }

  heapify(array: number[], n: number, i: number, swaps: number[][]) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
      largest = left;
    }

    if (right < n && array[right] > array[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swaps.push([i, largest, array[largest]]);
      [array[i], array[largest]] = [array[largest], array[i]];
      this.heapify(array, n, largest, swaps);
    }
  }

  mergeSort(array: number[]) {
    const animations: any[] = [];
    const tempArray = [...array];
    this.mergeSortHelper(array, 0, array.length - 1, tempArray, animations);
    return animations;
  }


  
  mergeSortHelper(
    mainArray: number[],
    startIdx: number,
    endIdx: number,
    tempArray: number[],
    animations: any[]
  ) {
    if (startIdx >= endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    this.mergeSortHelper(tempArray, startIdx, middleIdx, mainArray, animations);
    this.mergeSortHelper(tempArray, middleIdx + 1, endIdx, mainArray, animations);
    this.doMerge(mainArray, startIdx, middleIdx, endIdx, tempArray, animations);
  }

  doMerge(
    mainArray: number[],
    startIdx: number,
    middleIdx: number,
    endIdx: number,
    tempArray: number[],
    animations: any[]
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j, tempArray[j]]);
      animations.push([i, j, tempArray[j]]);
      if (tempArray[i] <= tempArray[j]) {
        animations.push([k, tempArray[i]]);
        mainArray[k++] = tempArray[i++];
      } else {
        animations.push([k, tempArray[j]]);
        mainArray[k++] = tempArray[j++];
      }
    }
    while (i <= middleIdx) {
      animations.push([i, i, tempArray[i]]);
      animations.push([i, i, tempArray[i]]);
      animations.push([k, tempArray[i]]);
      mainArray[k++] = tempArray[i++];
    }
    while (j <= endIdx) {
      animations.push([j, j, tempArray[j]]);
      animations.push([j, j, tempArray[j]]);
      animations.push([k, tempArray[j]]);
      mainArray[k++] = tempArray[j++];
    }
  }
}

