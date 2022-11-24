import "./Button.css";

export function Button (props: any) {
	const mergedClass = `ui-button ${props.className}`;

	return (
		<button className={mergedClass} {...props}>
			{props.children}
		</button>
	);
}
