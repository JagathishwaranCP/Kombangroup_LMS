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

/** Responsive signup/search field — stacks on very small phones. */
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
        "flex flex-col gap-2 rounded-md border border-border bg-white p-1.5 shadow-sm ring-electric ring-offset-2 ring-offset-white focus-within:ring-2 sm:flex-row sm:items-center sm:gap-0",
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
        className="w-full min-w-0 flex-1 text-ellipsis bg-transparent px-3 py-2 font-ui text-sm text-navy placeholder:text-body focus:outline-none sm:py-0"
      />
      <Button type="submit" size="sm" className="w-full shrink-0 sm:w-auto">
        {buttonLabel}
      </Button>
    </form>
  );
};

export default InlineForm;
