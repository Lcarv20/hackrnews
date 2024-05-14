import { cn } from "@/lib/utils";
import { ChevronDownIcon, XIcon } from "lucide-react";
import Select, {
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon className="w-4 h-4" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <XIcon className="w-4 h-4" />
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "border rounded-lg bg-background hover:cursor-pointer",
  focus: "outline-none ring-2 ring-ring ring-offset-2 ring-offset-background",
  nonFocus: "border",
};
const placeholderStyles = "text-muted-foreground pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1 text-accent-foreground";
const singleValueStyles = "leading-7 ml-1 text-foreground";
const multiValueStyles =
  "bg-accent rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5 text-accent-foreground";
const multiValueRemoveStyles = "rounded-md text-destructive p-0.5";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "p-2 rounded-md hover:bg-accent mt-auto";
const indicatorSeparatorStyles = "bg-accent";
const dropdownIndicatorStyles =
  "p-2 hover:bg-accent hover:text-accent-foreground rounded-md mt-auto";
const menuStyles = "p-1 mt-2 border bg-popover rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-accent text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-muted active:bg-accent",
  selected:
    "after:content-['✔'] after:ml-2 after:text-brand text-card-foreground",
};
const noOptionsMessageStyles =
  "text-accent-foreground p-2 bg-accent border border-dashed rounded-sm";

type ReactSelectProps = Parameters<typeof Select>[0];

export const SelectInput = (props: ReactSelectProps) => (
  <Select
    // isMulti
    // closeMenuOnSelect={false}
    hideSelectedOptions={true}
    unstyled
    styles={{
      input: (base) => ({
        ...base,
        "input:focus": {
          boxShadow: "none",
        },
      }),
      // On mobile, the label will truncate automatically, so we want to
      // override that behaviour.
      multiValueLabel: (base) => ({
        ...base,
        whiteSpace: "normal",
        wordWrap: "break-word",
        overflowWrap: "break-word",
      }),
      control: (base) => ({
        ...base,
        transition: "none",
      }),
    }}
    components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
    classNames={{
      control: ({ isFocused }) =>
        cn(
          isFocused ? controlStyles.focus : controlStyles.nonFocus,
          controlStyles.base,
        ),
      placeholder: () => placeholderStyles,
      input: () => selectInputStyles,
      valueContainer: () => valueContainerStyles,
      singleValue: () => singleValueStyles,
      multiValue: () => multiValueStyles,
      multiValueLabel: () => multiValueLabelStyles,
      multiValueRemove: () => multiValueRemoveStyles,
      indicatorsContainer: () => indicatorsContainerStyles,
      clearIndicator: () => clearIndicatorStyles,
      indicatorSeparator: () => indicatorSeparatorStyles,
      dropdownIndicator: () => dropdownIndicatorStyles,
      menu: () => menuStyles,
      groupHeading: () => groupHeadingStyles,
      option: ({ isFocused, isSelected }) =>
        cn(
          isFocused && optionStyles.focus,
          isSelected && optionStyles.selected,
          optionStyles.base,
        ),
      noOptionsMessage: () => noOptionsMessageStyles,
    }}
    {...props}
  />
);
