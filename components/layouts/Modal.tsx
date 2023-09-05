import { useUI } from "@/contexts/UIContext";
import ReactPortal from "./ReactPortal";
import {cn} from "@/libs/Utils";
import {useEffect} from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  style?: "transparent" | "opaque"
}

function Modal({
  children, style
}: ModalProps) {
  const { displayModal } = useUI();


  const handleInsideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

    useEffect(() => {
        if(style == null) style = "opaque"
    }, []);



  return (
    <ReactPortal>

        <div  className={`block relative z-20 ${displayModal ? "opacity-100 prevent-scroll" : "opacity-0 pointer-events-none"} transition-all ease-in-out duration-300 delay-100`}>


            <div className={cn(
                `fixed inset-0 transition-all ease-in-out duration-300 delay-100 bg-transparent`,
                {
                    "bg-black/50": displayModal && style === "opaque",
                    "bg-black/10": displayModal && style === "transparent",
                }
            )} />


            <div className={`fixed inset-0 flex items-center justify-center ${displayModal ? "m-0" : "mt-24"} transition-all ease-in-out duration-300 delay-100`}>

              <div className={cn(
                  "shadow-2xl dark:text-white text-black rounded-lg transition-all duration-300 backdrop-blur-sm  min-w-fit w-full md:w-1/3 lg:w-1/4 xl:w-2/5 2xl:w-2/6 relative",
                          {
                              "dark:bg-gray-800 bg-light-gray-800 backdrop-filter-none" :style === "opaque",
                              "dark:bg-gray-800/70 bg-light-gray-400/60 ": style === "transparent",
                          })
              }
                   onClick={handleInsideClick}>
                  {children}
              </div>

            </div>
        </div>

    </ReactPortal>
  )
}

export default Modal;