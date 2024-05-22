import { useTranslation } from 'react-i18next'
import './style.css'
import { PuffLoader } from 'react-spinners'
export const ShowAllButton = ({ onClick = () => { }, loading }) => {
    const { t } = useTranslation()

    return <button disabled={loading} onClick={() => onClick()} className="ShowAllButton">
        {loading ?
            <PuffLoader size={35} color="#FEE827" /> :
            t('Showall')
        }
    </button>
}