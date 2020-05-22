import React from "react";
import pageBadges from "../../utils/pageBages";

interface PaginatorProps {
    currentPage:number;
    itemsPerPage:number;
    maxItems ?: number;
    onChangePage ?:any;
    total:number

}

/**
 * Paginator component
 */
export default function Paginator(options:PaginatorProps) {
    const {
        currentPage,
        itemsPerPage,
        maxItems = Infinity,
        onChangePage,
        total
    } = options;
    const numItems = Math.min(total, maxItems - itemsPerPage);
    const pages = Math.ceil(numItems / itemsPerPage);

    if (pages <= 1) return null;

    return (
        <nav className="paginator">
        {/* PREV BUTTON */}
        <button
            disabled={currentPage === 1}
            onClick={() => onChangePage(currentPage - 1)}
            type="button"
        >
            ← Prev
        </button>

        {pageBadges({ currentPage, pages }).map((num, index) =>
            num ? (
            <button
                key={`page-${num}`}
                type="button"
                onClick={num === currentPage ? undefined : () => onChangePage(num)}
                className={`badge ${num === currentPage ? "current" : ""}`}
            >
                {num}
            </button>
            ) : (
            <span key={`separator-${index}`} className="separator">
                ...
            </span>
            )
        )}

        {/* NEXT BUTTON */}
        <button
            disabled={currentPage === pages}
            onClick={() => onChangePage(currentPage + 1)}
            type="button"
        >
            Next →
        </button>
        </nav>
    );
}
