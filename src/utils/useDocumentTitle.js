import { useEffect, useState } from "react";

export const useDocumentTitle = title => {
    const [document_title, setDoucmentTitle] = useState(title);
    useEffect(() => {
        document.title = document_title;
    }, [document_title]);

    return [document_title, setDoucmentTitle];
};