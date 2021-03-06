export class ArrayHelper {
  static shuffleArray(arr: any[]): any[] {
    let newArr = [...arr];

    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }

    return newArr;
  }

  static removeItemByValue(arr: any[], val: any): any[] {
    let newArr = [...arr];

    const index = newArr.indexOf(val);
    if (index > -1) {
      newArr.splice(index, 1);
    }

    return newArr;
  }

  static stringArrayToLowerCase(arr: string[]): string[] { //Convert all elements of a string array to lower case
    let newArr = arr.map(x => x.toLowerCase());
    return newArr;
  }

  static replaceStr(arr: string[], strA: string, strB) {
    //arr.forEach((item, i) => { if (item == strA) arr[i] = strB; });
    var index = arr.indexOf(strA);

    if (index !== -1) {
        arr[index] = strB;
    }
  }

  static sliceStr(str: string, maxLen: number): string {
    let res = '';
    if (str.length > maxLen) {
      res = str.slice(0, maxLen) + '...';
      return res;
    }
    else {
      return str;
    }
  }
}