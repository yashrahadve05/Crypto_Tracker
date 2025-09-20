import { useEffect, useState } from "react";
import CoinTable from "../components/CoinTable.jsx";
import NewsContainer from "../components/NewsContainer.jsx"
import axios from "axios";

const CoinPage = () => {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [newsData, setNewsData] = useState(null);
    console.log("newsData", newsData);

    const fetchData = async () => {

        const apiKey = import.meta.env.VITE_CRYPTO_NEWS_API;

        try {
            setLoading(true);
            const res = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin%20OR%20ethereum%20OR%20cryptocurrency&from=2025-08-20&sortBy=relevancy&apiKey=${apiKey}`)

            setNewsData(res.data.articles);
        } catch (error) {
            console.error("Error fetching news data:", error);
            // setNewsData(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    return (
        <div >
            <div className="flex flex-col justify-center justify-self-center items-center w-[90%] mb-4 shadow-lg"> 
                <h2 className="text-3xl p-8 font-bold text-center">Crypto Currency by Price and Market Cap</h2>
                <input className="border-2 border-gray-300 rounded-md w-full" style={{ padding: "10px", marginBottom: "1rem"}} type="search" name="search" id="search" placeholder="Search a Crypto Currency ( eg. BTC )" onChange={(e) => setSearch(e.target.value)} />
                <div className="w-full">
                    <CoinTable search = {search} />
                </div>
                <div className="w-full">
                    <h2 className="text-3xl py-8 font-bold self-start text-left">Get the latest News and Trends about Crypto Currency</h2>
                    <div className="grid grid-cols-3 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                        {newsData && newsData.map((articles, index) => (
                            <NewsContainer
                                author={articles.author}
                                title={articles.title}
                                description={articles.description}
                                imageUrl={articles.urlToImage}
                                url={articles.url}
                                publishedAt={articles.publishedAt}
                                source={articles.source.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CoinPage;
