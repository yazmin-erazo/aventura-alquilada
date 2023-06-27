import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.css'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Select from '../../common/select/Select';

const Pagination = (props) => {

    // const [limit, setLimit] = useState(props.limit)

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

    const items = [{ id: 1, name: 5}, {id: 2, name: 10}, {id: 3, name: 25}]
    const itemsSelect = [{ id: 1, name: 5}, {id: 3, name: 25}]

    //Función para armar los números que tendrá el paginador
    const fetchPageNumbers = () => {

        if (totalPages > 5) {
            const startPage = Math.max(2, props.currentPage - 1);
            const endPage = Math.min(totalPages - 1, props.currentPage + 1);
            let pages = [props.currentPage];

            const hasLeftSpill = startPage > 2;
            const hasRightSpill = (totalPages - endPage) > 1;

            // Caso en el que no tenga flechita a la izq
            // 1 2 3 > 10
            if (!hasLeftSpill && hasRightSpill) {
                pages = [2, 3, RIGHT_PAGE];
            }

            // Caso en el que no tenga flechita derecha
            // 1 < 8 9 10
            if (hasLeftSpill && !hasRightSpill) {
                pages = [LEFT_PAGE, totalPages -2, totalPages -1];
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
        props.setCurrentPage(page);
        props.onPageChanged();
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

    const selectHandler = (id) => {
        const value = items.find(item => item.id === parseInt(id))
        props.setLimit(value.name)
    }

    useEffect(() => {
        goToPage(props.currentPage);
    }, [])

    return (
        <>
            {(!props.total || totalPages === 1) ? null :
                <div className={styles.container}>
                    <div className={styles["pagination-container"]}>
                        <ul className={styles.pagination}>
                            {pages.map((page, index) => {
                                if (page === LEFT_PAGE) {
                                    return (
                                        <li key={index} className={styles["btn-back"]}>
                                            <a className={styles.pageLink} onClick={handleMoveLeft}>
                                                <span><FaChevronLeft /></span>
                                            </a>
                                        </li>)
                                } else if (page === RIGHT_PAGE) {
                                    return (
                                        <li key={index} className={styles["btn-forward"]}>
                                            <a className={styles.pageLink} onClick={handleMoveRight}>
                                                <span><FaChevronRight /></span>
                                            </a>
                                        </li>)
                                } else {
                                    return (<li key={index} className={styles.pageItem + (props.currentPage === page) ? styles.active : ''}>
                                        <a
                                            className={`${styles.pageLink} ${props.currentPage === page ? styles.active : ''}`}
                                            onClick={() => handleClick(page)}
                                        >
                                            {page}
                                        </a>

                                    </li>)
                                }
                            })}
                        </ul>
                    </div>
                    { props.setLimit && <Select options={itemsSelect} placeholder={"Seleccione"} disabledOption={true} onChange={(id) => selectHandler(id)}>Items por página</Select>}
                </div>
            }
        </>
    )
}

export default Pagination