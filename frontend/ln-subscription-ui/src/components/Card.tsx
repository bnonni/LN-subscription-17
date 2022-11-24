import './Card.css';

export function Card (props: any) {
	const mergedClass = `ui-card ${props.className}`
	
	return (
		<div className={mergedClass} {...props}>
			{props.children}
		</div>
	);
}
