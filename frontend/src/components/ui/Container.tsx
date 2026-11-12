import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("mx-auto w-full px-5 md:px-8 lg:px-12 xl:px-16", className)}>{children}</div>
);

export default Container;
