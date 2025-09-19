import { useState } from "react";
import CoinTable from "../components/CoinTable";

const CoinPage = () => {

    const [search, setSearch] = useState("");

    return (
        <div >
            <div className="flex flex-col justify-center justify-self-center items-center w-[90%]"> 
                <h2 className="text-3xl p-8 font-bold text-center">Crypto Currency by Price and Market Cap</h2>
                <input className="border-2 border-gray-300 rounded-md w-full" style={{ padding: "10px", marginBottom: "1rem"}} type="search" name="search" id="search" placeholder="Search a Crypto Currency ( eg. BTC )" onChange={(e) => setSearch(e.target.value)} />
                <div className="w-full">
                    <CoinTable search = {search} />
                </div>
                <div className="w-full">
                    <h2 className="text-3xl py-8 font-bold self-start text-left">Get the latest News and Trends about Crypto Currency</h2>

                </div>
            </div>
        </div>
    )
};

export default CoinPage;
