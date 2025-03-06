import React, { useState } from "react";

const SearchBox = ({ onHotelSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setRecommendations([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/v1/hotel-bookings?search=${encodeURIComponent(term)}`);
      const data = await response.json();
      setRecommendations(data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleSelectHotel = (hotel) => {
    setSearchTerm(hotel["Hotel Name"] || "N/A");
    setRecommendations([]);
    if (onHotelSelect) onHotelSelect(hotel);
  };

  return (
    <div className="search-container">
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for hotels..." />
      {recommendations.length > 0 && (
        <div className="recommendations">
          {recommendations.map((hotel, index) => (
            <div key={index} className="recommendation-item" onClick={() => handleSelectHotel(hotel)}>
              {hotel["Hotel Name"] || "N/A"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
