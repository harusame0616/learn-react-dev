export const StoneEnum = {
  x: "X",
  o: "O",
} as const;

export const SquareStatusEnum = {
  ...StoneEnum,
  empty: "",
} as const;

export type Stone = (typeof StoneEnum)[keyof typeof StoneEnum];

export type SquareStatus =
  (typeof SquareStatusEnum)[keyof typeof SquareStatusEnum];
