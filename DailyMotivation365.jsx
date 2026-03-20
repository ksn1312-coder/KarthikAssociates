import { useState, useEffect, useRef } from "react";

const quotes = [
  // January - NEW BEGINNINGS
  { text: "Every sunrise is an invitation to brighten someone's day.", author: "Og Mandino", theme: "New Beginnings" },
  { text: "The beginning is always today.", author: "Mary Shelley", theme: "New Beginnings" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", theme: "New Beginnings" },
  { text: "Small steps every day lead to giant leaps over time.", author: "Unknown", theme: "Progress" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", theme: "Action" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", theme: "Action" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", theme: "Belief" },
  { text: "New year, new chapter — you are the author.", author: "Unknown", theme: "New Beginnings" },
  { text: "Your potential is limitless. Begin today.", author: "Unknown", theme: "Potential" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", theme: "Dreams" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James", theme: "Action" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", theme: "Resilience" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis", theme: "Resilience" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", theme: "Dreams" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", theme: "Persistence" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", theme: "Persistence" },
  { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman", theme: "Optimism" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", theme: "Passion" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", theme: "Purpose" },
  { text: "The mind is everything. What you think, you become.", author: "Buddha", theme: "Mindset" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", theme: "Presence" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", theme: "Opportunity" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", theme: "Resilience" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", theme: "Action" },
  { text: "An unexamined life is not worth living.", author: "Socrates", theme: "Reflection" },
  { text: "Spread love everywhere you go.", author: "Mother Teresa", theme: "Kindness" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", theme: "Resilience" },
  { text: "Always remember that you are absolutely unique.", author: "Margaret Mead", theme: "Identity" },
  { text: "Don't judge each day by the harvest you reap but by the seeds that you plant.", author: "Robert Louis Stevenson", theme: "Patience" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi", theme: "Action" },
  { text: "Tell me, what is it you plan to do with your one wild and precious life?", author: "Mary Oliver", theme: "Purpose" },

  // February - LOVE & CONNECTION
  { text: "You yourself, as much as anybody in the universe, deserve your love and affection.", author: "Buddha", theme: "Self-Love" },
  { text: "The best and most beautiful things cannot be seen or even touched — they must be felt.", author: "Helen Keller", theme: "Love" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", theme: "Love" },
  { text: "We are most alive when we are in love.", author: "John Updike", theme: "Love" },
  { text: "The giving of love is an education in itself.", author: "Eleanor Roosevelt", theme: "Love" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi", theme: "Love" },
  { text: "One of the greatest titles in the world is parent.", author: "Jim DeMint", theme: "Family" },
  { text: "Friendship is the golden thread that ties the heart of all the world.", author: "John Evelyn", theme: "Friendship" },
  { text: "A real friend is one who walks in when the rest of the world walks out.", author: "Walter Winchell", theme: "Friendship" },
  { text: "Connection is why we're here.", author: "Brené Brown", theme: "Connection" },
  { text: "In family life, love is the oil that eases friction.", author: "Friedrich Nietzsche", theme: "Family" },
  { text: "No act of kindness, no matter how small, is ever wasted.", author: "Aesop", theme: "Kindness" },
  { text: "Be kind whenever possible. It is always possible.", author: "Dalai Lama", theme: "Kindness" },
  { text: "Too often we underestimate the power of a touch, a smile, a kind word.", author: "Leo Buscaglia", theme: "Kindness" },
  { text: "We make a living by what we get. We make a life by what we give.", author: "Winston Churchill", theme: "Generosity" },
  { text: "Vulnerability is the birthplace of connection.", author: "Brené Brown", theme: "Connection" },
  { text: "Let yourself be seen.", author: "Brené Brown", theme: "Authenticity" },
  { text: "The most precious gift we can offer anyone is our attention.", author: "Thich Nhat Hanh", theme: "Presence" },
  { text: "Love is not something we give or get; it is something we nurture and grow.", author: "Brené Brown", theme: "Love" },
  { text: "To plant a garden is to believe in tomorrow.", author: "Audrey Hepburn", theme: "Hope" },
  { text: "What we have once enjoyed we can never lose. All that we love deeply becomes part of us.", author: "Helen Keller", theme: "Gratitude" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi", theme: "Change" },
  { text: "In every community, there is work to be done.", author: "Marian Wright Edelman", theme: "Community" },
  { text: "Alone we can do so little; together we can do so much.", author: "Helen Keller", theme: "Teamwork" },
  { text: "Coming together is a beginning; keeping together is progress; working together is success.", author: "Henry Ford", theme: "Teamwork" },
  { text: "The strength of the team is each individual member. The strength of each member is the team.", author: "Phil Jackson", theme: "Teamwork" },
  { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb", theme: "Teamwork" },
  { text: "Talent wins games, but teamwork and intelligence win championships.", author: "Michael Jordan", theme: "Teamwork" },

  // March - GROWTH
  { text: "Growth is never by mere chance; it is the result of forces working together.", author: "James Cash Penney", theme: "Growth" },
  { text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", theme: "Growth" },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", theme: "Growth" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", theme: "Inner Strength" },
  { text: "Do the difficult things while they are easy.", author: "Lao Tzu", theme: "Action" },
  { text: "The secret of change is to focus all your energy on building the new.", author: "Socrates", theme: "Change" },
  { text: "We cannot become what we want by remaining what we are.", author: "Max Depree", theme: "Change" },
  { text: "Every moment of one's existence, one is growing into more or retreating into less.", author: "Norman Mailer", theme: "Growth" },
  { text: "If you want something you've never had, you must be willing to do something you've never done.", author: "Thomas Jefferson", theme: "Courage" },
  { text: "Comfort zones are where dreams go to die.", author: "Unknown", theme: "Courage" },
  { text: "A comfort zone is a beautiful place, but nothing ever grows there.", author: "Unknown", theme: "Growth" },
  { text: "Challenges are what make life interesting. Overcoming them is what makes life meaningful.", author: "Joshua J. Marine", theme: "Challenges" },
  { text: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell", theme: "Courage" },
  { text: "Your life does not get better by chance. It gets better by change.", author: "Jim Rohn", theme: "Change" },
  { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela", theme: "Learning" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", theme: "Learning" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss", theme: "Learning" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", theme: "Learning" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King", theme: "Learning" },
  { text: "Develop a passion for learning. If you do, you will never cease to grow.", author: "Anthony J. D'Angelo", theme: "Learning" },
  { text: "Knowledge is power. Information is liberating.", author: "Kofi Annan", theme: "Knowledge" },
  { text: "Once you stop learning, you start dying.", author: "Albert Einstein", theme: "Learning" },
  { text: "Leaders are readers.", author: "Harry S. Truman", theme: "Leadership" },
  { text: "Not all readers are leaders, but all leaders are readers.", author: "Harry S. Truman", theme: "Leadership" },
  { text: "Leadership is not about being in charge. It is about taking care of those in your charge.", author: "Simon Sinek", theme: "Leadership" },
  { text: "A leader is one who knows the way, goes the way, and shows the way.", author: "John C. Maxwell", theme: "Leadership" },
  { text: "The greatest leader is not necessarily the one who does the greatest things. He is the one that gets the people to do the greatest things.", author: "Ronald Reagan", theme: "Leadership" },
  { text: "Be the leader you wish you had.", author: "Simon Sinek", theme: "Leadership" },
  { text: "Management is doing things right; leadership is doing the right things.", author: "Peter Drucker", theme: "Leadership" },
  { text: "Lead from the back — and let others believe they are in front.", author: "Nelson Mandela", theme: "Leadership" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", theme: "Innovation" },

  // April - RESILIENCE
  { text: "Fall seven times, stand up eight.", author: "Japanese Proverb", theme: "Resilience" },
  { text: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling", theme: "Resilience" },
  { text: "Out of difficulties grow miracles.", author: "Jean de la Bruyere", theme: "Resilience" },
  { text: "The human capacity for burden is like bamboo — far more flexible than you'd ever believe at first glance.", author: "Jodi Picoult", theme: "Resilience" },
  { text: "The gem cannot be polished without friction, nor man perfected without trials.", author: "Chinese Proverb", theme: "Resilience" },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", theme: "Purpose" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey", theme: "Resilience" },
  { text: "What doesn't kill us makes us stronger.", author: "Friedrich Nietzsche", theme: "Resilience" },
  { text: "The world breaks everyone, and afterward, some are strong at the broken places.", author: "Ernest Hemingway", theme: "Resilience" },
  { text: "Courage doesn't always roar. Sometimes it's the quiet voice saying 'I will try again tomorrow'.", author: "Mary Anne Radmacher", theme: "Courage" },
  { text: "You may have to fight a battle more than once to win it.", author: "Margaret Thatcher", theme: "Persistence" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius", theme: "Resilience" },
  { text: "I can be changed by what happens to me. But I refuse to be reduced by it.", author: "Maya Angelou", theme: "Resilience" },
  { text: "Resilience is accepting your new reality, even if it's less good than the one you had before.", author: "Elizabeth Edwards", theme: "Resilience" },
  { text: "The only way through is through.", author: "Robert Frost", theme: "Persistence" },
  { text: "Pain is temporary. Quitting lasts forever.", author: "Lance Armstrong", theme: "Persistence" },
  { text: "Strength does not come from physical capacity. It comes from an indomitable will.", author: "Mahatma Gandhi", theme: "Strength" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", theme: "Persistence" },
  { text: "Nothing is impossible. The word itself says 'I'm possible'!", author: "Audrey Hepburn", theme: "Possibility" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", theme: "Opportunity" },
  { text: "Tough times never last, but tough people do.", author: "Robert H. Schuller", theme: "Resilience" },
  { text: "The darkest hour has only sixty minutes.", author: "Morris Mandel", theme: "Hope" },
  { text: "Every adversity carries the seed of an equal or greater benefit.", author: "Napoleon Hill", theme: "Resilience" },
  { text: "What we achieve inwardly will change outer reality.", author: "Plutarch", theme: "Inner Strength" },
  { text: "Obstacles are those frightful things you see when you take your eyes off your goal.", author: "Henry Ford", theme: "Focus" },
  { text: "Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened.", author: "Helen Keller", theme: "Character" },
  { text: "The harder the conflict, the greater the triumph.", author: "George Washington", theme: "Triumph" },
  { text: "A smooth sea never made a skilled sailor.", author: "Franklin D. Roosevelt", theme: "Resilience" },
  { text: "Stars can't shine without darkness.", author: "Unknown", theme: "Hope" },
  { text: "Every storm runs out of rain.", author: "Maya Angelou", theme: "Hope" },

  // May - PURPOSE
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain", theme: "Purpose" },
  { text: "He who has a why to live for can bear almost any how.", author: "Friedrich Nietzsche", theme: "Purpose" },
  { text: "Your work is to discover your work and then with all your heart to give yourself to it.", author: "Buddha", theme: "Purpose" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", theme: "Happiness" },
  { text: "Don't ask what the world needs. Ask what makes you come alive, and go do it.", author: "Howard Thurman", theme: "Purpose" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", theme: "Happiness" },
  { text: "The most common form of despair is not being who you are.", author: "Søren Kierkegaard", theme: "Authenticity" },
  { text: "To thine own self be true.", author: "William Shakespeare", theme: "Authenticity" },
  { text: "Authenticity is the daily practice of letting go of who we think we should be.", author: "Brené Brown", theme: "Authenticity" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", theme: "Authenticity" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson", theme: "Authenticity" },
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung", theme: "Identity" },
  { text: "Know thyself.", author: "Socrates", theme: "Self-Awareness" },
  { text: "Until you make the unconscious conscious, it will direct your life and you will call it fate.", author: "Carl Jung", theme: "Self-Awareness" },
  { text: "The unexamined life is not worth living.", author: "Socrates", theme: "Reflection" },
  { text: "In order to carry a positive action we must develop here a positive vision.", author: "Dalai Lama", theme: "Vision" },
  { text: "Vision without action is merely a dream. Action without vision just passes time.", author: "Joel Barker", theme: "Vision" },
  { text: "Create the highest, grandest vision possible for your life, because you become what you believe.", author: "Oprah Winfrey", theme: "Vision" },
  { text: "A goal without a plan is just a wish.", author: "Antoine de Saint-Exupéry", theme: "Planning" },
  { text: "Goals are dreams with deadlines.", author: "Diana Scharf", theme: "Goals" },
  { text: "Setting goals is the first step in turning the invisible into the visible.", author: "Tony Robbins", theme: "Goals" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", theme: "Courage" },
  { text: "The greatest mistake you can make in life is to be continually fearing you will make one.", author: "Elbert Hubbard", theme: "Courage" },
  { text: "Imperfection is beauty, madness is genius and it's better to be absolutely ridiculous than absolutely boring.", author: "Marilyn Monroe", theme: "Authenticity" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg", theme: "Action" },
  { text: "Have no fear of perfection — you'll never reach it.", author: "Salvador Dalí", theme: "Perfection" },
  { text: "Striving for excellence motivates you; striving for perfection is demoralizing.", author: "Harriet Braiker", theme: "Excellence" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", theme: "Excellence" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", theme: "Consistency" },
  { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown", theme: "Consistency" },
  { text: "Motivation gets you started. Habit keeps you going.", author: "Jim Ryun", theme: "Consistency" },

  // June - COURAGE
  { text: "Courage is not the absence of fear, but the triumph over it.", author: "Nelson Mandela", theme: "Courage" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", theme: "Courage" },
  { text: "You gain strength, courage and confidence by every experience in which you really stop to look fear in the face.", author: "Eleanor Roosevelt", theme: "Courage" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", theme: "Courage" },
  { text: "It takes courage to grow up and become who you really are.", author: "E.E. Cummings", theme: "Courage" },
  { text: "Inaction breeds doubt and fear. Action breeds confidence and courage.", author: "Dale Carnegie", theme: "Action" },
  { text: "Scared is what you're feeling. Brave is what you're doing.", author: "Emma Donoghue", theme: "Courage" },
  { text: "The most courageous act is still to think for yourself. Aloud.", author: "Coco Chanel", theme: "Courage" },
  { text: "Life shrinks or expands in proportion to one's courage.", author: "Anaïs Nin", theme: "Courage" },
  { text: "Only those who dare to fail greatly can ever achieve greatly.", author: "Robert F. Kennedy", theme: "Courage" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", theme: "Courage" },
  { text: "He who is not courageous enough to take risks will accomplish nothing in life.", author: "Muhammad Ali", theme: "Courage" },
  { text: "Twenty years from now you will be more disappointed by the things you didn't do than the ones you did.", author: "Mark Twain", theme: "Regret" },
  { text: "Jump, and you will find out how to unfold your wings as you fall.", author: "Ray Bradbury", theme: "Courage" },
  { text: "A ship in harbor is safe, but that is not what ships are for.", author: "John A. Shedd", theme: "Courage" },
  { text: "Leap and the net will appear.", author: "John Burroughs", theme: "Faith" },
  { text: "Risk more than others think is safe.", author: "Howard Schultz", theme: "Risk" },
  { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg", theme: "Risk" },
  { text: "Security is mostly a superstition. Life is either a daring adventure or nothing.", author: "Helen Keller", theme: "Adventure" },
  { text: "Carpe diem. Seize the day, boys. Make your lives extraordinary.", author: "Robin Williams (Dead Poets Society)", theme: "Seizing the Day" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca", theme: "Preparation" },
  { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn", theme: "Work Ethic" },
  { text: "There is no substitute for hard work.", author: "Thomas Edison", theme: "Work Ethic" },
  { text: "Without labor, nothing prospers.", author: "Sophocles", theme: "Work Ethic" },
  { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon", theme: "Work Ethic" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", theme: "Work Ethic" },
  { text: "Great things are not done by impulse, but by a series of small things brought together.", author: "Vincent Van Gogh", theme: "Consistency" },
  { text: "I'm a greater believer in luck, and I find the harder I work, the more I have of it.", author: "Thomas Jefferson", theme: "Work Ethic" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser", theme: "Opportunity" },
  { text: "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.", author: "Winston Churchill", theme: "Optimism" },

  // July - MINDFULNESS & PEACE
  { text: "The present moment is the only moment available to us, and it is the door to all moments.", author: "Thich Nhat Hanh", theme: "Mindfulness" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", theme: "Peace" },
  { text: "Be here now.", author: "Ram Dass", theme: "Presence" },
  { text: "Wherever you are, be all there.", author: "Jim Elliot", theme: "Presence" },
  { text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", author: "Bill Keane", theme: "Present" },
  { text: "The quieter you become, the more you are able to hear.", author: "Rumi", theme: "Silence" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra", theme: "Stillness" },
  { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", theme: "Rest" },
  { text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston", theme: "Rest" },
  { text: "Tension is who you think you should be. Relaxation is who you are.", author: "Chinese Proverb", theme: "Authenticity" },
  { text: "Breathe. You are exactly where you need to be.", author: "Unknown", theme: "Acceptance" },
  { text: "Let go of what you can't control. Focus on what you can.", author: "Unknown", theme: "Control" },
  { text: "Grant me the serenity to accept the things I cannot change, courage to change what I can, and wisdom to know the difference.", author: "Reinhold Niebuhr", theme: "Serenity" },
  { text: "Worry does not empty tomorrow of its sorrow, it empties today of its strength.", author: "Corrie Ten Boom", theme: "Worry" },
  { text: "Stop worrying about what you have to lose and start focusing on what you have to gain.", author: "Unknown", theme: "Focus" },
  { text: "The mind that is anxious about the future is miserable.", author: "Seneca", theme: "Presence" },
  { text: "You can't calm the storm, so stop trying. What you can do is calm yourself. The storm will pass.", author: "Timber Hawkeye", theme: "Acceptance" },
  { text: "Nothing can disturb your peace of mind unless you allow it to.", author: "Roy T. Bennett", theme: "Peace" },
  { text: "Inner peace begins the moment you choose not to allow another person or event to control your emotions.", author: "Pema Chödrön", theme: "Peace" },
  { text: "You have the power to heal your life, and you need to know that.", author: "Louise Hay", theme: "Healing" },
  { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos", theme: "Healing" },
  { text: "Self-care is not selfish. You cannot pour from an empty cup.", author: "Unknown", theme: "Self-Care" },
  { text: "To love oneself is the beginning of a lifelong romance.", author: "Oscar Wilde", theme: "Self-Love" },
  { text: "Talk to yourself like you would to someone you love.", author: "Brené Brown", theme: "Self-Love" },
  { text: "You are enough just as you are.", author: "Meghan Markle", theme: "Self-Worth" },
  { text: "Owning our story and loving ourselves through that process is the bravest thing we'll ever do.", author: "Brené Brown", theme: "Self-Love" },
  { text: "Love yourself first and everything else falls into line.", author: "Lucille Ball", theme: "Self-Love" },
  { text: "You can't pour from an empty vessel.", author: "Eleanor Brown", theme: "Self-Care" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", theme: "Health" },
  { text: "A healthy outside starts from the inside.", author: "Robert Urich", theme: "Health" },
  { text: "Your body hears everything your mind says.", author: "Naomi Judd", theme: "Mind-Body" },

  // August - ACHIEVEMENT
  { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr.", theme: "Excellence" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", theme: "Persistence" },
  { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", theme: "Success" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer", theme: "Success" },
  { text: "Try not to become a man of success. Rather become a man of value.", author: "Albert Einstein", theme: "Value" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", theme: "Work Ethic" },
  { text: "Definiteness of purpose is the starting point of all achievement.", author: "W. Clement Stone", theme: "Purpose" },
  { text: "Whatever the mind of man can conceive and believe, it can achieve.", author: "Napoleon Hill", theme: "Belief" },
  { text: "You have brains in your head. You have feet in your shoes. You can steer yourself in any direction you choose.", author: "Dr. Seuss", theme: "Self-Determination" },
  { text: "Winning isn't everything, but wanting to win is.", author: "Vince Lombardi", theme: "Achievement" },
  { text: "I attribute my success to this: I never gave or took any excuse.", author: "Florence Nightingale", theme: "Accountability" },
  { text: "Ninety percent of all those who fail are not actually defeated. They simply quit.", author: "Paul J. Meyer", theme: "Persistence" },
  { text: "You've got to get up every morning with determination if you're going to go to bed with satisfaction.", author: "George Lorimer", theme: "Determination" },
  { text: "For every reason it's not possible, there are hundreds of people who have faced the same circumstances and succeeded.", author: "Jack Canfield", theme: "Possibility" },
  { text: "Things work out best for those who make the best of how things work out.", author: "John Wooden", theme: "Attitude" },
  { text: "Let no feeling of discouragement prey upon you, and in the end you are sure to succeed.", author: "Abraham Lincoln", theme: "Persistence" },
  { text: "How long should you try? Until.", author: "Jim Rohn", theme: "Persistence" },
  { text: "Look up at the stars and not down at your feet.", author: "Stephen Hawking", theme: "Aspiration" },
  { text: "Be so good they can't ignore you.", author: "Steve Martin", theme: "Excellence" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey", theme: "Accountability" },
  { text: "People often say that motivation doesn't last. Well, neither does bathing — that's why we recommend it daily.", author: "Zig Ziglar", theme: "Motivation" },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou", theme: "Life" },
  { text: "If you want to lift yourself up, lift up someone else.", author: "Booker T. Washington", theme: "Service" },
  { text: "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left.", author: "Erma Bombeck", theme: "Purpose" },
  { text: "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.", author: "Booker T. Washington", theme: "Trust" },
  { text: "A man's worth is no greater than his ambitions.", author: "Marcus Aurelius", theme: "Ambition" },
  { text: "Ambition is the path to success. Persistence is the vehicle you arrive in.", author: "Bill Bradley", theme: "Ambition" },
  { text: "All our dreams can come true, if we have the courage to pursue them.", author: "Walt Disney", theme: "Dreams" },
  { text: "The surest way not to fail is to determine to succeed.", author: "Richard B. Sheridan", theme: "Determination" },
  { text: "Give me a stock clerk with a goal and I'll give you a man who will make history.", author: "J.C. Penney", theme: "Goals" },
  { text: "If you can dream it, you can do it.", author: "Walt Disney", theme: "Dreams" },

  // September - LEARNING & KNOWLEDGE
  { text: "Education is not the filling of a pail, but the lighting of a fire.", author: "W.B. Yeats", theme: "Education" },
  { text: "Real learning comes about when the competitive spirit has ceased.", author: "J. Krishnamurti", theme: "Learning" },
  { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", author: "Albert Einstein", theme: "Wisdom" },
  { text: "The measure of intelligence is the ability to change.", author: "Albert Einstein", theme: "Adaptability" },
  { text: "Anyone who stops learning is old, whether at twenty or eighty.", author: "Henry Ford", theme: "Learning" },
  { text: "In learning you will teach, and in teaching you will learn.", author: "Phil Collins", theme: "Teaching" },
  { text: "The wisest mind has something yet to learn.", author: "George Santayana", theme: "Wisdom" },
  { text: "By three methods we may learn wisdom: by reflection, by imitation, and by experience.", author: "Confucius", theme: "Wisdom" },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", theme: "Wisdom" },
  { text: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix", theme: "Wisdom" },
  { text: "Wisdom is the reward you get for a lifetime of listening when you'd have preferred to talk.", author: "Doug Larson", theme: "Wisdom" },
  { text: "Science is organized knowledge. Wisdom is organized life.", author: "Immanuel Kant", theme: "Wisdom" },
  { text: "The mind is not a vessel to be filled, but a fire to be kindled.", author: "Plutarch", theme: "Education" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin", theme: "Learning" },
  { text: "Learning is not attained by chance; it must be sought for with ardor and attended to with diligence.", author: "Abigail Adams", theme: "Learning" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes", theme: "Mastery" },
  { text: "It takes 10,000 hours to become an expert at anything.", author: "Malcolm Gladwell", theme: "Mastery" },
  { text: "A jack of all trades is a master of none, but oftentimes better than a master of one.", author: "Unknown", theme: "Versatility" },
  { text: "Specialization is for insects.", author: "Robert A. Heinlein", theme: "Versatility" },
  { text: "Curiosity is the engine of achievement.", author: "Ken Robinson", theme: "Curiosity" },
  { text: "The important thing is not to stop questioning. Curiosity has its own reason for existing.", author: "Albert Einstein", theme: "Curiosity" },
  { text: "Intellectual growth should commence at birth and cease only at death.", author: "Albert Einstein", theme: "Learning" },
  { text: "The more I learn, the more I realize how much I don't know.", author: "Albert Einstein", theme: "Humility" },
  { text: "Humility is not thinking less of yourself, but thinking of yourself less.", author: "C.S. Lewis", theme: "Humility" },
  { text: "Confidence is silent. Insecurities are loud.", author: "Unknown", theme: "Confidence" },
  { text: "Confidence comes not from always being right but from not fearing to be wrong.", author: "Peter T. Mcintyre", theme: "Confidence" },
  { text: "With confidence, you have won before you have started.", author: "Marcus Garvey", theme: "Confidence" },
  { text: "Optimism is the faith that leads to achievement.", author: "Helen Keller", theme: "Optimism" },
  { text: "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.", author: "Winston Churchill", theme: "Optimism" },
  { text: "Keep your face to the sunshine and you cannot see a shadow.", author: "Helen Keller", theme: "Optimism" },

  // October - FOCUS & DISCIPLINE
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee", theme: "Focus" },
  { text: "Where focus goes, energy flows.", author: "Tony Robbins", theme: "Focus" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", theme: "Discipline" },
  { text: "Without self-discipline, success is impossible, period.", author: "Lou Holtz", theme: "Discipline" },
  { text: "We must all suffer one of two things: the pain of discipline or the pain of regret.", author: "Jim Rohn", theme: "Discipline" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Augusta F. Kantra", theme: "Discipline" },
  { text: "The will to win, the desire to succeed, the urge to reach your full potential — these are the keys that will unlock the door to personal excellence.", author: "Confucius", theme: "Excellence" },
  { text: "Do what you have to do until you can do what you want to do.", author: "Oprah Winfrey", theme: "Discipline" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown", theme: "Self-Motivation" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown", theme: "Determination" },
  { text: "The key is not the will to win. Everybody has that. It is the will to prepare to win that is important.", author: "Bobby Knight", theme: "Preparation" },
  { text: "Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work.", author: "Stephen King", theme: "Work Ethic" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke", theme: "Work Ethic" },
  { text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.", author: "Marie Forleo", theme: "Consistency" },
  { text: "Rome wasn't built in a day, but they were laying bricks every hour.", author: "John Heywood", theme: "Consistency" },
  { text: "You don't get what you wish for. You get what you work for.", author: "Unknown", theme: "Work Ethic" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson", theme: "Excellence" },
  { text: "Good things happen to those who hustle.", author: "Anaïs Nin", theme: "Work Ethic" },
  { text: "There are no shortcuts to any place worth going.", author: "Beverly Sills", theme: "Work Ethic" },
  { text: "No pain, no gain.", author: "Benjamin Franklin", theme: "Work Ethic" },
  { text: "Quality is not an act. It is a habit.", author: "Aristotle", theme: "Quality" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", theme: "Simplicity" },
  { text: "The ability to simplify means to eliminate the unnecessary so that the necessary may speak.", author: "Hans Hofmann", theme: "Simplicity" },
  { text: "Clarity is power.", author: "Tony Robbins", theme: "Clarity" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", theme: "Self-Awareness" },
  { text: "The mind is a powerful force. It can enslave us or empower us.", author: "Napoleon Hill", theme: "Mindset" },
  { text: "Your mindset is your greatest asset.", author: "Unknown", theme: "Mindset" },
  { text: "Whether you think you can or think you can't, you're right.", author: "Henry Ford", theme: "Mindset" },
  { text: "If you realized how powerful your thoughts are, you would never think a negative thought.", author: "Peace Pilgrim", theme: "Mindset" },
  { text: "What you think, you become. What you feel, you attract. What you imagine, you create.", author: "Buddha", theme: "Mindset" },
  { text: "You become what you believe.", author: "Oprah Winfrey", theme: "Belief" },

  // November - GRATITUDE & GIVING
  { text: "Gratitude turns what we have into enough.", author: "Aesop", theme: "Gratitude" },
  { text: "Be thankful for what you have; you'll end up having more.", author: "Oprah Winfrey", theme: "Gratitude" },
  { text: "Gratitude is the fairest blossom which springs from the soul.", author: "Henry Ward Beecher", theme: "Gratitude" },
  { text: "The more gratitude you show, the more reasons you'll find to be grateful.", author: "Unknown", theme: "Gratitude" },
  { text: "Count your blessings, not your troubles.", author: "Unknown", theme: "Gratitude" },
  { text: "When you are grateful, fear disappears and abundance appears.", author: "Tony Robbins", theme: "Gratitude" },
  { text: "Enough is a feast.", author: "Buddhist Proverb", theme: "Contentment" },
  { text: "Contentment is natural wealth, luxury is artificial poverty.", author: "Socrates", theme: "Contentment" },
  { text: "The secret of happiness is not in doing what one likes, but in liking what one does.", author: "James M. Barrie", theme: "Happiness" },
  { text: "Happiness is not something you postpone for the future; it is something you design for the present.", author: "Jim Rohn", theme: "Happiness" },
  { text: "The happiness of your life depends upon the quality of your thoughts.", author: "Marcus Aurelius", theme: "Mindset" },
  { text: "Happiness is a choice, not a result.", author: "Ralph Marston", theme: "Happiness" },
  { text: "Very little is needed to make a happy life; it is all within yourself.", author: "Marcus Aurelius", theme: "Happiness" },
  { text: "Joy is not in things; it is in us.", author: "Richard Wagner", theme: "Joy" },
  { text: "Find joy in the ordinary.", author: "Unknown", theme: "Joy" },
  { text: "The most wasted of all days is one without laughter.", author: "E.E. Cummings", theme: "Joy" },
  { text: "He who laughs, lasts.", author: "Mary Pettibone Poole", theme: "Joy" },
  { text: "A day without laughter is a day wasted.", author: "Charlie Chaplin", theme: "Joy" },
  { text: "It is not how much we have, but how much we enjoy, that makes happiness.", author: "Charles Spurgeon", theme: "Happiness" },
  { text: "We don't need more to be thankful for, we just need to be more thankful.", author: "Anonymous", theme: "Gratitude" },
  { text: "Give, and it will be given to you.", author: "Luke 6:38", theme: "Generosity" },
  { text: "The fragrance always stays in the hand that gives the rose.", author: "George William Curtis", theme: "Generosity" },
  { text: "You have not lived today until you have done something for someone who can never repay you.", author: "John Bunyan", theme: "Service" },
  { text: "Service to others is the rent you pay for your room here on Earth.", author: "Muhammad Ali", theme: "Service" },
  { text: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi", theme: "Service" },
  { text: "No one has ever become poor by giving.", author: "Anne Frank", theme: "Generosity" },
  { text: "Life is a gift, and it offers us the privilege, opportunity, and responsibility to give something back.", author: "Tony Robbins", theme: "Responsibility" },
  { text: "What you give, you get, tenfold.", author: "Unknown", theme: "Generosity" },
  { text: "We rise by lifting others.", author: "Robert Ingersoll", theme: "Generosity" },
  { text: "Do your little bit of good where you are; it's those little bits of good put together that overwhelm the world.", author: "Desmond Tutu", theme: "Service" },

  // December - REFLECTION & HOPE
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", theme: "Life" },
  { text: "The aim of life is to live, and to live means to be aware, joyously, drunkenly, serenely, divinely aware.", author: "Henry Miller", theme: "Life" },
  { text: "Life is short. Live passionately.", author: "Marc A. Pitman", theme: "Life" },
  { text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.", author: "Marcus Aurelius", theme: "Life" },
  { text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.", author: "James Baldwin", theme: "Change" },
  { text: "They always say time changes things, but you actually have to change them yourself.", author: "Andy Warhol", theme: "Change" },
  { text: "Change is the law of life. Those who look only to the past or present are certain to miss the future.", author: "John F. Kennedy", theme: "Change" },
  { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", theme: "Change" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", theme: "Change" },
  { text: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu", theme: "Hope" },
  { text: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson", theme: "Hope" },
  { text: "Never lose hope. Storms make people stronger and never last forever.", author: "Roy T. Bennett", theme: "Hope" },
  { text: "Hope is a waking dream.", author: "Aristotle", theme: "Hope" },
  { text: "Where there is no vision, the people perish.", author: "Proverbs 29:18", theme: "Vision" },
  { text: "The best is yet to come.", author: "Elizabeth Barrett Browning", theme: "Hope" },
  { text: "Keep looking up! I learn from the past, dream about the future and look up — there's nothing like a beautiful sky.", author: "Rachel Boston", theme: "Hope" },
  { text: "Write it on your heart that every day is the best day in the year.", author: "Ralph Waldo Emerson", theme: "Optimism" },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown", theme: "New Beginnings" },
  { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt", theme: "New Beginnings" },
  { text: "Today's accomplishments were yesterday's impossibilities.", author: "Robert H. Schuller", theme: "Progress" },
  { text: "What we can or cannot do, what we consider possible or impossible, is rarely a function of our true capability.", author: "Tony Robbins", theme: "Possibility" },
  { text: "The only limits that exist are the ones you place on yourself.", author: "Unknown", theme: "Limitless" },
  { text: "You were born with wings. Why prefer to crawl through life?", author: "Rumi", theme: "Potential" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne", theme: "Belief" },
  { text: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.", author: "Christian D. Larson", theme: "Belief" },
  { text: "Your time is now. Start where you stand and never back down.", author: "Roy T. Bennett", theme: "Action" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu", theme: "Beginning" },
  { text: "One small positive thought in the morning can change your whole day.", author: "Dalai Lama", theme: "Mindset" },
  { text: "Be a light to the world. A torch can light a thousand candles without diminishing itself.", author: "Unknown", theme: "Generosity" },
  { text: "Make each day your masterpiece.", author: "John Wooden", theme: "Excellence" },
  { text: "Go confidently in the direction of your dreams! Live the life you've imagined.", author: "Henry David Thoreau", theme: "Dreams" },
  { text: "It's a new dawn. It's a new day. It's a new life — and I'm feeling good.", author: "Nina Simone", theme: "New Beginnings" },
  { text: "Here's to the crazy ones. The misfits. The rebels. The troublemakers.", author: "Steve Jobs", theme: "Innovation" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs", theme: "Curiosity" },
  { text: "Shoot for the moon. Even if you miss, you'll land among the stars.", author: "Norman Vincent Peale", theme: "Aspiration" },
];

const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const themeColors = {
  "New Beginnings": "#10b981", "Progress": "#3b82f6", "Action": "#f59e0b", "Belief": "#8b5cf6",
  "Potential": "#ec4899", "Dreams": "#6366f1", "Resilience": "#ef4444", "Persistence": "#f97316",
  "Optimism": "#eab308", "Passion": "#e11d48", "Purpose": "#0891b2", "Mindset": "#7c3aed",
  "Presence": "#059669", "Opportunity": "#dc2626", "Reflection": "#0284c7", "Kindness": "#d97706",
  "Love": "#db2777", "Friendship": "#7c3aed", "Connection": "#0891b2", "Family": "#16a34a",
  "Courage": "#dc2626", "Growth": "#16a34a", "Learning": "#2563eb", "Leadership": "#7c3aed",
  "Focus": "#0891b2", "Discipline": "#dc2626", "Gratitude": "#d97706", "Hope": "#2563eb",
  "Excellence": "#7c3aed", "Happiness": "#eab308", "Service": "#16a34a", "Wisdom": "#7c3aed",
  "Peace": "#0891b2", "Healing": "#ec4899", "Self-Love": "#db2777", "Consistency": "#f97316",
  "Authenticity": "#059669", "Work Ethic": "#f59e0b", "Change": "#3b82f6", "Joy": "#eab308",
};

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getDateFromDayNumber(dayNum, year) {
  const date = new Date(year, 0, dayNum);
  return date;
}

export default function DailyMotivation365() {
  const today = new Date();
  const currentDayOfYear = getDayOfYear(today);
  const [selectedDay, setSelectedDay] = useState(currentDayOfYear);
  const [view, setView] = useState("daily"); // daily | calendar | browse
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("favQuotes") || "[]"); } catch { return []; }
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [streak, setStreak] = useState(0);
  const [shareMsg, setShareMsg] = useState("");
  const cardRef = useRef(null);

  const quoteIndex = ((selectedDay - 1) % 365 + 365) % 365;
  const quote = quotes[quoteIndex] || quotes[0];
  const quoteDate = getDateFromDayNumber(selectedDay, today.getFullYear());
  const isToday = selectedDay === currentDayOfYear;
  const themeColor = themeColors[quote.theme] || "#6366f1";

  useEffect(() => {
    // Simulate streak based on day
    setStreak(Math.min(currentDayOfYear, 47));
  }, [currentDayOfYear]);

  const toggleFavorite = (day) => {
    setFavorites(prev => {
      const updated = prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day];
      try { localStorage.setItem("favQuotes", JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const navigate = (dir) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedDay(d => Math.max(1, Math.min(365, d + dir)));
      setIsAnimating(false);
    }, 200);
  };

  const handleShare = () => {
    const text = `Day ${selectedDay}/365 💫\n\n"${quote.text}"\n— ${quote.author}\n\n#DailyMotivation #365Days`;
    navigator.clipboard?.writeText(text).then(() => {
      setShareMsg("Copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }).catch(() => setShareMsg("Share!"));
  };

  const progressPct = (selectedDay / 365) * 100;
  const todayProgressPct = (currentDayOfYear / 365) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f1a2e 100%)",
      fontFamily: "'Georgia', 'Palatino Linotype', serif",
      color: "#e8e0f0",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; }
        .quote-card { transition: opacity 0.2s ease, transform 0.2s ease; }
        .quote-card.animating { opacity: 0; transform: translateY(10px); }
        .btn-glow:hover { box-shadow: 0 0 20px currentColor; transform: scale(1.05); transition: all 0.2s; }
        .day-cell { transition: all 0.15s ease; cursor: pointer; }
        .day-cell:hover { transform: scale(1.15); }
        .fav-pulse { animation: pulse 0.3s ease; }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
        .nav-btn { transition: all 0.2s; border: none; }
        .nav-btn:hover { transform: scale(1.1); }
        .nav-btn:active { transform: scale(0.95); }
        .shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .tab-btn { transition: all 0.2s; cursor: pointer; border: none; }
        .theme-badge { animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {/* Header */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.5px", color: "#fff" }}>
            ✦ 365 Days of Wisdom
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase", marginTop: 2 }}>
            Daily Motivational Initiative
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            background: "linear-gradient(135deg, #f59e0b, #ec4899)",
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}>
            🔥 {streak} day streak
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            Day {currentDayOfYear}/365
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
        <div style={{
          height: "100%",
          width: `${todayProgressPct}%`,
          background: "linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)",
          transition: "width 1s ease",
        }} />
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: "flex",
        gap: 4,
        padding: "16px 24px 0",
        maxWidth: 860,
        margin: "0 auto",
      }}>
        {["daily", "calendar", "browse"].map(tab => (
          <button key={tab} className="tab-btn" onClick={() => setView(tab)} style={{
            padding: "10px 22px",
            borderRadius: "12px 12px 0 0",
            background: view === tab ? "rgba(255,255,255,0.08)" : "transparent",
            color: view === tab ? "#fff" : "rgba(255,255,255,0.4)",
            fontSize: 13,
            fontWeight: view === tab ? 600 : 400,
            borderBottom: view === tab ? `2px solid ${themeColor}` : "2px solid transparent",
            textTransform: "capitalize",
            letterSpacing: "0.5px",
          }}>
            {tab === "daily" ? "📖 Today's Quote" : tab === "calendar" ? "📅 Calendar" : "⭐ Browse All"}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 40px" }}>

        {/* DAILY VIEW */}
        {view === "daily" && (
          <div>
            <div style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "0 16px 16px 16px",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "32px",
              marginBottom: 24,
            }}>
              {/* Day counter */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 56, height: 56,
                    borderRadius: "50%",
                    border: `2px solid ${themeColor}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    fontSize: 9,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1 }}>{selectedDay}</div>
                    <div style={{ fontSize: 8 }}>of 365</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Crimson Text', serif", fontSize: 15, color: "rgba(255,255,255,0.7)" }}>
                      {quoteDate.toLocaleDateString("en-IN", { weekday: "long" })}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                      {quoteDate.toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                  </div>
                </div>
                <span className="theme-badge" style={{
                  background: `${themeColor}20`,
                  border: `1px solid ${themeColor}40`,
                  color: themeColor,
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}>
                  {quote.theme}
                </span>
              </div>

              {/* Quote card */}
              <div
                ref={cardRef}
                className={`quote-card shimmer ${isAnimating ? "animating" : ""}`}
                style={{
                  background: `linear-gradient(135deg, ${themeColor}10, rgba(255,255,255,0.02))`,
                  border: `1px solid ${themeColor}25`,
                  borderRadius: 16,
                  padding: "36px 32px",
                  marginBottom: 28,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute",
                  top: -20,
                  left: 16,
                  fontSize: 120,
                  color: `${themeColor}08`,
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                  pointerEvents: "none",
                  userSelect: "none",
                }}>
                  "
                </div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 24,
                  lineHeight: 1.6,
                  color: "#f0ecff",
                  fontStyle: "italic",
                  margin: "0 0 20px",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {quote.text}
                </p>
                <p style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: 16,
                  color: themeColor,
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}>
                  — {quote.author}
                </p>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button
                  className="btn-glow nav-btn"
                  onClick={() => navigate(-1)}
                  disabled={selectedDay <= 1}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    color: selectedDay <= 1 ? "rgba(255,255,255,0.2)" : "#fff",
                    cursor: selectedDay <= 1 ? "not-allowed" : "pointer",
                    fontSize: 14,
                  }}
                >
                  ← Previous
                </button>

                {!isToday && (
                  <button
                    className="btn-glow nav-btn"
                    onClick={() => setSelectedDay(currentDayOfYear)}
                    style={{
                      padding: "12px 20px",
                      borderRadius: 12,
                      background: `${themeColor}25`,
                      color: themeColor,
                      cursor: "pointer",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Today
                  </button>
                )}

                <button
                  className="btn-glow nav-btn"
                  onClick={() => toggleFavorite(selectedDay)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    background: favorites.includes(selectedDay) ? "#ec489920" : "rgba(255,255,255,0.06)",
                    color: favorites.includes(selectedDay) ? "#ec4899" : "#fff",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {favorites.includes(selectedDay) ? "♥ Saved" : "♡ Save"}
                </button>

                <button
                  className="btn-glow nav-btn"
                  onClick={handleShare}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {shareMsg || "⎘ Share"}
                </button>

                <button
                  className="btn-glow nav-btn"
                  onClick={() => navigate(1)}
                  disabled={selectedDay >= 365}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.06)",
                    color: selectedDay >= 365 ? "rgba(255,255,255,0.2)" : "#fff",
                    cursor: selectedDay >= 365 ? "not-allowed" : "pointer",
                    fontSize: 14,
                    marginLeft: "auto",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Year progress */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 24px",
              marginBottom: 16,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                <span>Year Progress</span>
                <span>{Math.round(todayProgressPct)}% complete — {365 - currentDayOfYear} days remaining</span>
              </div>
              <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{
                  height: "100%",
                  width: `${todayProgressPct}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #ec4899)",
                  borderRadius: 4,
                  transition: "width 1s ease",
                }} />
              </div>
            </div>

            {/* Stats row */}
            {[
              { label: "Day", val: selectedDay },
              { label: "Quotes", val: 365 },
              { label: "Saved", val: favorites.length },
              { label: "Themes", val: Object.keys(themeColors).length },
            ].map(s => (
              <div key={s.label} style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 12,
                padding: "14px 20px",
                margin: "0 8px 8px 0",
                border: "1px solid rgba(255,255,255,0.06)",
                minWidth: 90,
                textAlign: "center",
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR VIEW */}
        {view === "calendar" && (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "0 16px 16px 16px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "32px",
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: "0 0 24px", color: "#fff" }}>
              All 12 Months · 365 Days
            </h2>
            {Array.from({ length: 12 }, (_, monthIdx) => {
              const monthStart = new Date(today.getFullYear(), monthIdx, 1);
              const monthEnd = new Date(today.getFullYear(), monthIdx + 1, 0);
              const startDay = getDayOfYear(monthStart);
              const endDay = getDayOfYear(monthEnd);
              const days = Array.from({ length: endDay - startDay + 1 }, (_, i) => startDay + i);

              return (
                <div key={monthIdx} style={{ marginBottom: 28 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                    paddingBottom: 6,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    {monthNames[monthIdx]}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {days.map(day => {
                      const isSelected = day === selectedDay;
                      const isCurrentDay = day === currentDayOfYear;
                      const isFav = favorites.includes(day);
                      const qIdx = ((day - 1) % 365 + 365) % 365;
                      const q = quotes[qIdx] || quotes[0];
                      const tc = themeColors[q.theme] || "#6366f1";
                      return (
                        <div
                          key={day}
                          className="day-cell"
                          onClick={() => { setSelectedDay(day); setView("daily"); }}
                          title={`Day ${day}: ${q.text.slice(0, 60)}...`}
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: isSelected || isCurrentDay ? 700 : 400,
                            background: isSelected
                              ? tc
                              : isCurrentDay
                              ? `${tc}40`
                              : day < currentDayOfYear
                              ? `${tc}15`
                              : "rgba(255,255,255,0.04)",
                            color: isSelected ? "#fff" : day < currentDayOfYear ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)",
                            border: isCurrentDay && !isSelected ? `1px solid ${tc}` : isFav ? "1px solid #ec489960" : "1px solid transparent",
                            position: "relative",
                          }}
                        >
                          {day - startDay + 1}
                          {isFav && (
                            <div style={{
                              position: "absolute",
                              top: -2,
                              right: -2,
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#ec4899",
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 16, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: "#8b5cf6" }} /> Selected</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, border: "1px solid #8b5cf6", background: "#8b5cf640" }} /> Today</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: "#8b5cf615" }} /> Past</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.04)" }} /> Upcoming</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ec4899" }} /> Saved</div>
            </div>
          </div>
        )}

        {/* BROWSE VIEW */}
        {view === "browse" && (
          <div style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "0 16px 16px 16px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "32px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, margin: 0, color: "#fff" }}>
                {favorites.length > 0 ? `⭐ ${favorites.length} Saved Quotes` : "All Quotes"}
              </h2>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                365 curated quotes
              </div>
            </div>

            {/* Theme filters */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {["All", ...Array.from(new Set(quotes.map(q => q.theme))).slice(0, 12)].map(theme => (
                <button
                  key={theme}
                  onClick={() => {}}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 20,
                    background: theme === "All" ? "rgba(255,255,255,0.1)" : `${themeColors[theme] || "#6366f1"}20`,
                    color: theme === "All" ? "#fff" : (themeColors[theme] || "#6366f1"),
                    border: `1px solid ${theme === "All" ? "rgba(255,255,255,0.15)" : `${themeColors[theme] || "#6366f1"}40`}`,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {theme}
                </button>
              ))}
            </div>

            {/* Quote list - show first 30 and saved */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 600, overflowY: "auto", paddingRight: 8 }}>
              {quotes.slice(0, 60).map((q, idx) => {
                const dayNum = idx + 1;
                const tc = themeColors[q.theme] || "#6366f1";
                const isFav = favorites.includes(dayNum);
                return (
                  <div
                    key={idx}
                    onClick={() => { setSelectedDay(dayNum); setView("daily"); }}
                    style={{
                      background: isFav ? `${tc}08` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isFav ? tc + "30" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 12,
                      padding: "16px 20px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = `${tc}12`}
                    onMouseLeave={e => e.currentTarget.style.background = isFav ? `${tc}08` : "rgba(255,255,255,0.02)"}
                  >
                    <div style={{
                      minWidth: 36,
                      height: 36,
                      borderRadius: 8,
                      background: `${tc}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: tc,
                    }}>
                      {dayNum}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: "'Crimson Text', serif",
                        fontStyle: "italic",
                        fontSize: 15,
                        color: "#e8e0f0",
                        margin: "0 0 4px",
                        lineHeight: 1.5,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        "{q.text}"
                      </p>
                      <div style={{ fontSize: 12, color: tc, fontWeight: 600 }}>— {q.author}</div>
                    </div>
                    <div style={{
                      background: `${tc}20`,
                      borderRadius: 12,
                      padding: "3px 10px",
                      fontSize: 10,
                      color: tc,
                      whiteSpace: "nowrap",
                    }}>
                      {q.theme}
                    </div>
                    {isFav && <div style={{ color: "#ec4899", fontSize: 16 }}>♥</div>}
                  </div>
                );
              })}
              <div style={{
                textAlign: "center",
                padding: "20px",
                color: "rgba(255,255,255,0.3)",
                fontSize: 13,
                fontStyle: "italic",
              }}>
                Showing first 60 of 365 quotes. Navigate the calendar to explore all.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
