import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/Header";
// import { I18nextProvider } from 'react-i18next';
import { appWithTranslation } from 'next-i18next';
// import i18n from "i18next";

const inter = Inter({ subsets: ["latin"] });
const App = ({ children }) => {

  return (
    <div>
      {/* <I18nextProvider i18n={i18n}> */}
      <Header />
      {children}
      {/* </I18nextProvider> */}
    </div>
  )
}

export default appWithTranslation(App)