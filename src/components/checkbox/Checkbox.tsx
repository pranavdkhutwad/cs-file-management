import { ChangeEvent, FC, useEffect, useRef } from "react";
import { CHECKBOX_STATES } from "../../constants";

interface CheckboxProps {
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Checkbox: FC<CheckboxProps> = ({ label, value, onChange }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value === CHECKBOX_STATES.CHECKED) {
      if (checkboxRef.current) {
        checkboxRef.current.checked = true;
        checkboxRef.current.indeterminate = false;
      }
    } else if (value === CHECKBOX_STATES.UNCHECKED) {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = false;
      }
    } else if (value === CHECKBOX_STATES.INDETERMINATE) {
      if (checkboxRef.current) {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
      }
    }
  }, [value]);

  return (
    <label>
      <input
        style={{ accentColor: "#9d3039 !important" }}
        ref={checkboxRef}
        type="checkbox"
        onChange={onChange}
      />
      {label ? label : null}
    </label>
  );
};

export default Checkbox;
