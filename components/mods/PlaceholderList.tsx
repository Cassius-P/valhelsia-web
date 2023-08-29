import {cn} from "@/utils/Utils";

const PlaceholderList = () => {
    const placeholders = [];

    for (let i = 0; i < 12; i++) {
        placeholders.push(
            <div className="flex items-center w-full p-2 justify-center">

                <div className={
                    cn('w-full aspect-square rounded-full flex p-1 placeholder-item animated-placeholder dark:animated-placeholder transition-all')}
                >
                            <span className={'bg-origin-content bg-center bg-no-repeat bg-contain w-full aspect-square rounded-full'}>
                            </span>
                </div>
            </div>
        );
    }

    return <>{placeholders}</>;
};

export default PlaceholderList;