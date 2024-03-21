import { Children, FC, PropsWithChildren } from "react";

import { cn } from "@/lib/utils/utils";

type Enumerate<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

export type GridColSize = Enumerate<12>;

interface GridProps extends PropsWithChildren {
  className?: string;
  gridColSize?: GridColSize;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _NOT_PURGE_CLASSES = [
  "grid-cols-12",
  "grid-cols-11",
  "grid-cols-10",
  "grid-cols-9",
  "grid-cols-8",
  "grid-cols-7",
  "grid-cols-6",
  "grid-cols-5",
  "grid-cols-4",
  "grid-cols-3",
  "grid-cols-2",
  "grid-cols-1",
  "md:col-span-12",
  "md:col-span-11",
  "md:col-span-10",
  "md:col-span-9",
  "md:col-span-8",
  "md:col-span-7",
  "md:col-span-6",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-1",
];
export const Grid: FC<GridProps> = ({ children, className, gridColSize }) => (
  <div className={cn("grid grid-cols-12 gap-grid", className)}>
    {Children.map(children, (child) => (
      <div
        className={cn("col-span-12", {
          [`md:col-span-${gridColSize} col-span-12`]: gridColSize,
        })}
      >
        {child}
      </div>
    ))}
  </div>
);
