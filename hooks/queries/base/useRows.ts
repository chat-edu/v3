import {useCallback, useEffect, useState} from "react";

const useRows = <RowType, ReturnType>(url: string, adapter: (row: RowType) => ReturnType) => {

    const [data, setData] = useState<ReturnType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if(url === '') return;
        await fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then((data: RowType[]) => setData(data.map(adapter)))
            .catch(error => setError(error))
        setLoading(false);
    }, [url])

    useEffect(() => {
        fetchData();
    }, [fetchData, url]);

    return [data, loading, error, fetchData] as const
}

export default useRows;