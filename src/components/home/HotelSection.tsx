import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface Hotel {
  id: string;
  name: string;
  image: string;
  location: string;
  price: string;
  rating?: string;
}

const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Marina Beach Colombo',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500',
    location: 'Colombo',
    price: 'Starting from $70/night'
  },
  {
    id: '2',
    name: 'Grandhall Resort',
    image: 'https://images.unsplash.com/photo-1561501878-aabd62634533?q=80&w=500',
    location: 'Colombo',
    price: 'Starting from $120/night'
  },
  {
    id: '3',
    name: 'Airport',
    image: 'https://images.unsplash.com/photo-1523592121529-f6dde35f079e?q=80&w=500',
    location: 'Katunayaka',
    price: 'Starting from $90/night'
  },
  {
    id: '4',
    name: 'Bay Inn',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500',
    location: 'Galle',
    price: 'Starting from $100/night'
  }
];

const HotelSection = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleView = (hotel: Hotel) => {
    toast.success(`Viewing details for ${hotel.name}`);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 animate-fade-in">
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Location</div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travely-blue"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Check-in date</div>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travely-blue"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Check-out date</div>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-travely-blue"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotels guests love</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {HOTELS.map((hotel, index) => (
            <div 
              key={hotel.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="mr-1" size={14} />
                  <span>{hotel.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{hotel.price}</p>
                <button
                  onClick={() => handleView(hotel)}
                  className="w-full px-4 py-2 bg-travely-blue text-white rounded-md hover:bg-travely-dark-blue transition-colors duration-300 text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
