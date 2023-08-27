import {NextPageContext} from "next";

const Error = ({ statusCode }: {statusCode: any}) => {
    const goBack = () => {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    };

    return (
        <section className={'w-full h-full flex flex-col justify-center items-center dark:bg-gray-600 bg-white text-center'}>
            <h1 className={'text-6xl font-bold dark:text-white text-black'}>
                Oops!
            </h1>
            <p className={'text-2xl mt-4 dark:text-light-gray-900 text-gray-700'}>
                {statusCode
                    ? `An error ${statusCode} occurred on the server`
                    : 'An error occurred on the client'}
            </p>
            <button onClick={goBack} className={'mt-8 text-blue-500 hover:underline'}>
                Go Back
            </button>
        </section>
    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
}

export default Error;