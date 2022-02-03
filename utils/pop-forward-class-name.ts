/**
 * Removes classname from the forwarded props, then concats with the input classname.
 */
export function popForwardClassName<T extends { className?: string }>(
	forward: T,
	className: string
): { forward: T; className: string } {
	const popped = {
		...forward
	};
	delete popped['className'];

	const extendedClassName = [className, forward['className'] || ''].join(' ');

	return {
		forward: popped,
		className: extendedClassName
	};
}
