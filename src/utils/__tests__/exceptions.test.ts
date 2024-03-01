import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { asError } from '@/utils/exceptions';

describe('exceptions', () => {
  describe('asError', () => {
    it('should return the same error if that thrown is an instance of Error', () => {
      const message = faker.word.words();
      const thrown = new Error(message);

      expect(asError(thrown)).toEqual(thrown);
    });

    it('should return a new Error instance with the thrown value if that thrown is a string', () => {
      const thrown = faker.word.words();

      const result = asError(thrown);

      expect(result).toEqual(new Error(thrown));
      // If stringified
      expect(result).not.toEqual(new Error(`"${thrown}"`));
    });

    it('should return a new Error instance with the stringified thrown value if that thrown is not an instance of Error', () => {
      const message = faker.word.words();
      const thrown = { message };

      expect(asError(thrown)).toEqual(new Error(`{"message":"${message}"}`));
    });

    it('should return a new Error instance with the string representation of that thrown if JSON.stringify throws an error', () => {
      const thrown: Record<string, unknown> = {};
      // Circular dependency
      thrown.a = { b: thrown };

      expect(asError(thrown)).toEqual(new Error('[object Object]'));
    });
  });
});
