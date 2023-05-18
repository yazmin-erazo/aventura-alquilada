import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = (props) => {

    

    const totalPages = Math.ceil(props.total / props.limit);

    const LEFT_PAGE = 'LEFT';
    const RIGHT_PAGE = 'RIGHT';

    //Función para determinar los números que irán en el paginador, dependiendo de la página en la que estoy parado
    const range = (from, to) => {
        const range = [];
        for (let i = from; i <= to; i++) {
            range.push(i);
        }
        return range;
    }

    //Función para armar los números que tendrá el paginador
    const fetchPageNumbers = () => {

        if (totalPages > 5) {
            const startPage = Math.max(2, props.currentPage - 1);
            const endPage = Math.min(totalPages - 1, props.currentPage + 1);
            let pages = [props.currentPage];

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;
            const spillOffset = 5 - (totalPages.length + 1);

            // Caso en el que no tenga flechita a la izq
            // 1 2 3 > 10
            if (!hasLeftSpill && hasRightSpill) {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
            }

            // Caso en el que no tenga flechita derecha
            // 1 < 8 9 10
            if (hasLeftSpill && !hasRightSpill) {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
            }

            // Caso en el que tiene ambas flechitas
            // 1 < 5 > 10
            if (hasLeftSpill && hasRightSpill) {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
            }

            return [1, ...pages, totalPages]
        }

        return range(1, totalPages);
    }

    
    const goToPage = page => {
        props.onPageChanged()
        props.setCurrentPage(page)
        fetchPageNumbers();
    }
    
    const handleMoveLeft = e => {
        e.preventDefault();
        goToPage(props.currentPage - 1);
    }
    
    const handleMoveRight = e => {
        e.preventDefault();
        goToPage(props.currentPage + 1);
    }
    
    const handleClick = page => {
       // e.preventDefault();
        goToPage(page);
    }
    
    const pages = fetchPageNumbers();
    
    useEffect( () => {
        console.log(props);
        goToPage(props.currentPage);
    }, [])

    return (
        <>
            {(!props.total || totalPages === 1) ? null :

                <div>
                    <ul className={styles.pagination}>
                        {pages.map((page, index) => {
                            if(page === LEFT_PAGE){ 
                                return(
                            <li key={index} className={styles.pageItem}>
                                <a className={styles.pageLink} onClick={handleMoveLeft}>
                                    <span><FaChevronLeft /></span>
                                </a>
                            </li>)
                            } else if(page === RIGHT_PAGE) {
                                return (
                                <li key={index} className={styles.pageItem}>
                                    <a className={styles.pageLink} onClick={handleMoveRight}>
                                        <span><FaChevronRight /></span>
                                    </a>
                                </li>)
                            } else { return (<li key={index} className={styles.pageItem + (props.currentPage === page) ? styles.active : ''}>
                                <a className={styles.pageLink} onClick={() => handleClick(page)}>{page}</a>
                            </li>)
                            }})}
                    </ul>
                </div>
            }
        </>
    )
}

export default Pagination