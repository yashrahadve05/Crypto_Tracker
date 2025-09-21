import { useEffect, useState } from "react";
import axios from "axios";
import { createTheme, LinearProgress, Pagination, ThemeProvider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinTable = (props) => {

    let navigate = useNavigate();

    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();


    const fetchCoinData = async () => {
        setLoading(true);

        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)

        setCoin(res.data);

        setLoading(false)
    }

    useEffect(() => {
        fetchCoinData();
    }, [currency]);

    const handleSearch = () => {
        return coin.filter(
            (coin) => coin.name.toLowerCase().includes(props.search) || coin.symbol.toLowerCase().includes(props.search)
        );
    }

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",
            }
        }
    })

    if (loading) return (
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
        <ThemeProvider theme={darkTheme}>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-0">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md overflow-hidden">
                <thead className="text-md text-gray-900 uppercase bg-blue-800">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Coin
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            24H Change
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Market Cap
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {handleSearch().slice((page-1)*10, (page-1)*10 + 10).map((coin) => {
                        const profit = coin.price_change_percentage_24h > 0;

                        return (
                            <tr key={coin.id} onClick={() => navigate(`/coins/${coin.id}`)} className="cursor-pointer border-b-2 border-gray-500 bg-zinc-700 hover:bg-zinc-600">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row gap-1.5">
                                    <img src={coin.image} className="w-12" alt={coin.name} />
                                    <span>
                                        <div className="uppercase text-base font-bold">{coin.symbol}</div>
                                        <div className="text-sm">{coin.name}</div>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-lg text-white font-medium">
                                    {symbol} {numberWithCommas(coin.current_price)}
                                </td>
                                <td className={`font-montserrat px-6 py-4 text-lg font-semibold ${profit ? "text-[#00FF00]" : "text-[#FF0000]"}`}>
                                    {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)} %
                                </td>
                                <td className="px-6 py-4 text-lg text-white font-medium">
                                    {numberWithCommas(coin.market_cap.toString().slice(0, -6))} M
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Pagination of the Table */}
            <Pagination
                className="p-5 w-full flex justify-center bg-zinc-700"
                count={(handleSearch()?.length / 10).toFixed(0)}
                onChange={(_,value) => {
                    setPage(value);
                    window.scroll(0, 350)
                }}
                sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#FACC15", // change page number color
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#FBBF24", // optional: change selected page background
                                color: "#000000", // optional: selected page text color
                            },
                        }}
            />
        </div>
        </ThemeProvider>
    );
}


export default CoinTable;
