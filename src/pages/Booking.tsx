
import React, { useState } from 'react';
import { toast } from 'sonner';
import { BookingModal } from '@/components/booking/BookingModal';
import { HotelCard } from '@/components/booking/HotelCard';
import { UserBookings } from '@/components/booking/UserBookings';
import { Hotel } from '@/types/booking';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';

// Sample hotel data
const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Sunset Beach Resort',
    location: 'Maldives',
    price: 299,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    amenities: ['Beachfront', 'Pool', 'Spa', 'Restaurant'],
    rating: 4.8
  },
  {
    id: '2',
    name: 'Mountain View Lodge',
    location: 'Switzerland',
    price: 199,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    amenities: ['Mountain View', 'Hiking', 'Breakfast', 'Fitness Center'],
    rating: 4.5
  },
  {
    id: '3',
    name: 'City Lights Hotel',
    location: 'New York',
    price: 249,
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    amenities: ['City View', 'Bar', 'Room Service', 'Gym'],
    rating: 4.2
  },
  {
    id: '4',
    name: 'Tropical Paradise Resort',
    location: 'Bali',
    price: 179,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
    amenities: ['Pool', 'Garden', 'Spa', 'Restaurant'],
    rating: 4.6
  }
];

const Booking = () => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBookings, setUserBookings] = useState<Array<{
    hotelId: string;
    hotelName: string;
    checkIn: Date;
    days: number;
    people: number;
    totalPrice: number;
  }>>([]);

  const handleHotelClick = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const handleBooking = (booking: {
    checkIn: Date;
    days: number;
    people: number;
  }) => {
    if (selectedHotel) {
      const newBooking = {
        hotelId: selectedHotel.id,
        hotelName: selectedHotel.name,
        checkIn: booking.checkIn,
        days: booking.days,
        people: booking.people,
        totalPrice: selectedHotel.price * booking.days
      };

      setUserBookings([...userBookings, newBooking]);
      setIsModalOpen(false);
      toast.success('Booking confirmed successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-16 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hotel Listings */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Hotels</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HOTELS.map(hotel => (
                  <HotelCard 
                    key={hotel.id}
                    hotel={hotel}
                    onClick={() => handleHotelClick(hotel)}
                  />
                ))}
              </div>
            </div>
            
            {/* User Bookings */}
            <div className="lg:col-span-1">
              <UserBookings bookings={userBookings} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {selectedHotel && (
        <BookingModal
          isOpen={isModalOpen}
          hotel={selectedHotel}
          onClose={() => setIsModalOpen(false)}
          onBook={handleBooking}
        />
      )}
    </div>
  );
};

export default Booking;
