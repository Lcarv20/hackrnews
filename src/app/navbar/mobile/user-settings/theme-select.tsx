import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { twJoin } from "tailwind-merge";
import { themes } from "@/utils/themes";
import { useTheme } from "@/utils/hooks/theme";

export default function ThemeSelect() {
	const {theme, toggleTheme} = useTheme()

	return (
		<div>
			<label htmlFor="theme-btn" className="text-2xl">
				Preferred Theme
			</label>
			<div
				className={twJoin(
					"relative bg-surface2 rounded-lg",
					"focus-within:ring-2 ring-primary relative",
				)}
			>
				<span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
					{theme.icon}
				</span>
				<select
					name="theme-btn"
					id="theme-btn"
					className={twJoin(
						"w-full bg-inherit flex-grow appearance-none",
						"outline-none pl-10 py-2.5 pr-4 rounded-lg",
					)}
					value={theme.name}
					onChange={(e) => {
						toggleTheme(e.target.value)
					}}
				>
					{themes.map((theme) => (
						<option key={theme.name} value={theme.name} data-icon={theme.icon}>
							{theme.name}
						</option>
					))}
				</select>
				<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
					<ChevronDownIcon className="w-5 h-5" />
				</span>
			</div>
		</div>
	);
}
