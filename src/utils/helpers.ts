export const isEmptyObject = (obj: any) =>
    obj ? Object.keys(obj).length === 0 && obj.constructor === Object : undefined;
