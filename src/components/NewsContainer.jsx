import React from "react";
import { Link } from "react-router-dom";

export function toIndianTime(Time) {
    // return new Date(Time).toLocaleDateString("en-US", {
    //     month: "short",
    //     day: "numeric",
    //     year: "numeric",
    //     timeZone: "Asia/Kolkata"
    // });
    // Convert seconds to milliseconds
    const date = new Date(Time * 1000);

    // Array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = months[date.getUTCMonth()]; // get month name
    const day = date.getUTCDate();            // get day
    const year = date.getUTCFullYear();       // get year

    return `${month} ${day}, ${year}`;
}

const NewsContainer = ({ author, title, description, imageUrl, url, publishedAt, source, loading }) => {
    return (
        <div className="flex justify-between">
            {loading ? (
                <div type="button" class="bg-indigo-500 ..." disabled>
                    <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
                    Processing…
                </div>
            ) : (
                <div className="w-full overflow-hidden shadow-lg border-2 border-gray-800 rounded-lg">
                    <img className="h-[220px] w-full" src={imageUrl} alt="Image Not Available" />
                    <span className="flex flex-row gap-1 mt-2 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-0">
                        <p>Published At :</p>
                        <span>{" "}{toIndianTime(publishedAt)}</span>
                    </span>
                    <div className="px-2 py-0">
                        <Link to={url} target="_black" rel="noopener noreferrer">
                            <div className="font-bold text-xl mb-2">{title}</div>
                        </Link>
                        <p className="text-gray-700 text-base">{description.slice(0, 330) || "Description is not available"}{" ..."}</p>
                    </div>
                    <div className="p-2">
                        <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Author : "}{author || "Author Not Available"}</span>
                        <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Source : "}{source || "Source Not Available"}</span>
                    </div>
                </div>
            )
            }
        </div >
    );
};

export default NewsContainer;
