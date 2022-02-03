import React, { RefObject } from 'react';

export const ModalContext = React.createContext<RefObject<HTMLDivElement | null>>({
	current: null
});
