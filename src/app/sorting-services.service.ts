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
    let i = startIdx;
    let j = middleIdx + 1;
    let k = startIdx;

    while (i <= middleIdx && j <= endIdx) {
      animations.push([i, j]); // Elements being compared

      if (tempArray[i] <= tempArray[j]) {
        animations.push([k, tempArray[i]]); // Update value at index k
        mainArray[k++] = tempArray[i++];
      } else {
        animations.push([k, tempArray[j]]); // Update value at index k
        mainArray[k++] = tempArray[j++];
      }
    }

    // Handle remaining elements in the left and right subarrays
    while (i <= middleIdx) {
      animations.push([i, i]); // Highlight the remaining element in the left subarray
      animations.push([k, tempArray[i]]); // Update value at index k
      mainArray[k++] = tempArray[i++];
    }

    while (j <= endIdx) {
      animations.push([j, j]); // Highlight the remaining element in the right subarray
      animations.push([k, tempArray[j]]); // Update value at index k
      mainArray[k++] = tempArray[j++];
    }
  }

  quickSort(array: number[]) {
    const animations: any[] = [];
    this.quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }

  quickSortHelper(array: number[], low: number, high: number, animations: any[]) {
    if (low < high) {
      const partitionIndex = this.partition(array, low, high, animations);
      this.quickSortHelper(array, low, partitionIndex - 1, animations);
      this.quickSortHelper(array, partitionIndex + 1, high, animations);
    }
  }

  partition(array: number[], low: number, high: number, animations: any[]) {
    const pivot = array[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      animations.push([j, high]); // Elements being compared
      if (array[j] <= pivot) {
        i++;
        animations.push([i, array[j]]); // Update value at index i
        animations.push([j, array[i]]); // Update value at index j
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    animations.push([i + 1, high]); // Elements being compared
    animations.push([i + 1, array[high]]); // Update value at index i+1
    animations.push([high, array[i + 1]]); // Update value at index high
    [array[i + 1], array[high]] = [array[high], array[i + 1]];

    return i + 1;
  }
}
