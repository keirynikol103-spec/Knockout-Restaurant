import { WeekendEvent } from '../types';
import boxingArenaImage from '../assets/images/boxing_arena_lights_1789760115937.jpg';

export const weekendEvents: WeekendEvent[] = [
  {
    id: "event-sat-championship",
    name: "Heavyweight Title Fight Night Showcase",
    date: "[EVENT INFORMATION TO BE ADDED]",
    day: "Saturday",
    time: "[EVENT INFORMATION TO BE ADDED]",
    description: "Live ringside broadcast on stadium mega-screens, ringside commentary, fast-food combo specials, and live sports fan community atmosphere.",
    image: boxingArenaImage,
    ticketInfo: "[EVENT INFORMATION TO BE ADDED]",
    available: true
  },
  {
    id: "event-sun-underground",
    name: "Sunday Sparring & Fight Night Special",
    date: "[EVENT INFORMATION TO BE ADDED]",
    day: "Sunday",
    time: "[EVENT INFORMATION TO BE ADDED]",
    description: "Sunday evening showdown atmosphere. Watch top matches with family and friends surrounded by American fight night energy and fresh burgers.",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80",
    ticketInfo: "[EVENT INFORMATION TO BE ADDED]",
    available: true
  }
];
