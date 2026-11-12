import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-8", className)}>{children}</div>
);

export default Container;
