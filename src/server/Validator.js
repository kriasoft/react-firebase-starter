/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import isURL from 'validator/lib/isURL';
import textTrim from 'validator/lib/trim';
import { fromGlobalId } from 'graphql-relay';

function isEmpty(value) {
  return typeof value === 'undefined' || value === null || value === '';
}

/**
 * A set of validation helper methods that are indended to reduce
 * the amount of boilerpate code in GraphQL mutations. It's is based
 * on the popular "validator" library that you can find at:
 * https://github.com/chriso/validator.js
 */
export default class Validator {
  errors = [];
  states = [];

  constructor(input, onError) {
    this.input = input;
    this.onError = onError;
    this.mode = input.id ? 'edit' : 'create';
  }

  /**
   * Initialized a new state for the field.
   */
  field(key, { as, alias, trim, transform, type } = {}) {
    const name = alias || key;
    let value = this.input[key];

    if (value && trim) {
      value = textTrim(value, trim === true ? undefined : trim);
    }

    if (value && transform) {
      value = transform(value);
    }

    if (value && type) {
      const globalId = fromGlobalId(value);

      if (globalId.type !== type) {
        throw new Error(
          `Expected an ID of type '${type}' but got '${globalId.type}'.`,
        );
      }

      value = globalId.id;
    }

    this.state = {
      key,
      as,
      name,
      value,
      promise: undefined,
      addError: message =>
        this.errors.push({
          key,
          message: message || `The ${name} field is invalid.`,
        }),
    };
    this.states.push(this.state);
    return this;
  }

  isRequired(message) {
    if (
      (((this.input.validateOnly === true || this.mode === 'edit') &&
        typeof this.state.value !== 'undefined') ||
        this.mode === 'create') &&
      !this.state.value
    ) {
      this.state.addError(
        message || `The ${this.state.name} field cannot be empty.`,
      );
    }
    return this;
  }

  isEmail(options, message) {
    if (!isEmpty(this.state.value) && !isEmail(this.state.value, options)) {
      this.state.addError(message || 'The email address is invalid.');
    }
    return this;
  }

  isLength(options, message) {
    if (!isEmpty(this.state.value) && !isLength(this.state.value, options)) {
      if (options && options.min && options.max) {
        this.state.addError(
          message ||
            `The ${this.state.name} field must be between ${options.min} and ${
              options.max
            } characters long.`,
        );
      } else if (options && options.max) {
        this.state.addError(
          message ||
            `The ${this.state.name} field must be up to ${
              options.max
            } characters long.`,
        );
      } else {
        this.state.addError(message);
      }
    }
    return this;
  }

  isURL(options, message) {
    if (!isEmpty(this.state.value) && !isURL(this.state.value, options)) {
      this.state.addError(message);
    }
    return this;
  }

  is(check, message) {
    this.state.promise = (
      this.state.promise || Promise.resolve(this.state)
    ).then(state =>
      isEmpty(state.value)
        ? state
        : Promise.resolve()
            .then(() => check(state.value, message))
            .then(isValid => {
              if (!isValid) state.addError(message);
              return state;
            })
            .catch(err => {
              state.addError(err.message);
              return Promise.resolve(state);
            }),
    );
    return this;
  }

  validate() {
    const done = states => {
      if (this.errors.length && this.onError) {
        this.onError(this.errors);
      }

      return states
        .filter(x => typeof x.value !== 'undefined')
        .reduce((acc, state) => {
          acc[state.as || state.key] = state.value;
          return acc;
        }, {});
    };

    return this.states.some(x => x.promise)
      ? Promise.all(this.states.map(x => x.promise || Promise.resolve(x))).then(
          done,
        )
      : done(this.states);
  }
}
