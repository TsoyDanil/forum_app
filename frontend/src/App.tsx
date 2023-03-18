import { FunctionComponent, ReactElement, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AddNewsForm from "./containers/AddNewsForm/AddNewsForm";
import FullNewsBlock from "./containers/FullNewsBlock/FullNewsBlock";
import MainNewsPage from "./containers/MainNewsPage/MainNewsPage";

const App: FunctionComponent = (): ReactElement => {
  
  return(
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<MainNewsPage/>}/>
          <Route path="/news/:id" element={<FullNewsBlock/>}/>
          <Route path="/news-form" element={<AddNewsForm/>}/>
          <Route path="*" 
            element={<h1 style={{paddingTop: '50px', textAlign: 'center'}}>Page not Found</h1>}/>
        </Routes>
      </Layout>
    </>
  )
}

export default App