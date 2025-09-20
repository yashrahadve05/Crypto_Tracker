import React from "react";
import { Link } from "react-router-dom";

export function toIndianTime(Time) {
    return new Date(Time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Kolkata"
    });
}

const NewsContainer = ({ author, title, description, imageUrl, url, publishedAt, source}) => {
    return (
        <div className="max-w-sm overflow-hidden shadow-lg border-2 border-gray-800 rounded-lg">
            <Link to={url} target="_black" rel="noopener noreferrer">
                <img className="w-full" src={imageUrl} alt="Sunset in the mountains" />
                <span className="flex flex-row gap-1 mt-2 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <p>Published At :</p>
                    <span>{" "}{toIndianTime(publishedAt)}</span>
                </span>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{description || "Description is not available"}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Author : "}{author || "Author Not Available"}</span>
                    <span className="inline-block bg-gray-200 rounded-md px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{"Source : "}{source || "Source Not Available"}</span>
                </div>
            </Link>
        </div>
    );
};

export default NewsContainer;
