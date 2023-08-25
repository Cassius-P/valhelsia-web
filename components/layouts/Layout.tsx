import React, {useEffect} from 'react';
import { useUI } from "@/contexts/UIContext";
import MainFrame from './MainFrame';
import Modal from './Modal';
import {Tooltip} from "react-tooltip";





interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {


	const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
		modalView,
		closeModal,
		...props
	}) => {

		console.log("Props layout", props)

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

	const { setModalView, openModal, closeModal, lightMode } = useUI();


	useEffect(() => {
		if(lightMode) {
			document.documentElement.classList.remove('dark')
		}else{
			document.documentElement.classList.add('dark')
		}
	}, [lightMode]);


	return (
		<div className="bg-gray-100 dark:bg-gray-700 min-h-screen min-w-screen flex overflow-hidden">

			<MainFrame>
				{children}
			</MainFrame>
			<ModalUI />
		</div>
	)
}


export default Layout
