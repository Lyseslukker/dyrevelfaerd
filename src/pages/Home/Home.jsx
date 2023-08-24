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



    if (error) {
        return <h1>Something wrong happend</h1>
    }

    if (loading) {
        return <h1>Loading..</h1>
    }

    if (!error && !loading) {
        return (
            <article className='home'>
                {/* TOP IMAGE */}
                <section className="home__topBanner" style={{backgroundImage: `url(${dataBanners[0].asset.url}`}}>
                    <div className="topBanner__wrapper">
                        <h1>{dataBanners[0].title}</h1>
                        <p>{dataBanners[0].content}</p>
                    </div>
                </section>
    
                {/* ABOUT */}
                <section className="home__about">
                    {dataAbouts.map((section) => {
                        return (
                            <div key={section.id} className="about__card">
                                <h2>{section.title}</h2>
                                <p>{section.content}</p>
                            </div>
                        )
                    })}
                </section>
    
                {/* FRIVILLIG */}
                <section className="home__frivillig">
                    <h1>Bliv Frivillig</h1>
    
                    {datavolunteers.map((section) => {
                        return (
                            <div key={section.id} className="frivillig__card">
                                <div className="cardHeader">
                                    <h2>{section.title}</h2>
                                </div>
                                <div className="cardBody">
                                    <p>{section.content}</p>
                                </div>
                                <div className="cardFooter">
                                    <p>{section?.extra}</p>
                                </div>
                            </div>
                        )
                    })}
                </section>

                <section className="home__midBanner" style={{backgroundImage: `url(${dataBanners[1].asset.url})`}}>
                    <h1>{dataBanners[1].title}</h1>
                    <p>{dataBanners[1].content}</p>
                </section>

                <section className="home__nyhedsbrev">
                    <h2>Tilmeld vores nyhedsbrev</h2>
                    <p>Få inspiration og nyheder om dyrevelfærd og vores arbejde, direkte i din indbakke.</p>
                    <form>
                        <input type="text" name="email" id="email" />
                        <input type="text" name="name" id="name" />
                        <button type="submit">Tilmeld</button>
                    </form>
                </section>

                <section className="home__adopter" style={{backgroundImage: `url(${dataBanners[2].asset.url})`}}>
                    <h1>{dataBanners[2].title}</h1>
                    <p>{dataBanners[2].content}</p>
                </section>

                <section className="home__dyr">
                    <h2>Dyr hos os</h2>
                    <p>{dataAnimals.length} dyr</p>

                    <div className="dyr__wrapper">
                        {dataAnimals.map((card) => {
                            return (
                                <div key={card.id} className="dyrCard">
                                    <div className="dyrCard__img">
                                        <img src={card.asset.url} alt={card.name} />
                                    </div>
                                    <div className="dyrCard__text">
                                        <h3>{card.name}</h3>
                                        <p>{card.description}</p>
                                        <p>Været på internat i {dateConverter(card.createdAt)} dage.</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

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
            </article>
        )
    }


}