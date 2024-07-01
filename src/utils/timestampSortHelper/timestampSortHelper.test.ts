import { compareTimestamps } from "./timestampSortHelper";

describe('compareTimestamps', () => {
  it('should return -1 when timestamp a is greater than b', () => {
    const a = '2024-07-01T12:00:00Z';
    const b = '2023-06-30T11:00:00Z';
    expect(compareTimestamps(a, b)).toBe(-1);
  });

  it('should return 1 when timestamp a is less than b', () => {
    const a = '2022-01-01T00:00:00Z';
    const b = '2023-12-31T23:59:59Z';
    expect(compareTimestamps(a, b)).toBe(1);
  });

  it('should return 0 when timestamps a and b are equal', () => {
    const a = '2024-01-01T10:00:00Z';
    const b = '2024-01-01T10:00:00Z';
    expect(compareTimestamps(a, b)).toBe(0);
  });

  it('should handle undefined timestamps by treating them as the epoch', () => {
    const a = undefined;
    const b = '2023-12-31T23:59:59Z';
    expect(compareTimestamps(a, b)).toBe(1);
  });

  it('should handle undefined timestamps by treating them as the epoch (reversed)', () => {
    const a = '2023-12-31T23:59:59Z';
    const b = undefined;
    expect(compareTimestamps(a, b)).toBe(-1);
  });
});