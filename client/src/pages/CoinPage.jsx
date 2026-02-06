import { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable.jsx";
import NewsContainer from "../components/NewsContainer.jsx"
import axios from "axios";
import { Pagination } from "@mui/material";

const CoinPage = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState(null);
    const [page, setPage] = useState(1);

    const fetchData = async () => {

        const apiKey = import.meta.env.VITE_CRYPTO_NEWS_API;

        try {
            setPageLoading(true);
            const res = await axios.get(`https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=100&source_ids=coindesk,cointelegraph&api_key=${apiKey}`);

            const data = res?.data?.Data;
            const sortedArticles = data.sort((a, b) => b.PUBLISHED_ON - a.PUBLISHED_ON);
            setNewsData(sortedArticles);

        } catch (error) {
            console.error("Error fetching news data:", error);
            setNewsData(null);
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div >
            <div className="flex flex-col justify-center justify-self-center items-center w-[90%] mb-4 shadow-lg">
                <h2 className="text-3xl p-8 font-bold text-center">Crypto Currency by Price and Market Cap</h2>
                <input className="border-2 border-gray-300 rounded-md w-full" style={{ padding: "10px", marginBottom: "1rem" }} type="search" name="search" id="search" placeholder="Search a Crypto Currency ( eg. BTC )" onChange={(e) => setSearch(e.target.value)} />
                <div className="w-full">
                    <CoinTable search={search} />
                </div>
                <div className="w-full">
                    <h2 className="bg-gray-800 my-3 text-3xl py-6 font-bold self-start text-left p-2 rounded-lg">Get the latest News and Trends about Crypto Currency</h2>
                    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {newsData && newsData.slice((page - 1) * 12, (page - 1) * 12 + 12).map((articles, index) => (
                            <NewsContainer
                                key={index}
                                loading={pageLoading}
                                author={articles.AUTHORS}
                                title={articles.TITLE}
                                description={articles.BODY}
                                imageUrl={articles.IMAGE_URL}
                                url={articles.URL}
                                publishedAt={articles.CREATED_ON}
                                source={articles.SOURCE_DATA.NAME}
                            />
                        ))}
                    </div>
                    {/* Pagination of the Table */}
                    <Pagination
                        className="p-5 mt-4 rounded-md bg-gray-900 w-full flex justify-center items-center"
                        count={(newsData && Math.ceil(newsData.length / 12)) || 1}
                        onChange={(_, value) => {
                            setPage(value);
                            window.scroll(0, 1350);
                        }}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#FACC15",
                            },
                            "& .Mui-selected": {
                                backgroundColor: "#ffffff29",
                                color: "#FACC15",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export default CoinPage;
