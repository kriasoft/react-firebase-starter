/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

export function mapTo(keys, keyFn) {
  return rows => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(keys, keyFn) {
  return rows => {
    const group = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (group.get(keyFn(row)) || []).push(row));
    return Array.from(group.values());
  };
}

export function mapToValues(keys, keyFn, valueFn, defaultValue = null) {
  return rows => {
    const group = new Map(keys.map(key => [key, defaultValue]));
    rows.forEach(row => group.set(keyFn(row), valueFn(row)));
    return Array.from(group.values());
  };
}
