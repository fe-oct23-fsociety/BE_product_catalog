import { isString } from './isString.js';

export const isParamsPassed = (param: any): number | undefined => {
  if (isString(param)) {
    return Number(param);
  }
  return undefined;
};
