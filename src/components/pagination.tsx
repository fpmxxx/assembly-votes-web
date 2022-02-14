import { useEffect, useState } from "react";

import { Page } from "../types/page";

type Props = {
    totalPage: number;
    onChange: Function;
}
export default function Pagination({ totalPage, onChange } : Props) {
    const [page, setPage] = useState<Page>({
        currentPage: 0,
        totalPage: 0,
        showPreviousPage: false,
        showNextPage: false,
    });

    useEffect(() => {
        page.totalPage = totalPage;
        
        if (totalPage > 1) {
            page.showNextPage = true;
        }

        setPage(page);

    }, [page, totalPage]);

    const refreshPaginator = (newPageNumber: number) => {
        page.currentPage = newPageNumber;
        page.totalPage = totalPage;

        if (page.currentPage > 0) {
            page.showPreviousPage = true;
        } else {
            page.showPreviousPage = false;
        }
        
        if (page.currentPage < (page.totalPage - 1)) {
            page.showNextPage = true;
        } else {
            page.showNextPage = false;
        }

        setPage(page);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className="page-item" style={{ display: page.showPreviousPage ? 'block' : 'none' }}>
                    <button className="page-link" aria-label="Previous"
                        onClick={() => { onChange(page.currentPage - 1); refreshPaginator(page.currentPage - 1) }}>
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li className="page-item" style={{ display: page.showNextPage ? 'block' : 'none' }}>
                    <button className="page-link" aria-label="Next"
                        onClick={() => { onChange(page.currentPage + 1); refreshPaginator(page.currentPage + 1) }}>
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>

            {page.totalPage > 0 ? page.currentPage + 1 : 0} de {page.totalPage}
        </nav>
    );
}