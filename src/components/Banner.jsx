import { useState, useEffect } from "react";
import axios from "axios";
import banner2 from "../assets/banner2.jpg";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";
import { numberWithCommas } from "./CoinTable";


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const Banner = () => {

    const [tranding, setTranding] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrandingCoins = async () => {
        const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");

        setTranding(response.data.coins);

    }

    useEffect(() => {
        fetchTrandingCoins();
    }, [currency])


    return (
        <div
            style={{
                backgroundImage: `url(${banner2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "1.5rem",
                marginTop: 80
            }}
        >
            <div className="flex flex-col gap-8 py-8 justify-around">
                <div className="text-center">
                    <h1 className="text-white text-5xl font-extrabold mb-4 drop-shadow-lg">Crypto Tracker</h1>
                    <p className="text-slate-300 text-lg font-light drop-shadow-md" style={{ paddingTop: "1rem" }}>Get all the Info regarding your favorite Crypto Currency</p>
                </div>
                <div className="h-[50%] max-w-[75%] mx-auto max-md:max-w-[90%]">
                    <Swiper
                        spaceBetween={20}
                        initialSlide={0}
                        slidesPerView={6}
                        loop={true}
                        autoplay={{ delay: 1000, disableOnInteraction: false, waitForTransition: true }}
                        speed={1500}
                        modules={[Autoplay]}
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                            },
                            512: {
                                slidesPerView: 4,
                            },
                            768: {
                                slidesPerView: 4,
                            }
                        }}
                    >
                        {tranding.map((coin, index) => (
                            <SwiperSlide key={index}>
                                <Link
                                    className="flex flex-col items-center cursor-pointer color-white uppercase"
                                    to={`/coins/${coin.item.id}`}
                                >
                                    <img
                                        src={coin?.item.large}
                                        alt={coin?.item.name}
                                        style={{ marginBottom: 5, height: 80, width: 80 }}
                                    />
                                    <span className="uppercase font-normal text-sm">
                                        {coin.item.symbol}
                                        &nbsp;
                                        <span className={coin?.item.data.price_change_percentage_24h[currency.toLowerCase()] > 0 ? "text-green-500" : "text-red-500"}>
                                            {coin?.item.data.price_change_percentage_24h[currency.toLowerCase()].toFixed(2)}%
                                        </span>
                                    </span>
                                    <span className="text-lg font-semibold">
                                        {"$"} {numberWithCommas(coin?.item.data.price.toFixed(2))}
                                    </span>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>


                </div>
            </div>
        </div >
    );
};

export default Banner;
