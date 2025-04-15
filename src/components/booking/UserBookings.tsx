
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Clock } from 'lucide-react';

interface Booking {
  hotelId: string;
  hotelName: string;
  checkIn: Date;
  days: number;
  people: number;
  totalPrice: number;
}

interface UserBookingsProps {
  bookings: Booking[];
}

export const UserBookings: React.FC<UserBookingsProps> = ({ bookings }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Your Bookings</span>
          <span className="text-sm font-normal text-gray-500">
            {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You don't have any bookings yet.</p>
            <p className="text-sm mt-1">Book a hotel to see it here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking, index) => (
              <Card key={index} className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold">{booking.hotelName}</h4>
                  
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        {format(booking.checkIn, 'MMM dd, yyyy')} - 
                        {format(new Date(booking.checkIn.getTime() + booking.days * 24 * 60 * 60 * 1000), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{booking.days} {booking.days === 1 ? 'day' : 'days'}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{booking.people} {booking.people === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total</span>
                    <span className="font-bold text-travely-blue">${booking.totalPrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
