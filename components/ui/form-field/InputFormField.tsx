import { FormControl, FormField, FormLabel, FormMessage } from "../form";
import { Input } from "../input";

interface InputFormFieldProps {
  form: any; // TODO Replace with the correct type for your form
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

const InputFormField = ({
  form,
  name,
  label,
  type = "text",
  placeholder = "",
}: InputFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full felx-col">
            <FormControl>
              <Input
                className="input-class"
                placeholder={placeholder}
                type={type}
                {...field}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default InputFormField;
