import { FunctionComponent, ReactElement } from "react";
import Header from "../Header/Header";
import ILayoutProps from "./ILayoutProps";
import styles from './Layout.module.css'

const Layout: FunctionComponent<ILayoutProps> = (props): ReactElement => {
    return (
        <div>
            <Header/>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Layout