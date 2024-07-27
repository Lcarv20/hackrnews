import { cn } from "@/lib/utils";
import clsx from "clsx";
import { ChevronDownIcon, Trash2Icon, XIcon } from "lucide-react";
import React from "react";
import { useId } from "react";
import {
  ClearIndicatorProps,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  InputProps,
  components,
} from "react-select";
import Creatable from "react-select/creatable";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator
      className={cn(props.selectProps.menuIsOpen && "bg-muted text-primary")}
      {...props}
    >
      <ChevronDownIcon
        className={cn(
          "size-5 transition duration-300",
          props.selectProps.menuIsOpen && "rotate-180",
        )}
      />
    </components.DropdownIndicator>
  );
};

const Input = (props: InputProps) => {
  return (
    <components.Input
      {...props}
      aria-activedescendant={undefined}
    ></components.Input>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <XIcon className="size-5" />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <Trash2Icon className="size-3.5" />
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "!min-h-11 rounded-md border border-input bg-background text-sm",
  focus: "ring-offset-background outline-none ring-2 ring-ring ring-offset-2",
  disabled: "cursor-not-allowed opacity-50",
};
const placeholderStyles = "text-muted-foreground ml-1";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-brand text-brand-foreground rounded-md items-center py-0.5 pl-2 pr-1 gap-1.5 overflow-hidden";
const multiValueLabelStyles = "leading-6 py-px break-all line-clamp-1";
const multiValueRemoveStyles =
  "ml-1 p-1 rounded-md hover:bg-destructive hover:text-destructive-foreground";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "cursor-pointer text-muted-foreground p-1 rounded-md hover:bg-destructive hover:text-destructive-foreground";
const indicatorSeparatorStyles = "bg-transparent";
let dropdownIndicatorStyles =
  "cursor-pointer p-1 hover:bg-muted text-muted-foreground rounded-md hover:text-primary";
const menuStyles =
  "border bg-popover p-1 text-popover-foreground shadow-md outline-none rounded-md mt-1.5 text-sm";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "border border-transparent hover:cursor-pointer px-3 py-2 rounded-md text-sm",
  focus: "bg-brand/20 !border-brand",
  selected:
    "after:content-['✔'] after:ml-2 after:text-brand text-muted-foreground",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

export const InputSelect = React.forwardRef<
  React.ElementRef<typeof Creatable>,
  React.ComponentPropsWithoutRef<typeof Creatable>
>((props, ref) => {
  const _instanceId = useId();
  return (
    <Creatable
      ref={ref}
      instanceId={_instanceId}
      closeMenuOnSelect={true}
      hideSelectedOptions={false}
      isClearable
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
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "none",
        }),
      }}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueRemove,
        Input,
      }}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          clsx(
            isFocused && controlStyles.focus,
            isDisabled && controlStyles.disabled,
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
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base,
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      {...props}
    />
  );
});

InputSelect.displayName = "InputSelect";
