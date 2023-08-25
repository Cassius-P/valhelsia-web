import {useRouter} from "next/router";
import {useEffect} from "react";

const AdvancementsIndexPage = () => {


    const router = useRouter();

    useEffect(() => {
        router.push('/advancements/advancedperipherals')
    }, []);


}

export default AdvancementsIndexPage