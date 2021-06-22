/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable guard-for-in */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

class RandomGenerator {
  shuffle(a:any):any {
    let i;
    let j;
    let x;

    for (i = a.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  }

  generateSolution(fields:boolean[], min:number, max:number):any {
    const s = new Set();
    const nrOfFields = min + Math.floor(Math.random() * (max - min + 1));
    console.log(min + 'min, ' + max + 'max, ' + nrOfFields);

    for (let i = 1; i < fields.length; i += 1) {
      s.add(i);
    }

    for (let i = 0; i < nrOfFields; i += 1) {
      const r = Math.floor(Math.random() * s.size);
      const el = Array.from(s);
      console.log(s.size);
      s.delete(el[r]);
      console.log(el[r] + ' deleted');
    }

    for (let i = 0; i < fields.length; i += 1) {
      if (!s.has(i)) {
        fields[i] = true;
        console.log(i);
      }
    }

    return fields;
  }
}

export default RandomGenerator;
