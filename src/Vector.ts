import { map, sum, zip } from 'lodash';
import * as math from 'mathjs';
export default class Vector {
  [index: number]: number;

  private _size: number;
  private _values: number[];

  constructor(values: number[]);
  constructor(...values: number[]);
  constructor(firstOrArray: number[] | number, ...rest: number[]) {
    let self = this;
    if (!Array.isArray(firstOrArray)) {
      firstOrArray = [firstOrArray, ...rest];
    }
    if (firstOrArray.length <= 0) {
      throw new Error('Vector must have at least 1 row!');
    }
    this._size = firstOrArray.length;
    this._values = firstOrArray;

    return new Proxy(this, {
      get(target, prop: number | string | symbol) {
        if (Number(prop) == prop && !(prop in target)) {
          //@ts-ignore
          return self._values[prop];
        }
        //@ts-ignore
        return target[prop];
      },
    });
  }

  get size(): number {
    return this._size;
  }

  get length(): number {
    return math.sqrt(sum(map(this._values, (v) => v ** 2)));
  }

  get array(): number[] {
    return this.asArray();
  }

  normalize() {
    return new Vector(map(this.array, (v) => v / this.length));
  }

  asArray(): number[] {
    return this._values;
  }

  add(b: Vector) {
    if (this.size != b.size) throw new Error('Vectors must have same size when adding!');
    return new Vector(math.add(this.array, b.array) as number[]);
  }

  subtract(b: Vector) {
    if (this.size != b.size) throw new Error('Vectors must have same size when suntracting!');
    return new Vector(math.subtract(this.array, b.array) as number[]);
  }

  scale(factor: number) {
    return this.multiply(factor);
  }
  multiply(factor: number) {
    return new Vector(math.multiply(factor, this.array) as number[]);
  }

  divide(factor: number) {
    return this.multiply(1 / factor);
  }

  dot(b: Vector) {
    if (this.size != b.size) throw new Error('Vectors must have same size when building dot product!');
    return sum(map(zip(this.array, b.array), (v: [number, number]) => v[0] * v[1]));
  }

  cross(b: Vector) {
    if (this.size != b.size && (this.size !== 3 || b.size !== 3))
      throw new Error('Vectors must have size 3 when building cross product!');
    const a = this;
    return new Vector(a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]);
  }

  getPerpendicular() {
    if (this.size == 3) {
      return this.cross(new Vector(0, 0, 1));
    }
    if (this.size == 2) {
      return new Vector(this[1], this[0]);
    }
    throw new Error('Vectors must have size 2 or 3 when getting a perpendicular one.');
  }
}
