import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../context/CryptoContextProvider";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register components once
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export function toIndianTime(Time) {
    return new Date(Time).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata" // ✅ ensures IST if you’re in India
    });
}

const CoinChart = ({ coin }) => {
    const [historicChart, setHistoricChart] = useState(null);
    const [days, setDays] = useState(1);
    const [flag, setFlag] = useState(false);



    const { currency } = CryptoState();
    const BoolChart = historicChart ? "HistoricChart Mil gaya" : "HistoricChart nahi mila";
    console.log(BoolChart);

    const chartDays = [
        {
            label: "24 Hours",
            value: 1,
        },
        {
            label: "30 Days",
            value: 30,
        },
        {
            label: "3 Months",
            value: 90,
        },
        {
            label: "1 Year",
            value: 365,
        },
    ];

    const id = coin?.id;



    const fetchHistoricChartData = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);

        setFlag(true);
        setHistoricChart(data.prices);

    }

    // const apiKey = import.meta.env.CryptoAPI;
    // const fetchHistoricChartData = async () => {
    //     try {
    //         const { data } = await axios.get(
    //             `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
    //             {
    //                 headers: {
    //                     "x-cg-demo-api-key": "CG-oY6K5QkQN4kWbB3wtUXiwpDb",
    //                 },
    //             }
    //         );
    //         return data;
    //     } catch (error) {
    //         console.error(`Error fetching chart for ${id}:`, error);
    //         return null;
    //     }
    // }

    useEffect(() => {
        fetchHistoricChartData();
    }, [days, currency]);

    if (!historicChart || flag === false) {
        return (
            <CircularProgress
                style={{ color: "gold" }}
                size={250}
                thickness={1}
            />
        );
    }


    return (
        <div className="w-[95%]">
            <Line
                className="h-full w-full"
                data={{
                    labels: historicChart?.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                            date.getHours() > 12
                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),

                    datasets: [
                        {
                            data: historicChart.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                        },
                    ],
                }}
                options={{
                    elements: {
                        point: {
                            radius: 1,
                        },
                    },
                }}
            />
            <div className="flex justify-between w-full mt-5">
                <span className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Last Update : {toIndianTime(coin?.market_data.last_updated)}</span>
                <span>{chartDays.map((day) => (
                    <button type="button" className={`cursor-pointer py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${(day.value === days) ? "bg-gray-900" : ""}`}
                        key={day.value}
                        onClick={() => {
                            setDays(day.value);
                        }}
                        selected={day.value === days}
                    >{day.label}</button>
                ))}</span>
            </div>
        </div>
    );
};

export default CoinChart;

