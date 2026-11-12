import { useId, useState } from "react";
import type { FormEvent } from "react";
import { cn } from "../../utils/cn";
import Button from "./Button";

interface InlineFormProps {
  /** Visually hidden label for the input. */
  label: string;
  placeholder: string;
  buttonLabel: string;
  type: "search" | "email";
  name: string;
  required?: boolean;
  onSubmit: (value: string) => void;
  className?: string;
}

/** White input box with the primary button inside it (hero search, CTA signup). */
const InlineForm = ({
  label,
  placeholder,
  buttonLabel,
  type,
  name,
  required = false,
  onSubmit,
  className,
}: InlineFormProps) => {
  const inputId = useId();
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <form
      role={type === "search" ? "search" : undefined}
      onSubmit={handleSubmit}
      className={cn(
        "flex rounded-md border border-border bg-white p-1.5 shadow-sm ring-electric ring-offset-2 ring-offset-white focus-within:ring-2",
        className,
      )}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        className="w-full min-w-0 flex-1 text-ellipsis bg-transparent px-2 font-ui text-sm text-navy placeholder:text-body focus:outline-none sm:px-3"
      />
      {/* Tighter padding on phones leaves room for the whole placeholder. */}
      <Button type="submit" size="sm" className="max-sm:px-4">
        {buttonLabel}
      </Button>
    </form>
  );
};

export default InlineForm;
