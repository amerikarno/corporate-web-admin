import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactElement } from "react";
import { Input } from "@/components/ui/input";

type TInputFormProps = {
  label: string;
  name: string;
  className?: string;
  labelClassName?: string;
  isRequired?: boolean;
  form: any;
  type?: string;
  placeholder?: string;
  step?: string;
  lang?: string;
  msg?: boolean;
  help?: ReactElement;
  pattern?: string;
  disabled?: boolean;
  onFocus?: () => void;
};

export function InputForm(props: TInputFormProps) {
  const {
    label,
    name,
    className,
    labelClassName,
    isRequired,
    form,
    type = "text",
    placeholder,
    step,
    lang,
    msg,
    help,
    onFocus,
    pattern,
    disabled,
    ...rest
  } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {isRequired ? <sup className="text-red-500">*</sup> : null}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              step={step}
              lang={lang}
              placeholder={placeholder}
              onFocus={onFocus}
              disabled={disabled ? true : false}
              {...rest}
              {...field}
            />
          </FormControl>
          {msg ? <FormMessage /> : null}
        </FormItem>
      )}
    />
  );
}
