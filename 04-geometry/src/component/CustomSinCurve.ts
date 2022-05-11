import { Curve, Vector3 } from "three";

export class CustomSinCurve extends Curve<Vector3> {
  getPoint(t: number): Vector3 {
    const a = t * 4 + 1;
    const ty = (a * Math.cos(t * Math.PI * 2 * 4)) / 8;
    const tz = (a * Math.sin(t * Math.PI * 2 * 4)) / 8;
    return new Vector3(t, ty, tz);
  }
}
