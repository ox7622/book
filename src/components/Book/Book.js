import './Book.css';
import { useEffect, useState } from "react";
import { book } from '../../constants/data';


const Book = ({ message, setMessage, error, sendError, data }) => {
    const [pageNum, setPageNum] = useState(0);
    const [chapterNum, setChapterNum] = useState(0);
    const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        setMessage('');
        sendError('')
    }, [])


    const onClickNext = () => {
        // handleClickNext();
        setMessage('');
        const chaptersCount = book.chapters.length;
        const pagesCount = book.chapters[chapterNum].pages.length;
        console.log(pageNum, pagesCount);
        if (pageNum + 1 === pagesCount && chapterNum + 1 < chaptersCount) {
            console.log(pageNum, pagesCount);
            setChapterNum(prev => prev + 1);
            setPageNum(0);

        } else if (pageNum + 1 < pagesCount) {
            setPageNum(prev => prev + 1)
        } else if (chapterNum + 1 === chaptersCount) {
            setMessage("Это последняя страница. Вы дочитали книгу!")
        }
    }

    const onClickPrev = () => {
        // handleClickPrev();
        setMessage('');
        const pagesCount = book.chapters[chapterNum].pages.length;
        console.log(pageNum, chapterNum);
        if (pageNum > 0 && chapterNum >= 0) {
            setPageNum(prev => prev - 1);

        } else if (pageNum === 0 && chapterNum === 0) {
            setMessage("Это первая страница книжки");
        } else if (pageNum === 0 && chapterNum > 0) {

            setChapterNum(prev => prev - 1)
            setPageNum(pagesCount - 1);

        }
    }



    const handleChapterClick = (e) => {
        console.log(e);
    }

    const handleCloseNav = () => {
        if (navOpen) {
            setNavOpen(false)
        } else {
            setNavOpen(true)
        }

    }

    return (
        <div className="book">
            <nav className={`book__nav ${!navOpen && "book__nav_closed"}`}>
                <button type='button' onClick={handleCloseNav} className={`nav__close ${navOpen && "nav__close_opened"}`} />
                <h2 className={`chapters__header ${navOpen ? "visible" : "hidden"}`}>Chapters</h2>
                <ul className={`chapters-list ${navOpen ? "visible" : "hidden"}`}>
                    {book.chapters.map(item => <li key={item.id} onClick={handleChapterClick}>{`Chapter ${item.id} - ${item.title}`}</li>)}
                </ul>
            </nav>
            <div className={`book__content ${!navOpen && "book__content_full"}`}>
                <h3>{`Chapter ${book.chapters[chapterNum].id} - ${book.chapters[chapterNum].title}`}</h3>
                <p>{message}</p>
                <p>{error}</p>
                <div className="book__page">
                    <p>{book.chapters[chapterNum].pages[pageNum].content}</p>
                    {book.chapters[chapterNum].pages[pageNum].picture === '' ? '' : <img alt='картинки фильмов' src={`https://api.nomoreparties.co/${data[pageNum].image.url}`}></img>}

                </div>

                <div className='buttons' >
                    <button type="button" className='button__previous' onClick={onClickPrev}></button>
                    <p className="page-num">{book.chapters[chapterNum].pages[pageNum].id}</p>
                    <button type="button" className='button__next' onClick={onClickNext} />
                </div>
            </div>

        </div>

    )
}

export default Book;