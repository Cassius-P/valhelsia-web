import React from 'react';
import { useUI } from "@/contexts/UIContext";
import MainFrame from './MainFrame';
import Modal from './Modal';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {


	const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
		modalView,
		closeModal,
		...props
	}) => {

		return  (
			<Modal onClose={closeModal}>
				<p>test</p>
			</Modal>
		)
	}

	const ModalUI: React.FC = () => {
		const { closeModal, modalView } = useUI()
		return (
			<ModalView modalView={modalView} closeModal={closeModal} />
		)
	}


	return (
		<div className="ark:bg-gray-700 bg-light-gray-600 min-h-screen min-w-screen flex overflow-hidden dark:text-white text-gray-600">

			<MainFrame>
				{children}
			</MainFrame>
			<ModalUI />
		</div>
	)
}


export default Layout
