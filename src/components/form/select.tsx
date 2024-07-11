import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type TSelectForm = {
  label: string;
  name: string;
  form: any;
  options: { label: string; value: string }[];
  msg?: boolean;
  className?: string;
  placeholder?: string;
  description?: string;
};

export function SelectForm(props: TSelectForm) {
  const {
    label,
    name,
    form,
    options,
    msg,
    className,
    placeholder,
    description,
  } = props;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    placeholder ? placeholder : `Select a ${label} to display`
                  }
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {msg && <FormMessage />}
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
