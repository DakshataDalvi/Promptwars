/**
 * MaidanMind — Venue Data & Simulated Real-Time Data
 * ===================================================
 * Contains all Indian sporting venue information and 
 * simulated crowd/temperature data for demonstration.
 */

const VENUES = {
  wankhede: {
    id: 'wankhede',
    name: 'Wankhede Stadium',
    city: 'Mumbai',
    state: 'Maharashtra',
    capacity: 33000,
    coords: { lat: 18.9388, lng: 72.8258 },
    zoom: 17,
    image: '🏟️',
    teams: ['Mumbai Indians'],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 5500, angle: 0 },
      { id: 'B', name: 'Sachin Tendulkar Stand', capacity: 6000, angle: 45 },
      { id: 'C', name: 'Sunil Gavaskar Stand', capacity: 5000, angle: 90 },
      { id: 'D', name: 'Garware Pavilion', capacity: 4500, angle: 135 },
      { id: 'E', name: 'South Stand', capacity: 5000, angle: 180 },
      { id: 'F', name: 'Vijay Merchant Stand', capacity: 4000, angle: 225 },
      { id: 'G', name: 'MCA Pavilion', capacity: 3000, angle: 270 }
    ],
    gates: [
      { id: 'GA', name: 'Gate A', direction: 'North', coords: { lat: 18.9395, lng: 72.8258 } },
      { id: 'GB', name: 'Gate B', direction: 'East', coords: { lat: 18.9388, lng: 72.8268 } },
      { id: 'GC', name: 'Gate C', direction: 'South', coords: { lat: 18.9380, lng: 72.8258 } },
      { id: 'GD', name: 'Gate D', direction: 'West', coords: { lat: 18.9388, lng: 72.8248 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Vada Pav Corner', section: 'A', items: ['Vada Pav', 'Misal Pav', 'Cutting Chai'], priceRange: '₹30-80' },
      { id: 'F2', name: 'Biryani House', section: 'B', items: ['Chicken Biryani', 'Veg Biryani', 'Raita'], priceRange: '₹150-250' },
      { id: 'F3', name: 'Chaat Express', section: 'C', items: ['Pani Puri', 'Bhel Puri', 'Sev Puri'], priceRange: '₹50-100' },
      { id: 'F4', name: 'South Indian Stall', section: 'D', items: ['Dosa', 'Idli', 'Filter Coffee'], priceRange: '₹60-120' },
      { id: 'F5', name: 'Drinks & More', section: 'E', items: ['Cold Drinks', 'Nimbu Paani', 'Lassi'], priceRange: '₹40-100' },
      { id: 'F6', name: 'Pizza & Burgers', section: 'F', items: ['Pizza Slice', 'Burger', 'Fries'], priceRange: '₹100-200' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: false },
      { id: 'R3', section: 'E', type: 'general', accessible: true },
      { id: 'R4', section: 'G', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Post 1', section: 'B', hasAED: true },
      { id: 'M2', name: 'Medical Post 2', section: 'E', hasAED: true }
    ]
  },

  narendramodi: {
    id: 'narendramodi',
    name: 'Narendra Modi Stadium',
    city: 'Ahmedabad',
    state: 'Gujarat',
    capacity: 132000,
    coords: { lat: 23.0916, lng: 72.5966 },
    zoom: 16,
    image: '🏟️',
    teams: ['Gujarat Titans'],
    sections: [
      { id: 'A', name: 'Adani Pavilion', capacity: 18000, angle: 0 },
      { id: 'B', name: 'BCCI Stand', capacity: 20000, angle: 45 },
      { id: 'C', name: 'Olympic Stand', capacity: 18000, angle: 90 },
      { id: 'D', name: 'Reliance Stand', capacity: 16000, angle: 135 },
      { id: 'E', name: 'Club House', capacity: 14000, angle: 180 },
      { id: 'F', name: 'Players Pavilion', capacity: 16000, angle: 225 },
      { id: 'G', name: 'East Gallery', capacity: 15000, angle: 270 },
      { id: 'H', name: 'West Gallery', capacity: 15000, angle: 315 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'North', coords: { lat: 23.0930, lng: 72.5966 } },
      { id: 'GB', name: 'Gate 2', direction: 'East', coords: { lat: 23.0916, lng: 72.5985 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 23.0900, lng: 72.5966 } },
      { id: 'GD', name: 'Gate 4', direction: 'West', coords: { lat: 23.0916, lng: 72.5948 } },
      { id: 'GE', name: 'Gate 5', direction: 'NE', coords: { lat: 23.0925, lng: 72.5978 } },
      { id: 'GF', name: 'Gate 6', direction: 'SW', coords: { lat: 23.0907, lng: 72.5955 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Gujarati Thali Express', section: 'A', items: ['Mini Thali', 'Dhokla', 'Fafda-Jalebi'], priceRange: '₹80-200' },
      { id: 'F2', name: 'Biryani Point', section: 'B', items: ['Biryani', 'Kebabs', 'Rumali Roti'], priceRange: '₹150-300' },
      { id: 'F3', name: 'Street Food Hub', section: 'C', items: ['Pav Bhaji', 'Dabeli', 'Pani Puri'], priceRange: '₹50-120' },
      { id: 'F4', name: 'South Flavours', section: 'D', items: ['Dosa', 'Uttapam', 'Coffee'], priceRange: '₹70-150' },
      { id: 'F5', name: 'Tandoor Express', section: 'E', items: ['Tandoori Items', 'Naan', 'Dal'], priceRange: '₹120-250' },
      { id: 'F6', name: 'Cold Zone', section: 'F', items: ['Ice Cream', 'Cold Drinks', 'Juice'], priceRange: '₹40-120' },
      { id: 'F7', name: 'Snack Bar', section: 'G', items: ['Samosa', 'Kachori', 'Sandwich'], priceRange: '₹30-100' },
      { id: 'F8', name: 'International Kitchen', section: 'H', items: ['Pizza', 'Pasta', 'Wraps'], priceRange: '₹150-300' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'B', type: 'general', accessible: true },
      { id: 'R3', section: 'C', type: 'general', accessible: false },
      { id: 'R4', section: 'D', type: 'general', accessible: true },
      { id: 'R5', section: 'F', type: 'general', accessible: true },
      { id: 'R6', section: 'H', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'Medical Center', section: 'A', hasAED: true },
      { id: 'M2', name: 'First Aid Post', section: 'D', hasAED: true },
      { id: 'M3', name: 'Emergency Bay', section: 'G', hasAED: true }
    ]
  },

  eden: {
    id: 'eden',
    name: 'Eden Gardens',
    city: 'Kolkata',
    state: 'West Bengal',
    capacity: 66000,
    coords: { lat: 22.5646, lng: 88.3433 },
    zoom: 17,
    image: '🏟️',
    teams: ['Kolkata Knight Riders'],
    sections: [
      { id: 'A', name: 'BC Roy Club House', capacity: 10000, angle: 0 },
      { id: 'B', name: 'Ranji Trophy Gallery', capacity: 12000, angle: 60 },
      { id: 'C', name: 'Vizzy Gallery', capacity: 11000, angle: 120 },
      { id: 'D', name: 'South Gallery', capacity: 11000, angle: 180 },
      { id: 'E', name: 'Dalmiya Stand', capacity: 12000, angle: 240 },
      { id: 'F', name: 'North Gallery', capacity: 10000, angle: 300 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'North', coords: { lat: 22.5655, lng: 88.3433 } },
      { id: 'GB', name: 'Gate 2', direction: 'East', coords: { lat: 22.5646, lng: 88.3445 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 22.5637, lng: 88.3433 } },
      { id: 'GD', name: 'Gate 4', direction: 'West', coords: { lat: 22.5646, lng: 88.3422 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Kolkata Roll Corner', section: 'A', items: ['Egg Roll', 'Chicken Roll', 'Paneer Roll'], priceRange: '₹60-120' },
      { id: 'F2', name: 'Bengali Snacks', section: 'B', items: ['Phuchka', 'Jhalmuri', 'Ghugni'], priceRange: '₹30-80' },
      { id: 'F3', name: 'Biryani Counter', section: 'C', items: ['Kolkata Biryani', 'Egg Biryani'], priceRange: '₹120-200' },
      { id: 'F4', name: 'Mishti Hub', section: 'D', items: ['Rosogolla', 'Sandesh', 'Mishti Doi'], priceRange: '₹40-100' },
      { id: 'F5', name: 'Fast Food', section: 'E', items: ['Burger', 'Pizza', 'Momos'], priceRange: '₹80-180' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: true },
      { id: 'R3', section: 'E', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'Medical Room', section: 'A', hasAED: true },
      { id: 'M2', name: 'First Aid', section: 'D', hasAED: true }
    ]
  },

  chinnaswamy: {
    id: 'chinnaswamy',
    name: 'M. Chinnaswamy Stadium',
    city: 'Bengaluru',
    state: 'Karnataka',
    capacity: 40000,
    coords: { lat: 12.9788, lng: 77.5996 },
    zoom: 17,
    image: '🏟️',
    teams: ['Royal Challengers Bengaluru'],
    sections: [
      { id: 'A', name: 'KSCA Pavilion', capacity: 7000, angle: 0 },
      { id: 'B', name: 'P Stand', capacity: 7000, angle: 72 },
      { id: 'C', name: 'Q Stand', capacity: 6500, angle: 144 },
      { id: 'D', name: 'R Stand', capacity: 6500, angle: 216 },
      { id: 'E', name: 'S Stand', capacity: 6500, angle: 288 },
      { id: 'F', name: 'Corporate Box', capacity: 6500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'MG Road', coords: { lat: 12.9795, lng: 77.5996 } },
      { id: 'GB', name: 'Gate 2', direction: 'Cubbon Park', coords: { lat: 12.9788, lng: 77.6006 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 12.9780, lng: 77.5996 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Dosa Point', section: 'A', items: ['Masala Dosa', 'Rava Dosa', 'Filter Coffee'], priceRange: '₹60-120' },
      { id: 'F2', name: 'Biryani Express', section: 'B', items: ['Hyderabadi Biryani', 'Kebabs'], priceRange: '₹150-250' },
      { id: 'F3', name: 'Chat Corner', section: 'C', items: ['Pani Puri', 'Bhel', 'Masala Puri'], priceRange: '₹50-100' },
      { id: 'F4', name: 'Beverages', section: 'D', items: ['Fresh Juice', 'Buttermilk', 'Cold Drinks'], priceRange: '₹40-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Post', section: 'B', hasAED: true }
    ]
  },

  chepauk: {
    id: 'chepauk',
    name: 'MA Chidambaram Stadium',
    city: 'Chennai',
    state: 'Tamil Nadu',
    capacity: 50000,
    coords: { lat: 13.0627, lng: 80.2792 },
    zoom: 17,
    image: '🏟️',
    teams: ['Chennai Super Kings'],
    sections: [
      { id: 'A', name: 'I Pavilion', capacity: 8500, angle: 0 },
      { id: 'B', name: 'V Stand', capacity: 9000, angle: 60 },
      { id: 'C', name: 'N Stand', capacity: 8500, angle: 120 },
      { id: 'D', name: 'H Stand', capacity: 8000, angle: 180 },
      { id: 'E', name: 'L Stand', capacity: 8000, angle: 240 },
      { id: 'F', name: 'Anna Pavilion', capacity: 8000, angle: 300 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Wallajah Road', coords: { lat: 13.0635, lng: 80.2792 } },
      { id: 'GB', name: 'Gate 2', direction: 'Victoria Hostel Road', coords: { lat: 13.0627, lng: 80.2803 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 13.0618, lng: 80.2792 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Chettinad Kitchen', section: 'A', items: ['Chicken 65', 'Parotta', 'Kothu Parotta'], priceRange: '₹80-180' },
      { id: 'F2', name: 'Idli Factory', section: 'B', items: ['Idli', 'Dosa', 'Pongal', 'Filter Coffee'], priceRange: '₹40-100' },
      { id: 'F3', name: 'Snack Stall', section: 'C', items: ['Bajji', 'Bonda', 'Murukku'], priceRange: '₹30-80' },
      { id: 'F4', name: 'Cool Drinks', section: 'D', items: ['Tender Coconut', 'Nannari', 'Jigarthanda'], priceRange: '₹40-120' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Centre', section: 'B', hasAED: true }
    ]
  },

  dypatil: {
    id: 'dypatil',
    name: 'DY Patil Stadium',
    city: 'Navi Mumbai',
    state: 'Maharashtra',
    capacity: 55000,
    coords: { lat: 19.0154, lng: 73.0190 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'Main Stand', capacity: 10000, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 10000, angle: 72 },
      { id: 'C', name: 'South Curve', capacity: 9000, angle: 144 },
      { id: 'D', name: 'West Stand', capacity: 9000, angle: 216 },
      { id: 'E', name: 'North Curve', capacity: 9000, angle: 288 },
      { id: 'F', name: 'VIP Enclosure', capacity: 8000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main Entry', coords: { lat: 19.0163, lng: 73.0190 } },
      { id: 'GB', name: 'Gate 2', direction: 'East', coords: { lat: 19.0154, lng: 73.0202 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 19.0145, lng: 73.0190 } },
      { id: 'GD', name: 'Gate 4', direction: 'West', coords: { lat: 19.0154, lng: 73.0178 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Mumbai Munchies', section: 'A', items: ['Vada Pav', 'Pav Bhaji', 'Sandwich'], priceRange: '₹40-100' },
      { id: 'F2', name: 'Grill House', section: 'B', items: ['Kebabs', 'Tikka', 'Shawarma'], priceRange: '₹120-250' },
      { id: 'F3', name: 'Chaat Paradise', section: 'C', items: ['Sev Puri', 'Ragda Pattice', 'Dahi Puri'], priceRange: '₹50-100' },
      { id: 'F4', name: 'Chinese Corner', section: 'D', items: ['Manchurian', 'Fried Rice', 'Noodles'], priceRange: '₹80-150' },
      { id: 'F5', name: 'Refreshments', section: 'E', items: ['Nimbu Soda', 'Lassi', 'Ice Tea'], priceRange: '₹50-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: true },
      { id: 'R3', section: 'E', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'Medical Room', section: 'B', hasAED: true },
      { id: 'M2', name: 'First Aid', section: 'D', hasAED: true }
    ]
  },

  rajivgandhi: {
    id: 'rajivgandhi',
    name: 'Rajiv Gandhi Intl Stadium',
    city: 'Hyderabad',
    state: 'Telangana',
    capacity: 55000,
    coords: { lat: 17.4065, lng: 78.5501 },
    zoom: 17,
    image: '🏟️',
    teams: ['Sunrisers Hyderabad'],
    sections: [
      { id: 'A', name: 'Pavilion End', capacity: 10000, angle: 0 },
      { id: 'B', name: 'East Wing', capacity: 10000, angle: 72 },
      { id: 'C', name: 'South Stand', capacity: 9000, angle: 144 },
      { id: 'D', name: 'West Wing', capacity: 9000, angle: 216 },
      { id: 'E', name: 'VIP Stand', capacity: 8500, angle: 288 },
      { id: 'F', name: 'Media Box', capacity: 8500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 17.4074, lng: 78.5501 } },
      { id: 'GB', name: 'Gate 2', direction: 'East', coords: { lat: 17.4065, lng: 78.5513 } },
      { id: 'GC', name: 'Gate 3', direction: 'South', coords: { lat: 17.4056, lng: 78.5501 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Hyderabadi Biryani', section: 'A', items: ['Dum Biryani', 'Haleem', 'Mirchi Ka Salan'], priceRange: '₹120-250' },
      { id: 'F2', name: 'Irani Chai Corner', section: 'B', items: ['Irani Chai', 'Osmania Biscuits', 'Samosa'], priceRange: '₹30-80' },
      { id: 'F3', name: 'Fast Bites', section: 'C', items: ['Shawarma', 'Momos', 'Spring Roll'], priceRange: '₹60-150' },
      { id: 'F4', name: 'Cool Corner', section: 'D', items: ['Falooda', 'Ice Cream', 'Juice'], priceRange: '₹60-150' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Post', section: 'B', hasAED: true }
    ]
  },

  mohali: {
    id: 'mohali',
    name: 'IS Bindra PCA Stadium',
    city: 'Mohali',
    state: 'Punjab',
    capacity: 26000,
    coords: { lat: 30.6928, lng: 76.7354 },
    zoom: 17,
    image: '🏟️',
    teams: ['Punjab Kings'],
    sections: [
      { id: 'A', name: 'City End', capacity: 5000, angle: 0 },
      { id: 'B', name: 'Pavilion End', capacity: 5500, angle: 72 },
      { id: 'C', name: 'East Stand', capacity: 5000, angle: 144 },
      { id: 'D', name: 'North Stand', capacity: 5000, angle: 216 },
      { id: 'E', name: 'West Stand', capacity: 5500, angle: 288 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 30.6936, lng: 76.7354 } },
      { id: 'GB', name: 'Gate 2', direction: 'East', coords: { lat: 30.6928, lng: 76.7365 } },
      { id: 'GC', name: 'Gate 3', direction: 'West', coords: { lat: 30.6928, lng: 76.7343 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Punjabi Dhaba', section: 'A', items: ['Chole Bhature', 'Amritsari Kulcha', 'Lassi'], priceRange: '₹60-150' },
      { id: 'F2', name: 'Tandoor Point', section: 'B', items: ['Tandoori Chicken', 'Naan', 'Butter Chicken'], priceRange: '₹150-300' },
      { id: 'F3', name: 'Snack Hub', section: 'C', items: ['Samosa', 'Tikki', 'Pakora'], priceRange: '₹30-80' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Room', section: 'C', hasAED: true }
    ]
  },

  arunjaitley: {
    id: 'arunjaitley',
    name: 'Arun Jaitley Stadium',
    city: 'Delhi',
    state: 'Delhi',
    capacity: 41820,
    coords: { lat: 28.6376, lng: 77.2432 },
    zoom: 17,
    image: '🏟️',
    teams: ['Delhi Capitals'],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 7000, angle: 0 },
      { id: 'B', name: 'Hill B', capacity: 7000, angle: 72 },
      { id: 'C', name: 'Club House', capacity: 6820, angle: 144 },
      { id: 'D', name: 'South Stand', capacity: 7000, angle: 216 },
      { id: 'E', name: 'East Stand', capacity: 7000, angle: 288 },
      { id: 'F', name: 'DDCA Box', capacity: 7000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'BSZ Marg', coords: { lat: 28.6380, lng: 77.2430 } },
      { id: 'GB', name: 'Gate 2', direction: 'Feroz Shah Rd', coords: { lat: 28.6370, lng: 77.2440 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Delhi Chaat', section: 'A', items: ['Chole Bhature', 'Aloo Tikki', 'Lassi'], priceRange: '₹50-150' },
      { id: 'F2', name: 'Kebab Corner', section: 'D', items: ['Seekh Kebab', 'Chicken Tikka', 'Rumali Roti'], priceRange: '₹120-250' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Post', section: 'C', hasAED: true }
    ]
  },

  sawaimansingh: {
    id: 'sawaimansingh',
    name: 'Sawai Mansingh Stadium',
    city: 'Jaipur',
    state: 'Rajasthan',
    capacity: 30000,
    coords: { lat: 26.8940, lng: 75.8037 },
    zoom: 17,
    image: '🏟️',
    teams: ['Rajasthan Royals'],
    sections: [
      { id: 'A', name: 'North Block', capacity: 5000, angle: 0 },
      { id: 'B', name: 'East Block', capacity: 5000, angle: 72 },
      { id: 'C', name: 'South Block', capacity: 5000, angle: 144 },
      { id: 'D', name: 'West Block', capacity: 5000, angle: 216 },
      { id: 'E', name: 'Pavilion', capacity: 5000, angle: 288 },
      { id: 'F', name: 'Presidential', capacity: 5000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'North Entry', coords: { lat: 26.8945, lng: 75.8037 } },
      { id: 'GB', name: 'Gate 2', direction: 'South Entry', coords: { lat: 26.8935, lng: 75.8037 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Rajwadi Thali', section: 'B', items: ['Dal Bati Churma', 'Kachori', 'Mirchi Bada'], priceRange: '₹80-200' },
      { id: 'F2', name: 'Snack Bar', section: 'E', items: ['Samosa', 'Chai', 'Cold Drinks'], priceRange: '₹30-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'First Aid', section: 'C', hasAED: true }
    ]
  },

  ekana: {
    id: 'ekana',
    name: 'BRSABV Ekana Stadium',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    capacity: 50000,
    coords: { lat: 26.8118, lng: 81.0118 },
    zoom: 17,
    image: '🏟️',
    teams: ['Lucknow Super Giants'],
    sections: [
      { id: 'A', name: 'North Gallery', capacity: 8000, angle: 0 },
      { id: 'B', name: 'East Gallery', capacity: 8500, angle: 72 },
      { id: 'C', name: 'South Gallery', capacity: 8000, angle: 144 },
      { id: 'D', name: 'West Pavilion', capacity: 8500, angle: 216 },
      { id: 'E', name: 'Corporate Boxes', capacity: 8500, angle: 288 },
      { id: 'F', name: 'Media Center', capacity: 8500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main Artery', coords: { lat: 26.8125, lng: 81.0118 } },
      { id: 'GB', name: 'Gate 2', direction: 'VIP Entry', coords: { lat: 26.8118, lng: 81.0125 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Awadhi Dastarkhwan', section: 'A', items: ['Tunday Kebab', 'Lucknowi Biryani', 'Sheermal'], priceRange: '₹150-300' },
      { id: 'F2', name: 'Chaat Corner', section: 'C', items: ['Basket Chaat', 'Aloo Tikki', 'Pani Ke Batashe'], priceRange: '₹60-120' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Room', section: 'D', hasAED: true }
    ]
  },

  mca: {
    id: 'mca',
    name: 'MCA Stadium',
    city: 'Pune',
    state: 'Maharashtra',
    capacity: 37000,
    coords: { lat: 18.6745, lng: 73.7064 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 6000, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 6000, angle: 72 },
      { id: 'C', name: 'South Stand', capacity: 6000, angle: 144 },
      { id: 'D', name: 'West Stand', capacity: 6000, angle: 216 },
      { id: 'E', name: 'NW Stand', capacity: 6500, angle: 288 },
      { id: 'F', name: 'Pavilion', capacity: 6500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Expressway Side', coords: { lat: 18.6750, lng: 73.7064 } },
      { id: 'GB', name: 'Gate 2', direction: 'South Entry', coords: { lat: 18.6740, lng: 73.7064 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Puneri Misal', section: 'A', items: ['Misal Pav', 'Kande Pohe', 'Pithla Bhakri'], priceRange: '₹70-150' },
      { id: 'F2', name: 'Bakery Bites', section: 'D', items: ['Shrewsbury Biscuits', 'Mawa Cake', 'Puffs'], priceRange: '₹40-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'First Aid Post', section: 'C', hasAED: true }
    ]
  },

  holkar: {
    id: 'holkar',
    name: 'Holkar Cricket Stadium',
    city: 'Indore',
    state: 'Madhya Pradesh',
    capacity: 30000,
    coords: { lat: 22.7246, lng: 75.8753 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Pavilion', capacity: 5000, angle: 0 },
      { id: 'B', name: 'East Gallery', capacity: 5000, angle: 72 },
      { id: 'C', name: 'South Pavilion', capacity: 5000, angle: 144 },
      { id: 'D', name: 'West Gallery', capacity: 5000, angle: 216 },
      { id: 'E', name: 'VIP Block', capacity: 5000, angle: 288 },
      { id: 'F', name: 'Media Box', capacity: 5000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Race Course Rd', coords: { lat: 22.7250, lng: 75.8753 } },
      { id: 'GB', name: 'Gate 2', direction: 'Janjeerwala Sq', coords: { lat: 22.7240, lng: 75.8753 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Sarafa Express', section: 'B', items: ['Poha Jalebi', 'Bhutte Ka Kees', 'Kopra Pattice'], priceRange: '₹40-120' },
      { id: 'F2', name: 'Chappan Flavours', section: 'C', items: ['Momos', 'Rolls', 'Sandwich'], priceRange: '₹50-150' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Help', section: 'E', hasAED: true }
    ]
  },

  vca: {
    id: 'vca',
    name: 'VCA Stadium',
    city: 'Nagpur',
    state: 'Maharashtra',
    capacity: 45000,
    coords: { lat: 20.9995, lng: 79.0354 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 7500, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 7500, angle: 72 },
      { id: 'C', name: 'South Stand', capacity: 7500, angle: 144 },
      { id: 'D', name: 'West Stand', capacity: 7500, angle: 216 },
      { id: 'E', name: 'Presidential Box', capacity: 7500, angle: 288 },
      { id: 'F', name: 'Club House', capacity: 7500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Wardha Road', coords: { lat: 20.9999, lng: 79.0354 } },
      { id: 'GB', name: 'Gate 2', direction: 'South Entry', coords: { lat: 20.9990, lng: 79.0354 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Saoji Special', section: 'A', items: ['Saoji Chicken', 'Tarri Poha', 'Santra Barfi'], priceRange: '₹60-200' },
      { id: 'F2', name: 'Snack Point', section: 'D', items: ['Samosa', 'Kachori', 'Chai'], priceRange: '₹30-80' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'C', type: 'general', accessible: false }
    ],
    medical: [
      { id: 'M1', name: 'First Aid', section: 'B', hasAED: true }
    ]
  },

  greenpark: {
    id: 'greenpark',
    name: 'Green Park Stadium',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    capacity: 32000,
    coords: { lat: 26.4947, lng: 80.3475 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'Directorate', capacity: 5000, angle: 0 },
      { id: 'B', name: 'Students', capacity: 5500, angle: 72 },
      { id: 'C', name: 'General', capacity: 5500, angle: 144 },
      { id: 'D', name: 'Pavilion', capacity: 5500, angle: 216 },
      { id: 'E', name: 'VIP Box', capacity: 5000, angle: 288 },
      { id: 'F', name: 'Members', capacity: 5500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 26.4950, lng: 80.3475 } },
      { id: 'GB', name: 'Gate 2', direction: 'River Side', coords: { lat: 26.4940, lng: 80.3475 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Thaggu Ke Ladoo', section: 'B', items: ['Badnaam Kulfi', 'Ladoo', 'Rabri'], priceRange: '₹50-150' },
      { id: 'F2', name: 'Kanpur Chaat', section: 'E', items: ['Aloo Tikki', 'Dahi Bhalla', 'Gol Gappe'], priceRange: '₹40-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'C', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Room', section: 'A', hasAED: true }
    ]
  },

  sca: {
    id: 'sca',
    name: 'SCA Stadium',
    city: 'Rajkot',
    state: 'Gujarat',
    capacity: 28000,
    coords: { lat: 22.3595, lng: 70.7303 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Pavilion', capacity: 4500, angle: 0 },
      { id: 'B', name: 'East Gallery', capacity: 4500, angle: 72 },
      { id: 'C', name: 'South Pavilion', capacity: 4500, angle: 144 },
      { id: 'D', name: 'West Block', capacity: 4500, angle: 216 },
      { id: 'E', name: 'Corporate', capacity: 5000, angle: 288 },
      { id: 'F', name: 'General', capacity: 5000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Highway', coords: { lat: 22.3600, lng: 70.7303 } },
      { id: 'GB', name: 'Gate 2', direction: 'South', coords: { lat: 22.3590, lng: 70.7303 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Kathiyawadi Kitchen', section: 'A', items: ['Fafda Jalebi', 'Ganthiya', 'Chai'], priceRange: '₹50-120' },
      { id: 'F2', name: 'Fast Food', section: 'D', items: ['Pizza', 'Burger', 'Cold Drinks'], priceRange: '₹80-150' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Support', section: 'C', hasAED: true }
    ]
  },

  acavdca: {
    id: 'acavdca',
    name: 'ACA-VDCA Stadium',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    capacity: 27500,
    coords: { lat: 17.7972, lng: 83.3510 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 4500, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 4500, angle: 72 },
      { id: 'C', name: 'South Stand', capacity: 4500, angle: 144 },
      { id: 'D', name: 'West Pavilion', capacity: 4500, angle: 216 },
      { id: 'E', name: 'Corporate Box', capacity: 4500, angle: 288 },
      { id: 'F', name: 'General Gallery', capacity: 5000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Kommadi Rd', coords: { lat: 17.7980, lng: 83.3510 } },
      { id: 'GB', name: 'Gate 2', direction: 'South Entry', coords: { lat: 17.7965, lng: 83.3510 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Andhra Spices', section: 'B', items: ['Pulihora', 'Punugulu', 'Mirapakaya Bajji'], priceRange: '₹40-100' },
      { id: 'F2', name: 'Coastal Seafood', section: 'C', items: ['Fish Fry', 'Prawn Rolls', 'Lime Soda'], priceRange: '₹100-250' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'First Aid', section: 'E', hasAED: true }
    ]
  },

  jsca: {
    id: 'jsca',
    name: 'JSCA Stadium',
    city: 'Ranchi',
    state: 'Jharkhand',
    capacity: 39000,
    coords: { lat: 23.3101, lng: 85.2750 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Pavilion', capacity: 6500, angle: 0 },
      { id: 'B', name: 'East Box', capacity: 6500, angle: 72 },
      { id: 'C', name: 'MS Dhoni Pavilion', capacity: 6500, angle: 144 },
      { id: 'D', name: 'West Block', capacity: 6500, angle: 216 },
      { id: 'E', name: 'Corporate', capacity: 6500, angle: 288 },
      { id: 'F', name: 'General', capacity: 6500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'North', coords: { lat: 23.3110, lng: 85.2750 } },
      { id: 'GB', name: 'Gate 2', direction: 'South', coords: { lat: 23.3090, lng: 85.2750 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Litti Chokha Depot', section: 'A', items: ['Litti Chokha', 'Sattu Drink', 'Peda'], priceRange: '₹50-120' },
      { id: 'F2', name: 'Tribal Tastes', section: 'D', items: ['Dhuska', 'Chilka Roti', 'Tea'], priceRange: '₹40-100' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Station', section: 'C', hasAED: true }
    ]
  },

  barsapara: {
    id: 'barsapara',
    name: 'Barsapara Stadium',
    city: 'Guwahati',
    state: 'Assam',
    capacity: 39800,
    coords: { lat: 26.1364, lng: 91.7371 },
    zoom: 17,
    image: '🏟️',
    teams: ['Rajasthan Royals'],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 6500, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 6500, angle: 72 },
      { id: 'C', name: 'South Pavilion', capacity: 6800, angle: 144 },
      { id: 'D', name: 'West Stand', capacity: 6500, angle: 216 },
      { id: 'E', name: 'VIP Block', capacity: 6500, angle: 288 },
      { id: 'F', name: 'Media Box', capacity: 6500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 26.1370, lng: 91.7371 } },
      { id: 'GB', name: 'Gate 2', direction: 'South', coords: { lat: 26.1355, lng: 91.7371 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Assam Delights', section: 'A', items: ['Khar', 'Masor Tenga', 'Assam Tea'], priceRange: '₹50-150' },
      { id: 'F2', name: 'Momo House', section: 'C', items: ['Chicken Momos', 'Pork Momos', 'Thukpa'], priceRange: '₹80-180' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Support', section: 'E', hasAED: true }
    ]
  },

  greenfield: {
    id: 'greenfield',
    name: 'Greenfield Stadium',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    capacity: 50000,
    coords: { lat: 8.5719, lng: 76.8797 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Block', capacity: 8000, angle: 0 },
      { id: 'B', name: 'East Block', capacity: 8500, angle: 72 },
      { id: 'C', name: 'South Block', capacity: 8000, angle: 144 },
      { id: 'D', name: 'West Block', capacity: 8500, angle: 216 },
      { id: 'E', name: 'Pavilion A', capacity: 8500, angle: 288 },
      { id: 'F', name: 'Pavilion B', capacity: 8500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 8.5725, lng: 76.8797 } },
      { id: 'GB', name: 'Gate 2', direction: 'South', coords: { lat: 8.5710, lng: 76.8797 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Kerala Kitchen', section: 'B', items: ['Puttu Kadala', 'Appam Stew', 'Banana Chips'], priceRange: '₹50-180' },
      { id: 'F2', name: 'Coolbar', section: 'E', items: ['Kuluki Sarbath', 'Lime Tea', 'Snacks'], priceRange: '₹30-80' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Help', section: 'C', hasAED: true }
    ]
  },

  hpca: {
    id: 'hpca',
    name: 'HPCA Stadium',
    city: 'Dharamshala',
    state: 'Himachal Pradesh',
    capacity: 23000,
    coords: { lat: 32.1976, lng: 76.3259 },
    zoom: 17,
    image: '🏟️',
    teams: ['Punjab Kings'],
    sections: [
      { id: 'A', name: 'North Stand', capacity: 4000, angle: 0 },
      { id: 'B', name: 'East Stand', capacity: 3500, angle: 72 },
      { id: 'C', name: 'South Pavilion', capacity: 4000, angle: 144 },
      { id: 'D', name: 'West Stand', capacity: 3500, angle: 216 },
      { id: 'E', name: 'Club Lounge', capacity: 4000, angle: 288 },
      { id: 'F', name: 'General', capacity: 4000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Mountain View', coords: { lat: 32.1980, lng: 76.3259 } },
      { id: 'GB', name: 'Gate 2', direction: 'Valley View', coords: { lat: 32.1970, lng: 76.3259 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Himalayan Bites', section: 'A', items: ['Thukpa', 'Momos', 'Hot Soup'], priceRange: '₹80-150' },
      { id: 'F2', name: 'Cafe Dharamshala', section: 'D', items: ['Cappuccino', 'Sandwiches', 'Pastries'], priceRange: '₹100-250' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'First Aid', section: 'C', hasAED: true }
    ]
  },

  barabati: {
    id: 'barabati',
    name: 'Barabati Stadium',
    city: 'Cuttack',
    state: 'Odisha',
    capacity: 45000,
    coords: { lat: 20.4800, lng: 85.8690 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'Gallery 1', capacity: 7500, angle: 0 },
      { id: 'B', name: 'Gallery 2', capacity: 7500, angle: 72 },
      { id: 'C', name: 'Gallery 3', capacity: 7500, angle: 144 },
      { id: 'D', name: 'Pavilion', capacity: 7500, angle: 216 },
      { id: 'E', name: 'Corporate', capacity: 7500, angle: 288 },
      { id: 'F', name: 'General', capacity: 7500, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Main', coords: { lat: 20.4810, lng: 85.8690 } },
      { id: 'GB', name: 'Gate 2', direction: 'South', coords: { lat: 20.4790, lng: 85.8690 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Odia Flavours', section: 'B', items: ['Dahibara Aloodum', 'Chenna Poda', 'Rasagola'], priceRange: '₹40-100' },
      { id: 'F2', name: 'Snacks Cart', section: 'E', items: ['Samosa', 'Chop', 'Tea'], priceRange: '₹30-80' }
    ],
    restrooms: [
      { id: 'R1', section: 'A', type: 'general', accessible: true },
      { id: 'R2', section: 'D', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'Medical Center', section: 'C', hasAED: true }
    ]
  },

  raipur: {
    id: 'raipur',
    name: 'Shaheed Veer Narayan Singh Stadium',
    city: 'Raipur',
    state: 'Chhattisgarh',
    capacity: 65000,
    coords: { lat: 21.1646, lng: 81.7656 },
    zoom: 17,
    image: '🏟️',
    teams: [],
    sections: [
      { id: 'A', name: 'North Pavilion', capacity: 10000, angle: 0 },
      { id: 'B', name: 'East Gallery', capacity: 11000, angle: 72 },
      { id: 'C', name: 'South Pavilion', capacity: 11000, angle: 144 },
      { id: 'D', name: 'West Gallery', capacity: 11000, angle: 216 },
      { id: 'E', name: 'Corporate Box', capacity: 11000, angle: 288 },
      { id: 'F', name: 'General', capacity: 11000, angle: 340 }
    ],
    gates: [
      { id: 'GA', name: 'Gate 1', direction: 'Nava Raipur Entry', coords: { lat: 21.1655, lng: 81.7656 } },
      { id: 'GB', name: 'Gate 2', direction: 'VIP Entry', coords: { lat: 21.1635, lng: 81.7656 } }
    ],
    foodStalls: [
      { id: 'F1', name: 'Chhattisgarhi Swad', section: 'A', items: ['Chilla', 'Fara', 'Muthia'], priceRange: '₹50-120' },
      { id: 'F2', name: 'Global Bites', section: 'C', items: ['Pizza', 'Burger', 'Cold Drinks'], priceRange: '₹100-200' }
    ],
    restrooms: [
      { id: 'R1', section: 'B', type: 'general', accessible: true },
      { id: 'R2', section: 'E', type: 'general', accessible: true }
    ],
    medical: [
      { id: 'M1', name: 'First Aid', section: 'D', hasAED: true }
    ]
  }
};

/**
 * Simulated Match Data
 * Generates realistic match scenarios for demonstration
 */
const MATCHES = {
  wankhede: {
    team1: 'Mumbai Indians',
    team2: 'Chennai Super Kings',
    team1Short: 'MI',
    team2Short: 'CSK',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 2,
    overs: '14.3',
    score: { team1: '178/5', team2: '142/4' },
    target: 179,
    runRate: 9.79,
    requiredRate: 11.27,
    lastEvent: 'FOUR by Dhoni! CSK need 37 off 33 balls',
    prediction: 'MI favored — 62%',
    nextEvent: { type: 'strategic_timeout', inOvers: 2.3, inMinutes: 9 },
    weather: { temp: 34, humidity: 72, condition: 'Clear', windSpeed: 12 }
  },
  narendramodi: {
    team1: 'Gujarat Titans',
    team2: 'Rajasthan Royals',
    team1Short: 'GT',
    team2Short: 'RR',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 1,
    overs: '11.2',
    score: { team1: '98/3', team2: '-' },
    target: null,
    runRate: 8.65,
    requiredRate: null,
    lastEvent: 'SIX by Gill! GT cruising',
    prediction: 'GT batting first',
    nextEvent: { type: 'drinks_break', inOvers: 0.4, inMinutes: 2 },
    weather: { temp: 42, humidity: 35, condition: 'Hot & Sunny', windSpeed: 8 }
  },
  eden: {
    team1: 'Kolkata Knight Riders',
    team2: 'Delhi Capitals',
    team1Short: 'KKR',
    team2Short: 'DC',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 2,
    overs: '18.4',
    score: { team1: '195/4', team2: '186/6' },
    target: 196,
    runRate: 9.96,
    requiredRate: 12.50,
    lastEvent: 'WICKET! Pant caught at deep. Tense finish!',
    prediction: 'KKR favored — 78%',
    nextEvent: { type: 'match_end', inOvers: 1.2, inMinutes: 5 },
    weather: { temp: 31, humidity: 85, condition: 'Humid', windSpeed: 6 }
  },
  chinnaswamy: {
    team1: 'Royal Challengers Bengaluru',
    team2: 'Lucknow Super Giants',
    team1Short: 'RCB',
    team2Short: 'LSG',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 1,
    overs: '8.0',
    score: { team1: '72/1', team2: '-' },
    target: null,
    runRate: 9.00,
    requiredRate: null,
    lastEvent: 'Kohli hits a classic cover drive for FOUR!',
    prediction: 'RCB batting — strong start',
    nextEvent: { type: 'strategic_timeout', inOvers: 2, inMinutes: 8 },
    weather: { temp: 28, humidity: 65, condition: 'Pleasant', windSpeed: 10 }
  },
  chepauk: {
    team1: 'Chennai Super Kings',
    team2: 'Sunrisers Hyderabad',
    team1Short: 'CSK',
    team2Short: 'SRH',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 2,
    overs: '12.0',
    score: { team1: '165/7', team2: '98/2' },
    target: 166,
    runRate: 8.17,
    requiredRate: 8.50,
    lastEvent: 'Dhoni walks in! Chepauk erupts! 🦁',
    prediction: 'Match in balance — 52% CSK',
    nextEvent: { type: 'strategic_timeout', inOvers: 1, inMinutes: 4 },
    weather: { temp: 38, humidity: 80, condition: 'Hot & Humid', windSpeed: 5 }
  },
  dypatil: {
    team1: 'India',
    team2: 'Australia',
    team1Short: 'IND',
    team2Short: 'AUS',
    format: 'ODI',
    status: 'live',
    innings: 2,
    overs: '38.2',
    score: { team1: '298/6', team2: '245/5' },
    target: 299,
    runRate: 6.39,
    requiredRate: 7.69,
    lastEvent: 'Good partnership building for Australia',
    prediction: 'India favored — 65%',
    nextEvent: { type: 'drinks_break', inOvers: 1.4, inMinutes: 6 },
    weather: { temp: 33, humidity: 70, condition: 'Partly Cloudy', windSpeed: 14 }
  },
  rajivgandhi: {
    team1: 'Sunrisers Hyderabad',
    team2: 'Mumbai Indians',
    team1Short: 'SRH',
    team2Short: 'MI',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 1,
    overs: '15.0',
    score: { team1: '132/3', team2: '-' },
    target: null,
    runRate: 8.80,
    requiredRate: null,
    lastEvent: 'SRH accelerating in death overs!',
    prediction: 'SRH batting strong',
    nextEvent: { type: 'innings_break', inOvers: 5, inMinutes: 20 },
    weather: { temp: 36, humidity: 55, condition: 'Warm', windSpeed: 9 }
  },
  mohali: {
    team1: 'Punjab Kings',
    team2: 'Gujarat Titans',
    team1Short: 'PBKS',
    team2Short: 'GT',
    format: 'T20 (IPL)',
    status: 'live',
    innings: 2,
    overs: '6.0',
    score: { team1: '155/8', team2: '52/1' },
    target: 156,
    runRate: 8.67,
    requiredRate: 7.43,
    lastEvent: 'Easy chase so far for GT',
    prediction: 'GT favored — 70%',
  },
  arunjaitley: {
    team1: 'Delhi Capitals', team2: 'Mumbai Indians', team1Short: 'DC', team2Short: 'MI',
    format: 'T20 (IPL)', status: 'live', innings: 2, overs: '12.4',
    score: { team1: '110/3', team2: '168/6' }, target: 169, runRate: 8.68, requiredRate: 8.04,
    lastEvent: 'SIX by Pant! Crowd goes wild!', prediction: 'DC favored — 68%',
    nextEvent: { type: 'strategic_timeout', inOvers: 1.2, inMinutes: 6 },
    weather: { temp: 39, humidity: 40, condition: 'Very Hot', windSpeed: 8 }
  },
  sawaimansingh: {
    team1: 'Rajasthan Royals', team2: 'Chennai Super Kings', team1Short: 'RR', team2Short: 'CSK',
    format: 'T20 (IPL)', status: 'live', innings: 1, overs: '8.0',
    score: { team1: '75/1', team2: '-' }, target: null, runRate: 9.37, requiredRate: null,
    lastEvent: 'Samson boundary past point.', prediction: 'RR strong start',
    nextEvent: { type: 'strategic_timeout', inOvers: 0, inMinutes: 1 },
    weather: { temp: 38, humidity: 30, condition: 'Dry Heat', windSpeed: 12 }
  },
  ekana: {
    team1: 'Lucknow Super Giants', team2: 'Gujarat Titans', team1Short: 'LSG', team2Short: 'GT',
    format: 'T20 (IPL)', status: 'live', innings: 2, overs: '18.1',
    score: { team1: '145/6', team2: '155/8' }, target: 156, runRate: 7.98, requiredRate: 6.00,
    lastEvent: 'Single taken, LSG need 11 off 11.', prediction: 'LSG favored — 85%',
    nextEvent: { type: 'match_end', inOvers: 1.5, inMinutes: 8 },
    weather: { temp: 35, humidity: 55, condition: 'Warm', windSpeed: 5 }
  },
  mca: {
    team1: 'India', team2: 'England', team1Short: 'IND', team2Short: 'ENG',
    format: 'ODI', status: 'live', innings: 1, overs: '32.0',
    score: { team1: '190/3', team2: '-' }, target: null, runRate: 5.93, requiredRate: null,
    lastEvent: 'Kohli reaches his 50!', prediction: 'IND projecting 320+',
    nextEvent: { type: 'drinks_break', inOvers: 2, inMinutes: 8 },
    weather: { temp: 31, humidity: 45, condition: 'Clear', windSpeed: 15 }
  },
  holkar: {
    team1: 'Madhya Pradesh', team2: 'Mumbai', team1Short: 'MP', team2Short: 'MUM',
    format: 'Ranji Trophy', status: 'live', innings: 3, overs: '45.0',
    score: { team1: '120/4', team2: '350 & 200/5d' }, target: 431, runRate: 2.66, requiredRate: null,
    lastEvent: 'Solid defense by the MP captain.', prediction: 'Match leaning Mumbai',
    nextEvent: { type: 'tea_break', inOvers: 5, inMinutes: 25 },
    weather: { temp: 28, humidity: 40, condition: 'Sunny', windSpeed: 10 }
  },
  vca: {
    team1: 'India', team2: 'Australia', team1Short: 'IND', team2Short: 'AUS',
    format: 'Test', status: 'live', innings: 2, overs: '65.2',
    score: { team1: '250', team2: '180/7' }, target: null, runRate: 2.76, requiredRate: null,
    lastEvent: 'WICKET! Ashwin strikes again.', prediction: 'IND dominant',
    nextEvent: { type: 'drinks_break', inOvers: 3, inMinutes: 15 },
    weather: { temp: 34, humidity: 35, condition: 'Hot', windSpeed: 6 }
  },
  greenpark: {
    team1: 'Uttar Pradesh', team2: 'Delhi', team1Short: 'UP', team2Short: 'DEL',
    format: 'T20 (SMAT)', status: 'live', innings: 1, overs: '16.0',
    score: { team1: '140/4', team2: '-' }, target: null, runRate: 8.75, requiredRate: null,
    lastEvent: 'Rinku Singh hits a massive SIX!', prediction: 'UP targeting 180+',
    nextEvent: { type: 'innings_break', inOvers: 4, inMinutes: 18 },
    weather: { temp: 33, humidity: 65, condition: 'Humid', windSpeed: 4 }
  },
  sca: {
    team1: 'Saurashtra', team2: 'Bengal', team1Short: 'SAU', team2Short: 'BEN',
    format: 'Ranji Final', status: 'live', innings: 4, overs: '22.0',
    score: { team1: '65/2', team2: '200 & 150' }, target: 182, runRate: 2.95, requiredRate: null,
    lastEvent: 'Pujara driving through covers for four.', prediction: 'SAU favored',
    nextEvent: { type: 'lunch_break', inOvers: 8, inMinutes: 40 },
    weather: { temp: 36, humidity: 30, condition: 'Hot and Dry', windSpeed: 14 }
  },
  acavdca: {
    team1: 'India', team2: 'South Africa', team1Short: 'IND', team2Short: 'SA',
    format: 'T20I', status: 'live', innings: 2, overs: '14.0',
    score: { team1: '180/5', team2: '120/4' }, target: 181, runRate: 8.57, requiredRate: 10.16,
    lastEvent: 'Miller boundary straight down the ground.', prediction: 'Tense finish expected',
    nextEvent: { type: 'strategic_timeout', inOvers: 2, inMinutes: 10 },
    weather: { temp: 30, humidity: 80, condition: 'Humid Coastal', windSpeed: 18 }
  },
  jsca: {
    team1: 'India', team2: 'New Zealand', team1Short: 'IND', team2Short: 'NZ',
    format: 'T20I', status: 'live', innings: 1, overs: '10.0',
    score: { team1: '85/2', team2: '-' }, target: null, runRate: 8.50, requiredRate: null,
    lastEvent: 'Suryakumar scoops for four!', prediction: 'IND targeting 180+',
    nextEvent: { type: 'strategic_timeout', inOvers: 4, inMinutes: 15 },
    weather: { temp: 31, humidity: 50, condition: 'Clear', windSpeed: 7 }
  },
  barsapara: {
    team1: 'Rajasthan Royals', team2: 'Punjab Kings', team1Short: 'RR', team2Short: 'PBKS',
    format: 'T20 (IPL)', status: 'live', innings: 2, overs: '5.0',
    score: { team1: '190/4', team2: '45/1' }, target: 191, runRate: 9.00, requiredRate: 9.73,
    lastEvent: 'Solid start in the powerplay for PBKS.', prediction: 'Even contest',
    nextEvent: { type: 'powerplay_end', inOvers: 1, inMinutes: 5 },
    weather: { temp: 29, humidity: 75, condition: 'Pleasant', windSpeed: 5 }
  },
  greenfield: {
    team1: 'India', team2: 'Sri Lanka', team1Short: 'IND', team2Short: 'SL',
    format: 'ODI', status: 'live', innings: 1, overs: '45.0',
    score: { team1: '320/2', team2: '-' }, target: null, runRate: 7.11, requiredRate: null,
    lastEvent: 'Back to back sixes! Total carnage.', prediction: 'IND eyeing 380+',
    nextEvent: { type: 'innings_break', inOvers: 5, inMinutes: 25 },
    weather: { temp: 31, humidity: 85, condition: 'Very Humid', windSpeed: 10 }
  },
  hpca: {
    team1: 'Punjab Kings', team2: 'Delhi Capitals', team1Short: 'PBKS', team2Short: 'DC',
    format: 'T20 (IPL)', status: 'live', innings: 2, overs: '19.0',
    score: { team1: '175/7', team2: '160/6' }, target: 176, runRate: 8.42, requiredRate: 16.00,
    lastEvent: 'WICKET! Curran strikes a crucial blow.', prediction: 'PBKS highly favored',
    nextEvent: { type: 'match_end', inOvers: 1, inMinutes: 6 },
    weather: { temp: 18, humidity: 55, condition: 'Cool', windSpeed: 15 }
  },
  barabati: {
    team1: 'India', team2: 'West Indies', team1Short: 'IND', team2Short: 'WI',
    format: 'ODI', status: 'live', innings: 2, overs: '40.0',
    score: { team1: '315/5', team2: '280/6' }, target: 316, runRate: 7.00, requiredRate: 3.60,
    lastEvent: 'Easy singles, WI coasting to victory.', prediction: 'WI highly favored',
    nextEvent: { type: 'match_end', inOvers: 5, inMinutes: 20 },
    weather: { temp: 32, humidity: 70, condition: 'Warm', windSpeed: 8 }
  },
  raipur: {
    team1: 'India Legends', team2: 'Sri Lanka Legends', team1Short: 'IND-L', team2Short: 'SL-L',
    format: 'T20 (RSWS)', status: 'live', innings: 1, overs: '14.0',
    score: { team1: '130/2', team2: '-' }, target: null, runRate: 9.28, requiredRate: null,
    lastEvent: 'Tendulkar cover drive for four!', prediction: 'IND-L targeting 190+',
    nextEvent: { type: 'strategic_timeout', inOvers: 2, inMinutes: 10 },
    weather: { temp: 34, humidity: 40, condition: 'Clear', windSpeed: 11 }
  }
};

/**
 * Generate simulated real-time crowd data
 * @param {string} venueId - Venue identifier
 * @returns {Object} Real-time crowd state
 */
function generateCrowdData(venueId) {
  const venue = VENUES[venueId];
  if (!venue) return null;

  const match = MATCHES[venueId];
  const isSecondInnings = match && match.innings === 2;
  const oversLeft = match ? (20 - parseFloat(match.overs)) : 10;
  const isTense = match && match.requiredRate && match.requiredRate > 10;
  const isEndGame = oversLeft < 4;

  // Base crowd fills — higher in 2nd innings big matches
  const baseFill = 0.7 + Math.random() * 0.25;

  const sections = venue.sections.map(section => {
    let density = baseFill + (Math.random() * 0.2 - 0.1);
    // Tense games: higher density (nobody leaves)
    if (isTense) density = Math.min(density + 0.1, 0.98);
    // End game: some start leaving if result obvious
    if (isEndGame && !isTense) density = Math.max(density - 0.15, 0.3);

    density = Math.max(0.2, Math.min(0.98, density));

    return {
      ...section,
      density: Math.round(density * 100),
      currentCount: Math.round(section.capacity * density),
      temperature: match ? match.weather.temp + (Math.random() * 4 - 2) : 30,
      status: density > 0.9 ? 'critical' : density > 0.75 ? 'crowded' : density > 0.5 ? 'moderate' : 'comfortable'
    };
  });

  const gates = venue.gates.map(gate => {
    const baseWait = isSecondInnings ? 2 + Math.random() * 5 : 5 + Math.random() * 20;
    return {
      ...gate,
      waitTime: Math.round(baseWait),
      queueLength: Math.round(baseWait * 8),
      status: baseWait > 15 ? 'critical' : baseWait > 8 ? 'busy' : 'normal'
    };
  });

  const foodStalls = venue.foodStalls.map(stall => {
    // Food wait spikes near breaks
    const nearBreak = match && match.nextEvent && match.nextEvent.inMinutes < 5;
    const baseWait = nearBreak ? 8 + Math.random() * 15 : 2 + Math.random() * 10;
    return {
      ...stall,
      waitTime: Math.round(baseWait),
      tokensActive: Math.round(baseWait * 2),
      status: baseWait > 15 ? 'packed' : baseWait > 8 ? 'busy' : 'available'
    };
  });

  const restrooms = venue.restrooms.map(rr => {
    const baseWait = 1 + Math.random() * 12;
    return {
      ...rr,
      waitTime: Math.round(baseWait),
      status: baseWait > 10 ? 'packed' : baseWait > 5 ? 'busy' : 'available'
    };
  });

  const totalCapacity = venue.capacity;
  const totalCurrent = sections.reduce((sum, s) => sum + s.currentCount, 0);
  const overallDensity = Math.round((totalCurrent / totalCapacity) * 100);

  return {
    venueId,
    timestamp: new Date().toISOString(),
    overall: {
      capacity: totalCapacity,
      current: totalCurrent,
      density: overallDensity,
      status: overallDensity > 90 ? 'critical' : overallDensity > 75 ? 'high' : overallDensity > 50 ? 'moderate' : 'low'
    },
    sections,
    gates,
    foodStalls,
    restrooms,
    medical: venue.medical,
    match: match || null,
    weather: match ? match.weather : { temp: 30, humidity: 60, condition: 'Clear', windSpeed: 10 }
  };
}

/**
 * Generate AI-ready context string for Gemini
 * @param {Object} crowdData - Current crowd data
 * @returns {string} Context for AI prompt
 */
function generateAIContext(crowdData) {
  const venue = VENUES[crowdData.venueId];
  const match = crowdData.match;
  
  let context = `CURRENT VENUE: ${venue.name}, ${venue.city}\n`;
  context += `CAPACITY: ${venue.capacity} | CURRENT ATTENDANCE: ${crowdData.overall.current} (${crowdData.overall.density}%)\n`;
  
  if (match) {
    context += `\nMATCH: ${match.team1} vs ${match.team2} (${match.format})\n`;
    context += `SCORE: ${match.team1Short} ${match.score.team1}`;
    if (match.score.team2 !== '-') context += ` | ${match.team2Short} ${match.score.team2}`;
    context += `\nOVERS: ${match.overs} | RUN RATE: ${match.runRate}`;
    if (match.requiredRate) context += ` | REQUIRED RATE: ${match.requiredRate}`;
    context += `\nLAST EVENT: ${match.lastEvent}\n`;
    context += `NEXT EVENT: ${match.nextEvent.type} in ~${match.nextEvent.inMinutes} min\n`;
  }
  
  context += `\nWEATHER: ${crowdData.weather.temp}°C, ${crowdData.weather.condition}, Humidity ${crowdData.weather.humidity}%\n`;
  
  context += `\nSECTION DENSITY:\n`;
  crowdData.sections.forEach(s => {
    context += `  ${s.name}: ${s.density}% (${s.status}) | Temp: ${Math.round(s.temperature)}°C\n`;
  });
  
  context += `\nGATE WAIT TIMES:\n`;
  crowdData.gates.forEach(g => {
    context += `  ${g.name} (${g.direction}): ${g.waitTime} min wait\n`;
  });
  
  context += `\nFOOD STALL WAIT TIMES:\n`;
  crowdData.foodStalls.forEach(f => {
    context += `  ${f.name} (Section ${f.section}): ${f.waitTime} min | ${f.status}\n`;
  });

  context += `\nRESTROOM WAIT TIMES:\n`;
  crowdData.restrooms.forEach(r => {
    context += `  Section ${r.section}: ${r.waitTime} min | ${r.status}${r.accessible ? ' | ♿ Accessible' : ''}\n`;
  });

  return context;
}
