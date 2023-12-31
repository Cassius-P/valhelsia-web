import React from 'react';
import { useUI } from "@/contexts/UIContext";
import MainFrame from './MainFrame';
import Modal from './Modal';
import CommandPalette from "@/components/modals/CommandPalette";
import LoginModal from "@/components/modals/LoginModal";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {




	const ModalUI: React.FC = () => {
		const { closeModal, modalView, displayModal } = useUI()
		return (

					<Modal onClose={closeModal} style={(modalView == "SEARCH" || modalView == "LOGIN") ? "transparent" : "opaque"}>
						{modalView === "SEARCH" && <CommandPalette />}
						{modalView === "LOGIN" && <LoginModal />}
					</Modal>
		)
	}


	return (
		<div className="dark:bg-gray-700 bg-light-gray-600 min-h-screen min-w-screen flex overflow-hidden dark:text-white text-gray-600">
			<MainFrame>
				{children}
			</MainFrame>
			<ModalUI />
		</div>
	)
}


export default Layout
