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
          "w-10 h-10 rounded bg-inherit flex justify-center items-center hover:bg-slate-100 duration-150 disabled:[&>*]:text-slate-300",
          className,
          isActive && "bg-blue-200 [&>*]:text-blue-600"
        )}
        data-isactive={isActive}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
