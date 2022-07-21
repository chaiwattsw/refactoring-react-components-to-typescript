import * as React from "react";
import cx from "clsx";
import { scope } from "../lib/utils";

const CountDisplay = ({ count, className }: React.VFC<CountDisplayProps>) => {
	let countString = String(Math.max(Math.min(count, 999), -99));
	return (
		<div className={cx(scope("count-display"), className)}>{countString}</div>
	);
};

export { CountDisplay };

interface CountDisplayProps {
	count: number;
	className?: string;
}
