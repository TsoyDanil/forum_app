import { FunctionComponent, ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

const Header: FunctionComponent = (): ReactElement => {
    return (
        <div className={styles.Header}>
            <div className={styles.Header_inner_container}>
                <p>MY NEWS</p>
                <div className={styles.NavLink_container}>
                    <NavLink
                        className={styles.Header_link}
                        to={'/'}
                    >
                        Main Page
                    </NavLink>
                    <NavLink
                        className={styles.Header_link}
                        to={'/news-form'}
                    >
                        Add post
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Header