import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type Ref = HTMLInputElement;

type InputElementRefs = React.ComponentProps<"input">;

export const Input = forwardRef<Ref, InputElementRefs>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge([
          "focus:bg-base-200 w-full rounded-lg border border-gray-200 bg-gray-100 px-8 py-4 text-sm font-medium placeholder:text-gray-500 focus:border-gray-400 focus:outline-none",
          className,
        ])}
        {...props}
      />
    );
  }
);
