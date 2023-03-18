import { FunctionComponent, ReactElement } from "react";
import INewsBlockProps from "./INewsBlockProps";
import styles from './NewsBlock.module.css'
import image_not_found from '../../assets/image_not_found.png'
import pin from '../../assets/pin.png'

const NewsBlock: FunctionComponent<INewsBlockProps> = (props): ReactElement => {

    return(
        <div className={styles.NewsBlock}>
                <img alt="pin" src={pin} className={styles.PinImage}/>
                <div className={styles.Image_frame}>
                    <img 
                        className={styles.Image_post} 
                        src={ import.meta.env.VITE_BASE_URL + 'uploads/' + props.newsData.image}
                        alt={props.newsData.header + 'image'}
                        onError = {(e) => {
                            e.currentTarget.src = image_not_found
                        }}
                    />
                </div>
                <div>
                    <p>{props.newsData.header}</p>
                    <p>{new Date(props.newsData.timestamp).toLocaleString()}</p>
                </div>      
                <div>
                    <button onClick={props.goToFull}>READ</button>
                    <button onClick={props.deleteNews}>DELETE</button>
                </div>
        </div>
    )
}

export default NewsBlock