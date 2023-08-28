import React, {useEffect, useState} from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';

export default function Home() {

    const dataArray = [
        "http://localhost:4000/api/v1/adoptsections",
        "http://localhost:4000/api/v1/abouts",
        "http://localhost:4000/api/v1/animals",
        "http://localhost:4000/api/v1/volunteers"
    ]

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [dataBanners, setDataBanners] = useState([]);
    const [dataAbouts, setDataAbouts] = useState([]);
    const [dataAnimals, setDataAnimals] = useState([]);
    const [datavolunteers, setDatavolunteers] = useState([]);
    const [dataAssets, setDataAssets] = useState([]);


    useEffect(() => {
        Promise.all(
            dataArray.map((url) => {
                return fetch(url)
            })
        )
        .then((responses) => {
            // console.log(responses)
            return Promise.all(
                responses.map((response) => {
                    return response.json()
                })
            )
        })
        .then((datas) => {
            console.log(datas)
            // setAllData(datas)
            setDataBanners(datas[0])
            setDataAbouts(datas[1])
            setDataAnimals(datas[2])
            setDatavolunteers(datas[3])
            setDataAssets(datas[4])
            setLoading(false)
        })
    }, []);


    const dateConverter = (createdDate) => {
        const createdAtDate = new Date(createdDate)
        const todayDate = new Date()
        todayDate.setHours(0,0,0,0)

        // Diff in mili secs
        const diff = todayDate.getTime() - createdAtDate.getTime()
        const diffInDays = diff / (1000 * 3600 * 24)

        return Math.round(diffInDays)
    }

    const sanitizeContent = (text) => {
        const replacedText = text.replace(/\n/g, '<br>')
        return <p dangerouslySetInnerHTML={{__html: replacedText}} />
    }

    const newsletterHandler = (e) => {
        e.preventDefault()

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (emailPattern.test(e.target.email.value)) {
            const tempBody = {
            "name": e.target.name.value,
            "email": e.target.email.value
        }

        fetch("http://localhost:4000/api/v1/subscribers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(tempBody)
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.error(err));

            alert("Thank you for your subscription")

            e.target.name.value = ""
            e.target.email.value = ""
        }
        else {
            alert("Email is not correct, please enter a valid email \nExample: example@domain.com")
            
        }

        
    }

    // console.log(screen.width)

    if (error) {
        return <h1>Something wrong happend</h1>
    }

    if (loading) {
        return <h1>Loading..</h1>
    }

    if (!error && !loading) {
        return (
            <main className='home'>
                {/* TOP IMAGE */}
                <section className="home__banner" style={{backgroundImage: `url(${dataBanners[0].asset.url}`}}>
                    <div className="banner__wrapper">
                        <h1>{dataBanners[0].title}</h1>
                        <p>{dataBanners[0].content}</p>
                    </div>
                </section>

    
                {/* ABOUT */}
                <article className="home__about">
                    {dataAbouts.map((section) => {
                        return (
                            <section key={section.id} className="about__card">
                                <h2>{section.title}</h2>
                                {sanitizeContent(section.content)}
                            </section>
                        )
                    })}
                </article>

    
                {/* FRIVILLIG */}
                <article className="home__frivillig">
                    <h2>Bliv Frivillig</h2>
                    
                    <section className="frivillig__wrapper">
                        {datavolunteers.map((section) => {
                            return (
                                <div key={section.id} className="frivillig__card">
                                    <div className="cardHeader">
                                        <h3>{section.title}</h3>
                                    </div>
                                    <div className="cardBody">
                                        <img src={section.asset.url} alt="" />
                                        <p>{section.content}</p>
                                    </div>
                                    <div className="cardFooter">
                                        <p>{section?.extra}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                </article>


                {/* MID BANNER */}
                <section className="home__banner" style={{backgroundImage: `url(${dataBanners[1].asset.url})`}}>
                    <div className="banner__wrapper">
                        <h1>{dataBanners[1].title}</h1>
                        <p>{dataBanners[1].content}</p>
                    </div>
                </section>

                {/* NYHEDSBREV */}
                <section className="home__nyhedsbrev">
                    <div className="nyhedsbrev__wrapper">
                        <div className="wrapper__top">
                            <h2>Tilmeld vores nyhedsbrev</h2>
                            <p>Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.</p>
                        </div>

                        <form onSubmit={newsletterHandler}>
                            <div className="form__inputs">
                                <input type="text" name="email" id="email" placeholder='Email' />
                                <input type="text" name="name" id="name" placeholder='Navn' />
                            </div>
                            <button type="submit">Tilmeld</button>
                        </form>
                    
                    </div>
                </section>

                {/* BUTTOM BANNER */}
                <section className="home__banner" style={{backgroundImage: `url(${dataBanners[2].asset.url})`}}>
                    <div className="banner__wrapper">
                        <h1>{dataBanners[2].title}</h1>
                        <p>{dataBanners[2].content}</p>
                    </div>
                </section>

                {/* LISTE AF DYR */}
                <section className="home__dyr">
                    <h2>Dyr hos os</h2>
                    <p>{dataAnimals.length} dyr</p>

                    <div className="dyr__wrapper">
                        {dataAnimals.map((card) => {
                            return (
                                <Link to={`/Details/${card.id}`} key={card.id} className="dyrCard">
                                    <div className="dyrCard__img" style={{backgroundImage: `url(${card.asset.url})`}}>
                                        
                                    </div>
                                    <div className="dyrCard__text">
                                        <h3>{card.name}</h3>
                                        <p className='text__description'>{card.description}</p>
                                        <p className='text__dage'>Været på internat i {dateConverter(card.createdAt)} dage.</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                {/* FOOTER */}
                <footer>
                    <div className="info">
                        <div className="info__left">
                            <h3>Kontakt</h3>
                            <p>Tornebuskvej 22, 1.</p>
                            <p>1131 København K</p>
                            <p>CVR: 22446187</p>
                            <p>Husk at du kan få fradrag for donationer på op til 16.600 kr.</p>
                        </div>
                        <div className="info__right">
                            <h3>Partnere</h3>
                            <Link to="/">Anima</Link>
                            <Link to="/">World Animal Protection</Link>
                            <Link to="/">Fødevarestyrelsen</Link>
                            <Link to="/">Faktalink</Link>
                        </div>
                    </div>
                    <div className="copyright">
                        <p>&copy; 2020 - Forening for Dyrevelfærd</p>
                    </div>
                </footer>

            </main>
        )
    }


}