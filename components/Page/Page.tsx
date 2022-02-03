import { useEffect, useRef } from 'react';
import { ModalContext } from './ModalContext';
import styles from './page.module.scss';

interface PageProps {
	children: React.ReactNode;
}

export function Page(props: PageProps) {
	const { children } = props;

	const pageModalRootRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles['page']}>
			<div
				ref={pageModalRootRef}
				id="page-modal-root"
				className={styles['page-modal-root']}
			/>

			<div className={styles['page-contents']}>
				<ModalContext.Provider value={pageModalRootRef}>{children}</ModalContext.Provider>
			</div>
		</div>
	);
}
