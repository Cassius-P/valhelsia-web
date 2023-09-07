import {cn} from "@/libs/Utils";

const PlaceholderList = () => {
    const placeholders = [];

    for (let i = 0; i < 12; i++) {
        placeholders.push(
            <div key={i} className="flex items-center w-full p-2 justify-center animate-pulse">

                <div className={
                    cn('w-full aspect-square rounded-full flex p-1 placeholder-item bg-light-gray-700 dark:bg-gray-700')}
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