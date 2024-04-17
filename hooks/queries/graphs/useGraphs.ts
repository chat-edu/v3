import useRows from "@/hooks/queries/base/useRows";
import adaptGraph from "@/hooks/queries/graphs/adapter";

const useGraphs = () => {
    const [
        graphs,
        loading,
        error,
        fetchGraphs
    ] = useRows(`/api/graphs`, adaptGraph);

    return {
        graphs,
        loading,
        error,
        fetchGraphs
    }
}

export default useGraphs;