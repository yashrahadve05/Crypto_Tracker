import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import parse from 'html-react-parser';
import { CryptoState } from "../context/CryptoContextProvider";
import CoinChart from "../components/CoinChart";

export function numberWithCommas(x) {
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // US Standard
    return Math.floor(x).toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") // Indian Standard
}

export function toIndianTime(Time) {
    return new Date(Time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Kolkata"
    });
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

    if (loading && !coin) return (
        <div className="h-full bg-[#121212]">
            <LinearProgress />
            <div className="flex p-2 justify-center items-center !h-[100%]">
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

    const Change_24H = coin?.market_data.price_change_percentage_24h > 0;
    const Change_30D = coin?.market_data.price_change_percentage_30d > 0;
    const Change_ATH = coin?.market_data.ath_change_percentage[currency.toLowerCase()] > 0;
    const Change_ATL = coin?.market_data.atl_change_percentage[currency.toLowerCase()] > 0;
    console.log("Change All Time High", Change_ATL);
    console.log("The ATL ", coin?.market_data.ath_change_percentage[currency]);




    return (
        <div className="w-full flex flex-col justify-center mt-7">
            <div className="flex lg:flex-row lg:justify-center items-center w-[98%] md:flex-col md:justify-center max-sm:flex-col max-sm:justify-center">
                <div className="xl:w-3/12 xl:border-r-2 border-gray-500 pt-0 pb-4 md:border-r-0 max-sm:border-r-0 md:w-[90%] max-sm:w-[90%]">
                    <div className="flex flex-col items-right gap-5 md:w-full">
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
                                <span>{symbol} {numberWithCommas(coin?.market_data.total_volume[currency.toLowerCase()]?.toString().slice(0, -7) || "N/A")} Cr</span>
                            </div>
                        </div>
                        <div className="w-[95%] flex flex-row gap-2">
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">24H High</span>
                                <span className="text-[#00FF00]">
                                    {symbol} {numberWithCommas(coin?.market_data.high_24h[currency.toLowerCase()]?.toString() || "N/A")}
                                </span>

                            </div>
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">24H Low</span>
                                <span className="text-[#FF0000]">
                                    {symbol} {numberWithCommas(coin?.market_data.low_24h[currency.toLowerCase()]?.toString() || "N/A")}
                                </span>
                            </div>
                        </div>
                        <div className="w-[95%] flex flex-row gap-2">
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">24H Change</span>
                                <span className={`tracking-wide ${Change_24H ? "text-[#00FF00]" : "text-[#FF0000]"}`}> {Change_24H && "+"}{coin?.market_data.price_change_percentage_24h.toFixed(4)} %</span>

                            </div>
                            <div className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                                <span className="text-center m-auto font-semibold">30D Change</span>
                                <span className={`tracking-wide ${Change_30D ? "text-[#00FF00]" : "text-[#FF0000]"}`}>{coin?.market_data.price_change_percentage_30d.toFixed(4)} %</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-7/10 flex justify-center items-center max-sm:w-full max-md:w-full">
                    <CoinChart coin={coin} />
                </div>
            </div>
            <div className="!w-[95%] m-auto mt-8 mb-8">
                <div className=" flex flex-row gap-2 mb-2 max-md:flex-wrap">

                    {/* 1 Year High */}
                    {/* <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">1Y High</span>
                            <span className="text-sm">{toIndianTime(coin?.market_data.ath_date[currency.toLowerCase()])}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {symbol} {numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]?.toString() || "N/A")}
                            </span>
                            <span className={`text-sm tracking-wide ${Change_30D ? "text-[#00FF00]" : "text-[#FF0000]"}`}>{coin?.market_data.price_change_percentage_30d.toFixed(2)} %</span>
                        </div>
                    </div> */}

                    {/* 1 Year Low */}
                    {/* <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">All Time Low</span>
                            <span className="text-sm">{toIndianTime(coin?.market_data.ath_date[currency.toLowerCase()])}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {symbol} {numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]?.toString() || "N/A")}
                            </span>
                            <span className={`text-sm tracking-wide ${Change_30D ? "text-[#00FF00]" : "text-[#FF0000]"}`}>{coin?.market_data.price_change_percentage_30d.toFixed(2)} %</span>
                        </div>
                    </div> */}

                    {/* Fully Diluted Valuation */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">Fully Diluted <br /> Valuation</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {symbol} {numberWithCommas(coin?.market_data.fully_diluted_valuation[currency.toLowerCase()]?.toString().slice(0, -7) || "N/A")} Cr.
                            </span>
                        </div>
                    </div>

                    {/* All Time High */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">All Time High</span>
                            <span className="text-sm">{toIndianTime(coin?.market_data.ath_date[currency.toLowerCase()])}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {symbol} {numberWithCommas(coin?.market_data.ath[currency.toLowerCase()]?.toString() || "N/A")}
                            </span>
                            <span className={`text-sm tracking-wide ${Change_ATH ? "text-[#00FF00]" : "text-[#FF0000]"}`}>{Change_ATH && "+"} {coin?.market_data?.ath_change_percentage[currency.toLowerCase()]?.toFixed(2)}%</span>
                        </div>
                    </div>

                    {/* All Time Low */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">All Time Low</span>
                            <span className="text-sm">{toIndianTime(coin?.market_data.atl_date[currency.toLowerCase()])}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {symbol} {numberWithCommas(coin?.market_data.atl[currency.toLowerCase()]?.toString() || "N/A")}
                            </span>
                            <span className={`text-sm tracking-wide ${Change_ATL ? "text-[#00FF00]" : "text-[#FF0000]"}`}>
                                {Change_ATL && "+"}{coin?.market_data.atl_change_percentage[currency.toLowerCase()]?.toFixed(2)}%
                            </span>
                        </div>
                    </div>


                </div>
                <div className=" flex flex-row gap-2 mb-3 max-md:flex-wrap lg:w-[100%]">
                    {/* Circulating Supply */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">Circulating <br /> Supply</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {numberWithCommas(coin?.market_data.circulating_supply || "N/A")}
                            </span>
                        </div>
                    </div>

                    {/* Maximum Supply */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">Max. Supply</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {numberWithCommas(coin?.market_data.max_supply || "N/A")}
                            </span>
                        </div>
                    </div>

                    {/* Total Supply */}
                    <div className="flex flex-row items-center justify-between gap-1 border-2 border-slate-600 rounded-md p-2 font-medium bg-slate-800 w-[95%] text-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto font-semibold">Total Supply</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg text-center m-auto ">
                                {numberWithCommas(coin?.market_data.total_supply || "N/A")}
                            </span>
                        </div>
                    </div>
                </div>
                <span className="flex flex-col gap-1 border-2 border-slate-600 rounded-md p-4 font-medium bg-slate-800 text-left">
                    <div>
                        <span className="inline-block font-semibold w-fit pr-1.5">About : </span>
                        <span>{parse(coin?.description?.en || "No description available.")}</span>
                    </div>
                    <div>
                        <span className="flex flex-row flex-wrap gap-1 items-center">
                        <span className="inline-block font-semibold w-fit pr-1.5">Categories : </span>
                                {coin?.categories?.map((cat, index) => (
                                    <span className="bg-slate-700 p-1 border-2 border-slate-600 rounded-sm" key={index}>{cat}</span>
                                )) || "No Catogery Available"}
                        </span>
                    </div>
                </span>
            </div>
        </div>
    );
};

export default CoinInfoPage;

