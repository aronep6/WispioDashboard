import { useEffect } from 'react';

const useWebTitle = (title: string) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
};

export default useWebTitle;