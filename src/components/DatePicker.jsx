import React, { useState } from 'react';
import { DatePickerProps, DateRange } from './types';

const DatePicker: React.FC<DatePickerProps> = ({ onSelect, onClose }) => {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ start: null, end: null });
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const generateCalendarDays = (year: number, month: number): (Date | null)[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];
    
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateSelect = (date: Date) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (date < selectedRange.start) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ start: selectedRange.start, end: date });
      }
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + direction)));
  };

  const isDateSelected = (date: Date | null): boolean => {
    if (!date || !selectedRange.start) return false;
    if (!selectedRange.end) return date.getTime() === selectedRange.start.getTime();
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isDateInRange = (date: Date | null): boolean => {
    if (!date || !selectedRange.start || !selectedRange.end) return false;
    return date > selectedRange.start && date < selectedRange.end;
  };

  // Rest of the component remains the same, just add proper types to the parameters
  // ...

  const monthDays = generateCalendarDays(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const nextMonthDays = generateCalendarDays(
    nextMonth.getFullYear(),
    nextMonth.getMonth()
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-emerald-800">Select dates</h2>
          <button onClick={onClose} className="text-emerald-600 hover:text-emerald-800">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {[monthDays, nextMonthDays].map((days, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="text-emerald-600 hover:text-emerald-800 p-1"
                  disabled={index === 1}
                >
                  ←
                </button>
                <span className="font-medium">
                  {new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + index
                  ).toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateMonth(1)}
                  className="text-emerald-600 hover:text-emerald-800 p-1"
                  disabled={index === 0}
                >
                  →
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-emerald-600">
                    {day}
                  </div>
                ))}
                {days.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => date && handleDateSelect(date)}
                    disabled={!date || date < new Date()}
                    className={`
                      h-10 w-10 rounded-full flex items-center justify-center text-sm
                      ${!date ? 'invisible' : ''}
                      ${date && date < new Date() ? 'text-gray-300 cursor-not-allowed' : ''}
                      ${isDateSelected(date) ? 'bg-emerald-600 text-white' : ''}
                      ${isDateInRange(date) ? 'bg-emerald-100' : ''}
                      ${
                        date && date >= new Date() && !isDateSelected(date) && !isDateInRange(date)
                          ? 'hover:bg-emerald-50'
                          : ''
                      }
                    `}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setSelectedRange({ start: null, end: null })}
            className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
          >
            Clear
          </button>
          <button
            onClick={() => selectedRange.start && selectedRange.end && onSelect(selectedRange)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
            disabled={!selectedRange.start || !selectedRange.end}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
