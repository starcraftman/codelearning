import { useRouter } from "next/router";

function Detailpage() {
    const router = useRouter();
    

    return <h1>The Details for: {router.query.newsId}</h1>
}

export default Detailpage;