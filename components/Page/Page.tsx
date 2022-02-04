import { useCallback, useEffect, useRef, useState } from 'react';
import { ModalContext } from './ModalContext';
import styles from './page.module.scss';

interface PageProps {
	children: React.ReactNode;
}

export function Page(props: PageProps) {
	const { children } = props;

	const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);
	const pageModalCallbackRef = useCallback((ref: HTMLDivElement | null) => {
		setModalRoot(ref);
	}, []);

	return (
		<div className={styles['page']}>
			<div
				ref={pageModalCallbackRef}
				id="page-modal-root"
				className={styles['page-modal-root']}
			/>

			<div className={styles['page-contents']}>
				<ModalContext.Provider value={modalRoot}>{children}</ModalContext.Provider>
			</div>
		</div>
	);
}
