import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactElement,
} from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactElement;
  isActive?: boolean;
  className?: string;
}
export const ShapeMenuButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, isActive, className, ...rest }, ref) => {
    return (
      <button
        className={twMerge(
          "w-10 h-10 rounded bg-inherit flex justify-center items-center hover:bg-slate-100 dark:hover:bg-blue-500 dark:disabled:hover:bg-inherit duration-150 disabled:[&>*]:text-slate-300 disabled:[&>*]:dark:text-slate-400",
          className,
          isActive &&
            "bg-blue-200 dark:bg-blue-500 [&>*]:dark:text-white [&>*]:text-blue-600 hover:bg-blue-200 dark:hover:bg-blue-500"
        )}
        aria-label={rest.title}
        data-isactive={isActive}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
ShapeMenuButton.displayName = "ShapeMenuButton";
