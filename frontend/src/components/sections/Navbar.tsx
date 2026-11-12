import { useEffect, useState } from "react";
import { nav } from "../../data/content";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

/** Scroll distance after which the bar leaves the hero card: 24px offset + 96px bar. */
const STICKY_AFTER = 120;

/**
 * Logo and register button. Overlays the top of the hero card, then turns into
 * a solid sticky bar once the page scrolls past it.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(() => window.scrollY > STICKY_AFTER);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > STICKY_AFTER);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "inset-x-0 z-50",
        scrolled
          ? "fixed top-0 animate-fade-in bg-primary shadow-[0_8px_24px_rgba(6,9,37,0.35)]"
          : "absolute top-6",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            scrolled ? "h-20" : "h-[5.25rem] sm:h-24",
          )}
        >
          <Logo size={scrolled ? "md" : "lg"} />
          <Button to={nav.cta.to} size="sm" className="max-sm:px-4">
            {nav.cta.label}
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
