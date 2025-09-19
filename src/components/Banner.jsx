import { useState } from "react";
import banner2 from "../assets/banner2.jpg";
import AliceCarousel from "react-alice-carousel";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";


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

    const items = tranding.map((coin, index) => {
        return (
            <Link
                className="flex flex-col items-center cursor-pointer gap-2 color-white uppercase"
                to={`/coin/${coin.item.id}`}
                key={index}
            >
                <img
                    src={coin?.item.thumb}
                    alt={coin?.item.name}
                    style={{ marginBottom: 10, height: 80, width: 80 }}
                />
                <span className="uppercase font-bold text-sm">
                    {coin.item.symbol}
                    &nbsp;
                    <span className={coin.item.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
                        {coin.item.price_change_percentage_24h}%
                    </span>
                </span>
                <span className="text-sm font-light">
                    {symbol} {coin.item.price_btc.toFixed(6)}
                </span>
            </Link>
        );
    })


    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };

    return (
        <div
            style={{
                backgroundImage: `url(${banner2})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "1.5rem",
            }}
        >
            <div className="flex flex-col gap-8 py-8 justify-around">
                <div className="text-center">
                    <h1 className="text-white text-5xl font-extrabold mb-4 drop-shadow-lg">Crypto Tracker</h1>
                    <p className="text-slate-300 text-lg font-light drop-shadow-md" style={{ paddingTop: "1rem" }}>Get all the Info regarding your favorite Crypto Currency</p>
                </div>
                <div className="h-[50%]">
                    {/* <AliceCarousel
                        autoPlay
                        infinite
                        autoPlayInterval={1000}
                        animationDuration={1500}
                        disableDotsControls
                        disableButtonsControls
                        responsive={responsive}
                        mouseTracking
                        items={items}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default Banner;
