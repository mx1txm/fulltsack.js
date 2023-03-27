function transformObject(obj) {
  // base case: if the current object is a number, add 1
  if (typeof obj === 'number') {
    return obj + 1;
  }

  // base case: if the current object is a string, add 'AE'
  if (typeof obj === 'string') {
    return obj + ' AE';
  }

  // recursive case: if the current object is an array or object, iterate over its keys/values and call the function recursively
  if (Array.isArray(obj)) {
    return obj.map((value) => transformObject(value));
  }

  if (typeof obj === 'object' && obj !== null) {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
      result[key] = transformObject(value);
    }

    return result;
  }

  // for all other cases (e.g. boolean, null, undefined), return the original value
  return obj;
}

