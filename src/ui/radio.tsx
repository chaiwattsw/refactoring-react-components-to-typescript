import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

interface RadioGroupContextValue {
	checked: string;
	onChange(value: string): void;
	name: string;
}

interface RadioContextValue {
	id: string;
	value: string;
}

const RadioGroupContext = React.createContext<null | RadioGroupContextValue>(
	null
);

const RadioGroup = ({
	children,
	checked,
	onChange,
	name,
}: React.FC<RadioGroupProps>) => {
	return (
		<RadioGroupContext.Provider value={{ checked, onChange, name }}>
			{children}
		</RadioGroupContext.Provider>
	);
};

const RadioContext = React.createContext<null | RadioContextValue>(null);

const Radio = ({ children, id, value }: React.FC<RadioProps>) => {
	return (
		<RadioContext.Provider value={{ id: String(id), value: String(value) }}>
			{children}
		</RadioContext.Provider>
	);
};

const RadioInput = React.forwardRef<HTMLInputElement, RadioInputProps>(
	({ children, className, ...props }, forwardedRef) => {
		let { id, value } = useRadioContext("RadioInput");
		let { checked, onChange, name } = useRadioGroupContext("RadioInput");

		return (
			<input
				{...props}
				className={cx(className, scope("radio__input"))}
				type="radio"
				id={id}
				ref={forwardedRef}
				name={name}
				value={value}
				onChange={(event) => {
					props.onChange?.(event);
					if (!event.defaultPrevented) {
						onChange(event.target.value);
					}
				}}
				checked={checked === value}
			>
				{children}
			</input>
		);
	}
);

RadioInput.displayName = "RadioInput";

const RadioLabel = React.forwardRef<HTMLLabelElement, RadioLabelProps>(
	({ children, className, ...props }, forwardedRef) => {
		let { id } = useRadioContext("RadioLabel");
		return (
			<label
				{...props}
				className={cx(scope("radio__label"), className)}
				htmlFor={id}
				ref={forwardedRef}
			>
				{children}
			</label>
		);
	}
);

interface RadioGroupProps {
	checked: string | null | undefined;
	onChange(value: string): void;
	name: string;
}

interface RadioProps {
	id: string | number;
	value: string | number;
}

interface RadioInputProps
	extends Omit<
		React.ComponentPropsWithRef<"input">,
		"id" | "type" | "name" | "checked" | "value"
	> {}

RadioLabel.displayName = "RadioLabel";

function useRadioGroupContext(name: string) {
	const ctx = React.useContext(RadioGroupContext);
	if (!ctx) {
		throw Error(`A ${name} was rendered outside of a RadioGroup component.`);
	}
	return ctx;
}

function useRadioContext(name: string) {
	const ctx = React.useContext(RadioContext);
	if (!ctx) {
		throw Error(`A ${name} was rendered outside of a Radio component.`);
	}
	return ctx;
}

interface RadioLabelProps
	extends Omit<React.ComponentPropsWithRef<"label">, "htmlFor"> {}

export type { RadioGroupProps, RadioProps, RadioInputProps, RadioLabelProps };

export { RadioGroup, Radio, RadioInput, RadioLabel };
