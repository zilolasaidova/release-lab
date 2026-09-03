import { describe, expect, it } from 'vitest';

import { enrollStudent, formatParticipants } from '@/lib/enrollment';

describe('запись на курс', () => {
  it('увеличивает число участников ровно на одного', () => {
    expect(enrollStudent(10)).toBe(11);
  });
});

describe('подпись количества участников', () => {
  it.each([
    [1, '1 участник'],
    [2, '2 участника'],
    [5, '5 участников'],
    [11, '11 участников'],
    [21, '21 участник'],
    [24, '24 участника'],
  ])('правильно форматирует число %i', (count, expected) => {
    expect(formatParticipants(count)).toBe(expected);
  });
});
