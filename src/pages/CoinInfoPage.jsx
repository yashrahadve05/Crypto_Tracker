import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";
import axios from "axios";
import { LinearProgress } from "@mui/material";

export function numberWithCommas(x) {
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // US Standard
    return x.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") // Indian Standard
}

const CoinInfoPage = () => {

    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(false);

    const { currency, symbol } = CryptoState();

    const fetchCoinInfo = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
            setCoin(data);
        } catch (error) {
            console.error("Error fetching coin data:", error);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchCoinInfo();
    }, [currency]);

    console.log(coin);

    if (loading && !coin) return (
        <div>
            <LinearProgress />
            <div className="flex bg-[#121212] p-2 justify-center items-center h-[300px]">
                <div className="text-center">
                    <div
                        className="w-24 h-24 border-4 border-t-[#00e600] border-gray-700 rounded-full animate-spin mx-auto"
                    ></div>
                    <div
                        className="text-[#00e600] pt-3 font-semibold text-4xl opacity-90 animate-fadeIn"
                    >
                        Almost There...
                    </div>
                    <div className="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
                        <p>We're getting everything ready for you...</p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="w-full flex justify-center mt-7">
            <div className="flex flex-row justify-center items-center w-[98%]">
                <div className="w-3/12 border-r-2 border-gray-500 pt-3 pb-3">
                    <div className="flex flex-col items-right gap-5">
                        <div className="flex flex-row justify-right items-center">
                            <img className="p-3" src={coin?.image.large} width={150} height={150} alt="coin.name" />
                            <div className="flex flex-col gap-1.5">
                                <h2 className="text-3xl font-extrabold tracking-wide">{coin?.name}</h2>
                                <h5 className="uppercase text-slate-300 font-semibold">{coin?.symbol}</h5>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-[montserrat] text-4xl font-bold tracking-wider pt-3"> {symbol} {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()]?.toString() || "N/A")}</h2>
                        </div>
                        <div className="flex flex-row gap-3 border-2 border-slate-600 rounded-md p-3 text-xl font-medium bg-slate-800 w-[95%]">
                            <h2>Market Cap Rank : </h2>
                            <span className="font-bold text-2xl">{coin?.market_cap_rank}</span>
                        </div>
                        <div className="w-[95%] flex flex-row gap-2">
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">Market Cap</span>
                                <span>
                                    {symbol} {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -7) || "N/A")} Cr
                                </span>

                            </div>
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">Total Vol</span>
                                <span>{symbol} {numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()]?.toString().slice(0, -7)  || "N/A")} Cr</span>
                            </div>
                        </div>
                        <div className="w-[95%] flex flex-row gap-2">
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">24H High</span>
                                <span>
                                    {symbol} {numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()]?.toString() || "N/A")}
                                </span>

                            </div>
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">24H Low</span>
                                <span>{symbol} {numberWithCommas(coin?.market_data.low_24h[currency.toLowerCase()]?.toString()  || "N/A")}</span>
                            </div>
                        </div>
                        <div className="w-[95%] flex flex-row gap-2">
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">All Time High</span>
                                <span>
                                    {symbol} {numberWithCommas(coin?.market_data.ath[currency.toLowerCase()]?.toString() || "N/A")}
                                </span>

                            </div>
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">All Time Low</span>
                                <span>
                                    {symbol} {numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]?.toString() || "N/A")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-7/10">
                    {/* Coin Chart */}
                </div>
            </div>
        </div>
    );
};

export default CoinInfoPage;

