import {
  blue,
  brown,
  deepOrange,
  green,
  grey,
  pink,
  purple,
  red,
  teal,
} from "@material-ui/core/colors";
import { shuffleArray } from "./math";
type colorType = typeof red
export const colors = [
  red,
  green,
  pink,
  brown,
  purple,
  blue,
  grey,
  teal,
  deepOrange,
];

export function getShortedColors(lenght: number): string[] {
  let arrayColors: string[] = []
  let variant: keyof colorType = 200;
  while (arrayColors.length < lenght) {
    // eslint-disable-next-line no-loop-func
    arrayColors = [...arrayColors, ...colors.map((e) => {
      return e[variant]
    })]
    variant += 200;
    if (variant > 900) {
      variant = 300;
    }
  }
  return shuffleArray(arrayColors)
}