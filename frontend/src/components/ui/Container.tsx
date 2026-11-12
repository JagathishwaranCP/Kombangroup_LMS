import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Shared page width so navbar, hero copy and banner share the same edges. */
const Container = ({ children, className }: ContainerProps) => (
  <div className={cn("container", className)}>{children}</div>
);

export default Container;
