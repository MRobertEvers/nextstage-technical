import ReactDOM from 'react-dom';
import { Fragment, useContext } from 'react';
import { ModalContext } from './ModalContext';

interface ModalProps {
	children: React.ReactNode;
}

export function Modal(props: ModalProps) {
	const { children } = props;

	const portal = useContext(ModalContext);
	if (!portal) {
		return <Fragment />;
	}

	return ReactDOM.createPortal(children, portal);
}
