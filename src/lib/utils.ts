import type { WorkDay } from '../types/friends';

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-GB');
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const formatWorkTime = (workDays: WorkDay[]) => {
  console.log('workDays ', workDays);

  if (!workDays || workDays.length === 0) {
    return {
      currentWorkTime: 'Day and night',
      details: [],
    };
  }

  let todayIndex = new Date().getDay() - 1;
  if (todayIndex < 0) todayIndex = 6;
  
  const currentDay = workDays[todayIndex];;

  const currentWorkTime = currentDay.isOpen ? `${currentDay.from} - ${currentDay.to}` : 'Closed';

  const details = workDays.map((day, index) => {
    return {
      day: weekDays[index],
      time: day.isOpen ? `${day.from} - ${day.to}` : 'Closed',
      isToday: index === todayIndex,
    };
  });

  return { currentWorkTime, details };
};
