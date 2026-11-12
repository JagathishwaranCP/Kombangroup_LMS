import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "../../data/content";
import { cn } from "../../utils/cn";
import Button from "../ui/Button";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

/** Past this point the large hero logo settles into the compact top bar. */
const STICKY_AFTER = 48;

/**
 * On the home hero the logo sits large with the CTA.
 * After scroll it moves into a compact sticky top bar.
 * Section links jump to the matching home-page anchors.
 */
const Navbar = () => {
  const menuId = useId();
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > STICKY_AFTER : false,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > STICKY_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "inset-x-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-out",
        scrolled || menuOpen
          ? "fixed top-0 border-b border-border/80 bg-white/95 shadow-[0_8px_24px_rgba(10,23,58,0.08)] backdrop-blur-md"
          : "absolute top-0 border-b border-transparent bg-transparent",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between gap-3 transition-[height] duration-300 ease-out",
          scrolled ? "h-16" : "h-24 sm:h-28",
        )}
      >
        <Logo size={scrolled ? "md" : "lg"} showName />

        <nav aria-label="Section navigation" className="hidden items-center gap-1 lg:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[10px] px-3 py-2 text-sm font-medium text-body transition-colors duration-200 hover:bg-panel hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button to={nav.cta.to} size="sm" className="max-sm:px-4">
            {nav.cta.label}
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[10px] border border-border bg-white text-navy lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? nav.closeLabel : nav.menuLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-border bg-white lg:hidden"
      >
        <Container className="py-3">
          <nav aria-label="Mobile section navigation" className="flex flex-col gap-1">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-[10px] px-3 py-2.5 text-sm font-medium text-navy transition-colors duration-200 hover:bg-panel"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
