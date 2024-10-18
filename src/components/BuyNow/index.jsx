import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { CheckSvg, CheckedSvg, SelectSvg, SelectedSvg } from '../svg'
import { PuffLoader } from 'react-spinners'
import 'react-phone-input-2/lib/style.css'
import { useTranslation } from 'react-i18next'
import InputMask from 'react-input-mask';
import Image from 'next/image'

export const BuyNow = ({ event, open, }) => {
    const { language } = useSelector((st) => st.StaticReducer)
    const scrollRef = useRef();

    const scrollToBottom = () => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            container.scrollTop = container.scrollHeight;
        }
    };

    const { t } = useTranslation()
    const tickets = useSelector((st) => st.tiketsForBuy)
    const [chedked, setChedker] = useState(false)
    const [selectPay, setSelectPay] = useState("arca")
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [additional, setAdditional] = useState('')
    const [address, setAddress] = useState('')
    const [disableButton, setDisableButton] = useState(false)
    const { creatTicket } = useSelector((st) => st)
    const [delivery, setDelivery] = useState(false)
    const [seat_list, setSeat_list] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        name: '',
        email: '',
        phonNumber: '',
        checked: '',
        address: ''
    })

    useEffect(() => {
        setName('')
        setNumber('')
        setChedker(false)
        setSelectPay('arca')
        setEmail('')
        setAddress('')
        setAdditional('')
        setError({
            name: '',
            email: '',
            phonNumber: '',
            checked: '',
            address: ''
        })
    }, [open])

    useEffect(() => {
        if (selectPay == 'arca') {
            if (name == '' || number == '' || address == '' || email == '') {
                setDisableButton(true)
            }
            else {
                setDisableButton(false)
            }
        }
        else {
            if (name == '' || number == '' || email == '') {
                setDisableButton(true)
            }
            else {
                setDisableButton(false)
            }
        }

    }, [name, number, address, email, selectPay])

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    function handlePurchase() {
        let event_seats = []
        tickets.tickets.map((elm, i) => {
            event_seats.push(elm.id)
        })
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formattedNumber = number.replace(/\D/g, "");
        console.log(language, 'language')
        var raw = JSON.stringify({
            "locale": language,
            "user": {
                "first_name": name,
                "last_name": name,
                "email": email,
                "phone": formattedNumber,
                "address": address,
                "description": additional
            },
            "project_event_id": event.id,
            "event_seats": event_seats,
            "event_date_id": event.dates[0].id,
            "payment_method": selectPay,
            "seat_description": seat_list,
            "entrances": {},
            "bonus": 0
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        setLoading(true)

        fetch("https://dev2.shinetickets.com/api/v1/da98243f-9a26-48de-893a-40491b6619e2/pending-seats-for-reserve", requestOptions)
            .then(response => response.json())
            .then(res => {
                console.log(res?.error)
                if (res?.success) {
                    setLoading(false)
                    if (selectPay == 'shipping') {
                        window.location = '/DeliveryStatusPage'
                    }
                    else {
                        window.open(res?.redirectURL)
                        window.location.reload()
                    }
                }
                else {
                    if (res?.error[0]) {
                        alert(res.error[0])
                    }
                    else {
                        alert(t('Pleasetryagainlater'))
                    }
                    setLoading(false)
                }
            })
            .catch(error => {
                if (res.error[0]) {
                    alert(res.error[0])
                }
                else {
                    alert(t('Pleasetryagainlater'))
                }

                setLoading(false)
            });
    }

    const validation = () => {
        let item = { ...error }
        if (!name) {
            item.name = 'error'
        }
        else if (name) {
            item.name = ''
        }
        if (!number) {
            item.phonNumber = 'error'
        }
        else if (number.length < 11) {
            item.phonNumber = 'error'
        }
        else if (number) {
            item.phonNumber = ''
        }
        if (!ValidateEmail(email)) {
            item.email = 'error'
        }
        else if (ValidateEmail(email)) {
            item.email = ''
        }
        if (!chedked) {
            item.checked = 'error'
            scrollToBottom()
        }
        else if (chedked) {
            item.checked = ''
        }
        // if (selectPay == "shipping") {
        if (address.length <= 11) {
            item.address = 'error'
        }
        else {
            item.address = ''

        }
        // }
        if (item.name == '' && item.address == '' && item.checked == '' && item.email == '' && item.phonNumber == '') {
            handlePurchase()
        }
        setError(item)
    }

    useEffect(() => {
        if (creatTicket.status && selectPay == "arca") {
            window.location = `/StatusACBA`
        }
    }, [creatTicket])


    useEffect(() => {
        let item = []
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        tickets.tickets?.map((elm, i) => {
            item.push(elm.id)
        })
        var raw = JSON.stringify({
            "locale": language,
            "elements": item
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        fetch("https://dev2.shinetickets.com/api/v1/da98243f-9a26-48de-893a-40491b6619e2/selected-event-seats", requestOptions)
            .then(response => response.json())
            .then(res => {
                setSeat_list(res.data)
            })
            .catch(error => {
            });
    }, [])


    return (
        <div className='BuyNow'>
            {/* <div className='BuyNowHeader'>
                <p className='BuyNowHeaderTitle'>{title}</p>
                <p className='BuyNowHeaderDate'> </p>
            </div> */}
            <div className='BuyNowBody'>
                <div className='InputTextareWrapper'>
                    <div className='InputWrapperBuy'>
                        <div className='InputWeapper'>
                            <input
                                className='InputsBuy'
                                placeholder={t('NameSurname')}
                                id={error.name != '' ? 'errorInut' : 'inout'} value={name} onChange={(e) => setName(e.target.value)} />
                            {error.name && <p>{t('requiredfield')}</p>}
                        </div>
                        <div className='InputWeapper'>
                            <InputMask
                                className='InputsBuy'
                                value={number}
                                mask="+374 (99) 999-999"
                                placeholder={t('PhoneNumber')}
                                onChange={e => setNumber(e.target.value)}
                                id={error.phonNumber != '' ? 'errorInut' : 'inout'}
                            />
                            {error.phonNumber && <p>{t('requiredfield')}</p>}
                        </div>
                        <div className='InputWeapper'>
                            <input
                                className='InputsBuy'
                                placeholder={t('Email')} id={error.email != '' ? 'errorInut' : 'inout'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            {error.email && <p>{t('requiredfield')}</p>}
                        </div>
                    </div>
                    <textarea
                        className='TextareBuy'
                        placeholder={t('Notes')}
                        value={additional} onChange={(e) => setAdditional(e.target.value)} />
                    <div className='InputWeapperDelivery'>
                        <input
                            placeholder={t('Deliveryaddress')}
                            className='InputsBuyDelvery' id={error.address != '' ? 'errorInut' : 'inout'} value={address} onChange={(e) => setAddress(e.target.value)} />
                        {error.address && <p>{t('addressError')}</p>}
                    </div>
                </div>
                <div className='selectPay' onClick={() => {
                    setDelivery(false)
                    setSelectPay("arca")
                }}>
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == 'arca' ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <div className='BuyMethodSelectImg'>
                            <Image alt='' width={80} height={34} src={require('../../assets/MIR_logo.png')} />
                            <Image alt='' width={55} height={34} src={require('../../assets/amex_logo.png')} />
                            <Image alt='' width={55} height={34} src={require('../../assets/mastercard_logo.png')} />
                            <Image alt='' width={80} height={34} src={require('../../assets/visa_logo.png')} />
                            <Image alt='' width={55} height={34} src={require('../../assets/arca_logo.png')} />
                        </div>
                    </div>
                    <p className={selectPay == 'arca' && 'activeSelectedBuy'}>{t('Youwillreceive')}</p>
                </div>
                {/* <div className='selectPay' onClick={() => {
                    Select(2)
                    setDelivery(false)
                }}>
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == 2 ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <img alt='' width={65} height={34} src={require('../../assets/TelCell.png')} />
                    </div>
                    <p className={selectPay == 2 && 'activeSelectedBuy'}>{t('Youwillreceive')}</p>
                </div> */}
                <div className='selectPay' onClick={() => {
                    setDelivery(true)
                    setSelectPay("shipping")
                }} >
                    <div>
                        <div className='BuyMethodSelect'>
                            {selectPay == "shipping" ? <SelectedSvg /> : <SelectSvg />}
                        </div>
                        <Image width={68} height={34} src={require('../../assets/22.png')} />
                    </div>
                    <p className={selectPay == 'shipping' && 'activeSelectedBuy'}>{t('Shippingisfree')}</p>

                </div>
                <div className='BuyEndWrapper'>
                    <div className='BuyEnd'>
                        <div className='ReadAndAgree'>
                            <div
                                onClick={() => setChedker(!chedked)}>
                                {chedked
                                    ? <CheckedSvg />
                                    : <CheckSvg error={error?.checked == ''} />
                                }
                            </div>
                            <a className='textDD' style={error.checked ? { color: 'red' } : { color: '' }} href='https://shinetickets.com/PrivacyPolicy'>{t('Termsandconditions')}</a>
                        </div>
                        <div className='ReadAndAgree'>
                            {error.checked && <p className='errorp'>{t('requiredfield')}</p>}
                        </div>
                    </div>
                    <button
                        id={
                            disableButton &&
                            'disable'
                        }

                        disabled={loading} onClick={validation} >
                        {!loading
                            ? t('BuyTicket')
                            : <div style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <PuffLoader size={28} color="#FEE827" />
                            </div>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}