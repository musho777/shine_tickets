import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { FbSvg, InstagramSvg } from '../svg'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { GetFeedback } from '../../services/action/action'
import img from '../../assets/logo2.png'
import Image from 'next/image'

export const Footer = ({ menu }) => {
    const getCategory = useSelector((st) => st.getCategory)
    const { language } = useSelector((st) => st.StaticReducer)
    const { Event_reducer } = useSelector((st) => st)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        dispatch(GetFeedback())
    }, [dispatch])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    const handleEmailButtonClick = () => {
        const recipient = 'info@shinetickets.com';
        const subject = '';
        const body = '';
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    };

    return (
        <div className='footerWrapper'>
            <div className='container' id='footerWrapperDiv'>
                <div className='footerColumns'>
                    <Image
                        width={200}
                        onClick={() => scrollToTop()} src={img} />
                    <p className=''>
                        {t('SHINETICKETSLLC')} <span className='PrivacyPolicySpan' onClick={() => window.location = ('PrivacyPolicy')}>{t('SHINETICKETSLLC2')}</span> {t('SHINETICKETSLLC1')}
                    </p>
                </div>
                <div className='footerColumnsWrapper'>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>{t('Contactus')}</p>
                        <div className='footerColumnsInfo'>
                            <p onClick={() => window.location.href = `tel:${Event_reducer.feedback?.phone}`} id={'footerColumnsInfo'}>{Event_reducer.feedback?.phone}</p>
                            <p onClick={() => handleEmailButtonClick()} id={'footerColumnsInfo'}>info@shinetickets.com</p>
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>{t('Sections')}</p>
                        <div className='footerColumnsInfo'>
                            {getCategory.category.map(elm => {
                                let title = ''
                                if (language === 'am') {
                                    title = elm.name
                                } else if (language === 'en') {
                                    title = elm.name_en
                                } else if (language === 'ru') {
                                    title = elm.name_ru
                                }
                                return <p onClick={() => window.location = (`/Category/${elm.name}/${elm?._id}`)}>
                                    {title}
                                </p>
                            })}
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>{t('innetworks')}</p>
                        <div className='Social'>
                            <div onClick={() => window.open(`${Event_reducer.feedback?.instagram}`, "_blank")}>
                                <InstagramSvg />
                            </div>
                            <div onClick={() => window.open(`${Event_reducer.feedback?.facebook}`, "_blank")}>
                                <FbSvg />
                            </div>
                            {/* <div onClick={() => window.open(`${Event_reducer.feedback?.twitter}`, "_blank")}>
                                <TwitterSvg />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' id='mobileFotter'>

                <div className='footerColumnsWrapper'>
                    <div className='footerColumnsWrapperDiv'>
                        <div className='footerColumnsWrapperDivMObile'>
                            <p className='footerColumnsTitle'>{t('Contactus')}</p>
                            <div className='footerColumnsInfo'>
                                <p onClick={() => window.location.href = `tel:${Event_reducer.feedback?.phone}`}>{Event_reducer.feedback?.phone}</p>
                                <p onClick={() => handleEmailButtonClick()}>info@shinetickets.com</p>
                            </div>
                        </div>
                        <div className='footerColumnsWrapperDiv'>
                            <p className='footerColumnsTitle'>{t('innetworks')}</p>
                            <div className='Social'>
                                <div onClick={() => window.open(`${Event_reducer.feedback?.instagram}`, "_blank")}>
                                    <InstagramSvg />
                                </div>
                                <div onClick={() => window.open(`${Event_reducer.feedback?.facebook}`, "_blank")}>
                                    <FbSvg />
                                </div>
                                {/* <div onClick={() => window.open(`${Event_reducer.feedback?.twitter}`, "_blank")}>
                                    <TwitterSvg />
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='footerColumnsWrapperDiv'>
                        <p className='footerColumnsTitle'>{t('Sections')}</p>
                        <div className='footerColumnsInfo'>
                            {getCategory.category.map(elm => {
                                let title = ''
                                if (language === 'am') {
                                    title = elm.name
                                } else if (language === 'en') {
                                    title = elm.name_en
                                } else if (language === 'ru') {
                                    title = elm.name_ru
                                }
                                return <p onClick={() => window.location = `/Category/${elm?.name}/${elm?._id}`}>
                                    {title}
                                </p>
                            })}
                        </div>
                    </div>

                </div>
                <div className='footerColumns'>
                    <Image
                        width={50}
                        height={40}
                        onClick={() => scrollToTop()} src={img} />
                    <p className=''>
                        {t('SHINETICKETSLLC')}
                    </p>
                </div>
            </div>
        </div >
    )
}