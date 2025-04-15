
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, Clock, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Hotel } from '@/types/booking';

interface BookingModalProps {
  isOpen: boolean;
  hotel: Hotel;
  onClose: () => void;
  onBook: (booking: { checkIn: Date; days: number; people: number }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  hotel,
  onClose,
  onBook,
}) => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [days, setDays] = useState(1);
  const [people, setPeople] = useState(2);

  const totalPrice = days * hotel.price;

  const handleBookNow = () => {
    if (date) {
      onBook({
        checkIn: date,
        days,
        people,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Book {hotel.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="col-span-4">
              <div className="relative h-40 w-full overflow-hidden rounded-md mb-4">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-right text-gray-500 text-sm">Location:</div>
            <div className="col-span-3 font-medium">{hotel.location}</div>
            
            <div className="text-right text-gray-500 text-sm">Price per night:</div>
            <div className="col-span-3 font-medium text-travely-blue">${hotel.price}</div>

            <div className="text-right text-gray-500 text-sm">Check-in date:</div>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < today}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="text-right text-gray-500 text-sm">Number of days:</div>
            <div className="col-span-3">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDays(Math.max(1, days - 1))}
                  disabled={days <= 1}
                >
                  -
                </Button>
                <div className="w-16 text-center font-medium">{days}</div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDays(days + 1)}
                >
                  +
                </Button>
                <Clock className="ml-2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="text-right text-gray-500 text-sm">Number of people:</div>
            <div className="col-span-3">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  disabled={people <= 1}
                >
                  -
                </Button>
                <div className="w-16 text-center font-medium">{people}</div>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPeople(people + 1)}
                >
                  +
                </Button>
                <Users className="ml-2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            <div className="col-span-4 mt-2">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                <span className="font-semibold">Total Price:</span>
                <span className="font-bold text-xl text-travely-blue">${totalPrice}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-travely-blue hover:bg-travely-dark-blue" onClick={handleBookNow}>
            Book Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
