import { ChangeEvent, FormEvent, FunctionComponent, ReactElement, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Preloader from "../../components/UI/Prealoder/Preloader";
import INewsDto from "../../interfaces/INewsDto";
import { addNews } from "../../store/news/news.slice";
import { AppState, useAppDispatch } from "../../store/store";
import styles from './AddNewsForm.module.css'

const AddNewsForm: FunctionComponent = (): ReactElement => {

    const dispatch = useAppDispatch()

    const {newsLoading} = useSelector((state: AppState) => state.news)

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const [newsDto, setNewsDto] = useState<INewsDto>({
        header: '',
        content: '',
        image: undefined
    })

    const [fileName, setFileName] = useState<string>('')

    const checkButton = () => {
        newsDto.content.trim() !== '' && newsDto.header.trim() !== '' ? setButtonDisabled(false) : setButtonDisabled(true)
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewsDto(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const inputFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewsDto(prevState => {
            return {...prevState,
                        image: e.target.files ? e.target.files[0] : undefined
            }
        })
        setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : '')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(newsDto).forEach((key: string) => {
            // @ts-ignore
            formData.append(key, newsDto[key])
        })
        dispatch(addNews(formData))
        setNewsDto({
            header: '',
            content: '',
            image: undefined
        })
        setFileName('')
    }

    useEffect(() => {
        checkButton()
    }, [newsDto])

    return(
        <div className={styles.AddNewsForm}>
            {
                newsLoading ? 
                <Preloader/> :
                null
            }
            <div className={styles.AddNewsForm_from}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.AddNewsForm_from_content}>
                        <p>Title:</p>
                        <input
                            className={styles.News_input}
                            onChange={inputHandler} 
                            name={'header'} 
                            value={newsDto.header}
                            placeholder={'Add header...'}
                            autoComplete={'off'}
                        />
                        <p>Content</p>
                        <textarea
                            className={styles.News_input}
                            onChange={inputHandler}
                            name={'content'}
                            value={newsDto.content}
                            placeholder={'Add content'}
                        />
                        <label>
                                <div className={styles.Add_file_button}/>
                                <span>{fileName}</span>
                                <input
                                    className={styles.FileInput}
                                    type={'file'}
                                    name={'image'}
                                    onChange={inputFileHandler} 
                                    accept="image/png, image/gif, image/jpeg"                    
                                />
                        </label>
                        <button
                            disabled={buttonDisabled}
                        >POST</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewsForm