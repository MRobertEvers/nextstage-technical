import { useEffect, useRef } from 'react';
import styles from './modal.module.css';

interface ModalBoxProps {
	children: React.ReactNode;
	visible: boolean;
	onClose: () => void;
}

export function ModalBox(props: ModalBoxProps) {
	const { children, onClose, visible } = props;

	const ref = useRef<any>(null);

	useEffect(() => {
		const ev = (e: MouseEvent) => {
			if (!ref.current?.contains(e.target)) {
				onClose();
				e.stopPropagation();
			}
		};

		window.addEventListener('click', ev);

		return () => {
			window.removeEventListener('click', ev);
		};
	}, [ref, onClose]);

	return (
		<div
			className={[styles['container'], visible ? styles['container-visible'] : ''].join(' ')}
		>
			<div ref={ref} className={styles['prompt']}>
				{children}
			</div>
		</div>
	);
}
