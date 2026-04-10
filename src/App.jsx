import React, { useState, useEffect, useMemo } from "react";

// --- THE MASTER CURRICULUM (DAYS 1-30) ---
const DAYS = [
  { id: 1, title: "Survival Greetings", cat: "Basics", words: [
    { d: "Salam o 3alaykom", p: "Sa-lam o-aa-lay-kom", e: "Hello", ph: "Universal greeting." },
    { d: "Lbass?", p: "La-bass", e: "Everything good?", ph: "Short for 'How are you?'" },
    { d: "Hamdullah", p: "Ham-dul-lah", e: "Praise God (I'm fine)", ph: "The only response to Lbass." },
    { d: "Mcharfin", p: "M-char-feen", e: "Nice to meet you", ph: "Use after swapping names." },
    { d: "Bslama", p: "B-sla-ma", e: "Goodbye", ph: "Literally 'with safety'." }
  ], quiz: { q: "What is the standard response to Lbass?", a: ["Hamdullah", "Shokran", "Wakha"], c: 0 } },
  { id: 2, title: "Polite Requests", cat: "Social", words: [
    { d: "3afak", p: "Aa-fak", e: "Please", ph: "Essential for asking anything." },
    { d: "Shokran", p: "Shok-ran", e: "Thank you", ph: "Add 'bzzaf' for 'very much'." },
    { d: "Sme7 liya", p: "S-meh lee-ya", e: "Excuse me", ph: "To pass someone or apologize." },
    { d: "Wakha", p: "Wa-kha", e: "Okay", ph: "Agreed / Yes." },
    { d: "Mashi moshkil", p: "Ma-shee mosh-keel", e: "No problem", ph: "Chill response." }
  ], quiz: { q: "How do you say 'Please' in Darija?", a: ["Safi", "3afak", "Wakha"], c: 1 } },
  { id: 3, title: "The Souk (Market)", cat: "Shopping", words: [
    { d: "Bsh7al?", p: "B-shal", e: "How much?", ph: "Bsh7al hada? (How much is this?)" },
    { d: "Ghali bzzaf", p: "Ghal-ee b-zaf", e: "Too expensive", ph: "Start bargaining here." },
    { d: "Naqas shwiya", p: "Na-qas shwee-ya", e: "Lower it a bit", ph: "Asking for a discount." },
    { d: "Akher taman?", p: "A-kher ta-man", e: "Final price?", ph: "The last stage of a deal." },
    { d: "3tini...", p: "Aa-tee-nee", e: "Give me...", ph: "3tini wahed l-ma (water)." }
  ], quiz: { q: "Which phrase starts a bargain?", a: ["Zwin", "Ghali bzzaf", "Shokran"], c: 1 } },
  { id: 4, title: "Directions", cat: "Travel", words: [
    { d: "Fin...?", p: "Feen", e: "Where is...?", ph: "Fin l-Jam3 l-Fna?" },
    { d: "L-imn", p: "Leemn", e: "Right", ph: "Dor 3la l-imn." },
    { d: "L-isr", p: "Leesr", e: "Left", ph: "Dor 3la l-isr." },
    { d: "Toul", p: "Tool", e: "Straight", ph: "Zid toul." },
    { d: "Hna / L-hih", p: "Hna / L-hee", e: "Here / There", ph: "Wqaf hna (Stop here)." }
  ], quiz: { q: "What is 'Right' in Darija?", a: ["L-isr", "L-imn", "Toul"], c: 1 } },
  { id: 5, title: "Café Orders", cat: "Food", words: [
    { d: "Atay", p: "A-tay", e: "Tea", ph: "Usually comes with mint (na3na3)." },
    { d: "Qehwa", p: "Qeh-wa", e: "Coffee", ph: "Ask for 'nss-nss' (half milk)." },
    { d: "Bla sokar", p: "Bla so-kar", e: "No sugar", ph: "Crucial if you don't want it sweet." },
    { d: "L-7ssab", p: "L-sab", e: "The bill", ph: "L-7ssab 3afak." },
    { d: "Mshwi", p: "M-shwee", e: "Grilled (Meat)", ph: "Common dinner order." }
  ], quiz: { q: "How do you ask for 'No sugar'?", a: ["Bzzaf sokar", "Bla sokar", "Atay"], c: 1 } },
  { id: 6, title: "Numbers 1-10", cat: "Math", words: [
    { d: "Wahed / Jouj", p: "Wa-hed / Joo-j", e: "1 / 2", ph: "Basics." },
    { d: "Tlata / Arba3a", p: "Tla-ta / Ar-ba-aa", e: "3 / 4", ph: "Counting." },
    { d: "Khamsa / Setta", p: "Kham-sa / Set-ta", e: "5 / 6", ph: "Counting." },
    { d: "Seb3a / Tmanya", p: "Seb-aa / Tman-ya", e: "7 / 8", ph: "Counting." },
    { d: "Tes3a / 3chra", p: "Tes-aa / Ash-ra", e: "9 / 10", ph: "Counting." }
  ], quiz: { q: "What is the number 'Two'?", a: ["Wahed", "Jouj", "Khamsa"], c: 1 } },
  { id: 7, title: "Common Nouns", cat: "Basics", words: [
    { d: "Dar", p: "Dar", e: "House", ph: "Nas d-dar (Family)." },
    { d: "Tomobil", p: "To-mo-beel", e: "Car", ph: "Transportation." },
    { d: "Khobz", p: "Khobz", e: "Bread", ph: "Staple food." },
    { d: "L-ma", p: "L-ma", e: "Water", ph: "Survival." },
    { d: "Bit", p: "Beet", e: "Room", ph: "Bit l-mra (Living room)." }
  ], quiz: { q: "What does 'Dar' mean?", a: ["Door", "House", "Car"], c: 1 } },
  { id: 8, title: "Family", cat: "Social", words: [
    { d: "Khoya / Khti", p: "Kho-ya / Kh-tee", e: "Brother / Sister", ph: "Universal terms for friends." },
    { d: "Mama / Baba", p: "Ma-ma / Ba-ba", e: "Mom / Dad", ph: "Family." },
    { d: "Rajel / Mra", p: "Ra-jel / Mra", e: "Man / Woman", ph: "Husband / Wife." },
    { d: "Drari", p: "Dra-ree", e: "Children", ph: "A group of kids." },
    { d: "Nssib", p: "N-seeb", e: "In-law", ph: "Family ties." }
  ], quiz: { q: "How do you call a male friend/brother?", a: ["Khti", "Khoya", "Drari"], c: 1 } },
  { id: 9, title: "Present Verbs 1", cat: "Verbs", words: [
    { d: "Kan-akol", p: "Kan-a-kol", e: "I eat", ph: "Kan-akol t-tajine." },
    { d: "Kan-shrob", p: "Kan-sh-rob", e: "I drink", ph: "Kan-shrob l-ma." },
    { d: "Kan-mshi", p: "Kan-m-shee", e: "I go", ph: "Kan-mshi l-medina." },
    { d: "Kan-hder", p: "Kan-h-der", e: "I speak", ph: "Kan-hder Darija." },
    { d: "Kan-fhem", p: "Kan-f-hem", e: "I understand", ph: "Kan-fhem shwiya." }
  ], quiz: { q: "What does 'Kan-akol' mean?", a: ["I speak", "I eat", "I go"], c: 1 } },
  { id: 10, title: "Present Verbs 2", cat: "Verbs", words: [
    { d: "Kan-shri", p: "Kan-shree", e: "I buy", ph: "Kan-shri l-khodra." },
    { d: "Kan-skon", p: "Kan-s-kon", e: "I live", ph: "Kan-skon f Marrakech." },
    { d: "Kan-khdem", p: "Kan-kh-dem", e: "I work", ph: "Kan-khdem dima." },
    { d: "Kan-shouf", p: "Kan-shouf", e: "I see / look", ph: "Kan-shouf lotel." },
    { d: "Kan-3ref", p: "Kan-aa-ref", e: "I know", ph: "Ma-3reftsh (I don't know)." }
  ], quiz: { q: "How do you say 'I live'?", a: ["Kan-skon", "Kan-shri", "Kan-hder"], c: 0 } },
  { id: 11, title: "Essential Adjectives", cat: "Describing", words: [
    { d: "Zwin / Zwina", p: "Zween / Zwee-na", e: "Good / Beautiful", ph: "Marrakech zwina." },
    { d: "Khayb", p: "Khay-b", e: "Bad / Ugly", ph: "Opposite of Zwin." },
    { d: "Kbir / Sghir", p: "Kbeer / S-gheer", e: "Big / Small", ph: "Size." },
    { d: "Ghalwi / Rkhis", p: "Ghal-wee / R-khees", e: "Expensive / Cheap", ph: "Price." },
    { d: "Skhon / Bard", p: "Skhon / Bard", e: "Hot / Cold", ph: "Temp." }
  ], quiz: { q: "What is 'Beautiful' in Darija?", a: ["Khayb", "Zwin", "Bard"], c: 1 } },
  { id: 12, title: "Time - Part 1", cat: "Time", words: [
    { d: "Lyoum", p: "L-yoom", e: "Today", ph: "Lyoum l-7al skhon." },
    { d: "Ghda", p: "G-da", e: "Tomorrow", ph: "Ntshwafo ghda." },
    { d: "L-bare7", p: "L-ba-re", e: "Yesterday", ph: "Past tense helper." },
    { d: "Sba7", p: "S-bah", e: "Morning", ph: "Sba7 l-khir." },
    { d: "Lil", p: "Leel", e: "Night", ph: "Tsbah 3la khir." }
  ], quiz: { q: "How do you say 'Tomorrow'?", a: ["Lyoum", "Ghda", "Lil"], c: 1 } },
  { id: 13, title: "Questions", cat: "Grammar", words: [
    { d: "Shno?", p: "Sh-no", e: "What?", ph: "Shno hada?" },
    { d: "Imta?", p: "Im-ta", e: "When?", ph: "Imta l-ghda?" },
    { d: "Fin?", p: "Feen", e: "Where?", ph: "Fin l-mir7ad?" },
    { d: "3lach?", p: "Aa-lash", e: "Why?", ph: "3lach la?" },
    { d: "Shkoun?", p: "Sh-koon", e: "Who?", ph: "Shkoun m3aya?" }
  ], quiz: { q: "What is 'Where'?", a: ["Shno", "Fin", "Imta"], c: 1 } },
  { id: 14, title: "Home Objects", cat: "Nouns", words: [
    { d: "Namoussiya", p: "Na-moo-see-ya", e: "Bed", ph: "Furniture." },
    { d: "Mario", p: "Ma-ryo", e: "Wardrobe", ph: "Furniture." },
    { d: "Talfaza", p: "Tal-fa-za", e: "TV", ph: "Electronics." },
    { d: "Kouzina", p: "Koo-zee-na", e: "Kitchen", ph: "Room." },
    { d: "Sadda", p: "Sad-da", e: "Shelf / Storage", ph: "House part." }
  ], quiz: { q: "What is 'Bed'?", a: ["Mario", "Namoussiya", "Kouzina"], c: 1 } },
  { id: 15, title: "Linking Words", cat: "Grammar", words: [
    { d: "W / O", p: "O", e: "And", ph: "Atay o khobz." },
    { d: "Walakin", p: "Wa-la-keen", e: "But", ph: "Zwin walakin ghali." },
    { d: "7it", p: "Heet", e: "Because", ph: "Mshghoul 7it khddam." },
    { d: "Awla", p: "Aw-la", e: "Or", ph: "Atay awla qehwa?" },
    { d: "M3a", p: "M-aa", e: "With", ph: "M3a khoya." }
  ], quiz: { q: "How do you say 'But'?", a: ["W", "Walakin", "Awla"], c: 1 } },
  { id: 16, title: "Feelings", cat: "Social", words: [
    { d: "3iyane", p: "Ee-yan", e: "Tired", ph: "Ana 3iyane bzzaf." },
    { d: "Mrid", p: "M-reed", e: "Sick", ph: "Khasni n-shouf tbib." },
    { d: "Far7an", p: "Far-han", e: "Happy", ph: "Ana far7an lyoum." },
    { d: "Mqalaq", p: "M-qa-laq", e: "Angry / Upset", ph: "Mashi moshkil." },
    { d: "Ji3an", p: "Jee-aan", e: "Hungry", ph: "Bghit nakol." }
  ], quiz: { q: "How do you say 'Tired'?", a: ["3iyane", "Mrid", "Far7an"], c: 0 } },
  { id: 17, title: "Past Tense 1", cat: "Verbs", words: [
    { d: "Mshit", p: "M-sheet", e: "I went", ph: "Mshit l-souk." },
    { d: "Klit", p: "Kleet", e: "I ate", ph: "Klit t-tajine." },
    { d: "Shrbit", p: "Shr-beet", e: "I drank", ph: "Shrbit l-ma." },
    { d: "Hdrt", p: "H-drt", e: "I spoke", ph: "Hdrt m3a l-moussa3id." },
    { d: "Shrit", p: "Shreet", e: "I bought", ph: "Shrit t-shawn." }
  ], quiz: { q: "What is 'I went'?", a: ["Mshit", "Klit", "Hdrt"], c: 0 } },
  { id: 18, title: "Body Parts", cat: "Nouns", words: [
    { d: "Ras", p: "Ras", e: "Head", ph: "Rassi kay-drni." },
    { d: "Yid", p: "Yeed", e: "Hand", ph: "Body part." },
    { d: "Rjel", p: "R-jel", e: "Leg", ph: "Body part." },
    { d: "3in", p: "Een", e: "Eye", ph: "Body part." },
    { d: "Foum", p: "Foom", e: "Mouth", ph: "Body part." }
  ], quiz: { q: "What is 'Head'?", a: ["Ras", "Yid", "Foum"], c: 0 } },
  { id: 19, title: "Clothes", cat: "Daily", words: [
    { d: "Tricot", p: "Tree-ko", e: "Sweater", ph: "Clothing." },
    { d: "Sabate", p: "Sa-bat", e: "Shoes", ph: "Clothing." },
    { d: "Srawal", p: "Sra-wal", e: "Pants", ph: "Clothing." },
    { d: "Kesketa", p: "Kes-ke-ta", e: "Cap", ph: "Clothing." },
    { d: "Jellaba", p: "Jel-la-ba", e: "Traditional robe", ph: "Clothing." }
  ], quiz: { q: "What is 'Shoes'?", a: ["Tricot", "Sabate", "Kesketa"], c: 1 } },
  { id: 20, title: "Future Tense", cat: "Verbs", words: [
    { d: "Ghadi n-akol", p: "Ga-dee n-a-kol", e: "I will eat", ph: "Future intent." },
    { d: "Ghadi n-shrob", p: "Ga-dee n-sh-rob", e: "I will drink", ph: "Future intent." },
    { d: "Ghadi n-mshi", p: "Ga-dee n-m-shee", e: "I will go", ph: "Ghadi n-mshi l-ghda." },
    { d: "Ghadi n-hder", p: "Ga-dee n-h-der", e: "I will speak", ph: "Future intent." },
    { d: "Ghadi n-shri", p: "Ga-dee n-shree", e: "I will buy", ph: "Future intent." }
  ], quiz: { q: "What indicates 'Future'?", a: ["Kan", "Ghadi", "Mshit"], c: 1 } },
  { id: 21, title: "Colors", cat: "Describing", words: [
    { d: "Byed", p: "Byed", e: "White", ph: "Colors." },
    { d: "K7al", p: "Khal", e: "Black", ph: "Colors." },
    { d: "7mer", p: "Hmer", e: "Red", ph: "Colors." },
    { d: "Zreq", p: "Zreq", e: "Blue", ph: "Colors." },
    { d: "Khder", p: "Khder", e: "Green", ph: "Colors." }
  ], quiz: { q: "What is 'Red'?", a: ["7mer", "K7al", "Zreq"], c: 0 } },
  { id: 22, title: "The Weather", cat: "Daily", words: [
    { d: "Skhoun", p: "Skhoun", e: "Hot", ph: "L-7al skhoun." },
    { d: "Bard", p: "Bard", e: "Cold", ph: "L-7al bard." },
    { d: "Shta", p: "Shta", e: "Rain", ph: "Kayna shta." },
    { d: "Shams", p: "Shams", e: "Sun", ph: "Nature." },
    { d: "Rbi3", p: "Rbee", e: "Spring / Grass", ph: "Nature." }
  ], quiz: { q: "What is 'Rain'?", a: ["Shta", "Shams", "Bard"], c: 0 } },
  { id: 23, title: "Possession", cat: "Grammar", words: [
    { d: "Dyali", p: "Dya-lee", e: "Mine", ph: "Had t-tomobil dyali." },
    { d: "Dyalek", p: "Dya-lek", e: "Yours", ph: "Wash had l-khtab dyalek?" },
    { d: "Dyalo / Dyala", p: "Dya-lo", e: "His / Hers", ph: "Possession." },
    { d: "Dyalna", p: "Dya-lna", e: "Ours", ph: "Possession." },
    { d: "Dyalkom", p: "Dya-l-kom", e: "Yours (Plural)", ph: "Possession." }
  ], quiz: { q: "How do you say 'Mine'?", a: ["Dyali", "Dyalek", "Dyalna"], c: 0 } },
  { id: 24, title: "Frequency", cat: "Time", words: [
    { d: "Dima", p: "Dee-ma", e: "Always", ph: "Kan-shrob atay dima." },
    { d: "Merra merra", p: "Merra merra", e: "Sometimes", ph: "Frequency." },
    { d: "3mmrni", p: "Am-mer-nee", e: "Never", ph: "3mmrni shrbit l-khamr." },
    { d: "Kolla l-youm", p: "Kol-la l-yoom", e: "Every day", ph: "Routine." },
    { d: "Dghya", p: "Der-ya", e: "Quickly", ph: "Sali dghya." }
  ], quiz: { q: "What is 'Always'?", a: ["Dima", "3mmrni", "Merra merra"], c: 0 } },
  { id: 25, title: "Emergencies", cat: "Travel", words: [
    { d: "3awnni!", p: "Awn-nee", e: "Help me!", ph: "Urgent." },
    { d: "Bolis", p: "Bo-lees", e: "Police", ph: "Help." },
    { d: "Sbi7ar", p: "Sbee-tar", e: "Hospital", ph: "Medical." },
    { d: "Tbib", p: "Tbeeb", e: "Doctor", ph: "Medical." },
    { d: "Sme7 liya", p: "S-meh lee-ya", e: "Sorry", ph: "Apology." }
  ], quiz: { q: "What is 'Hospital'?", a: ["Souk", "Sbi7ar", "Hanout"], c: 1 } },
  { id: 26, title: "The Bathroom", cat: "Daily", words: [
    { d: "Toilet", p: "To-let", e: "Bathroom", ph: "Survival." },
    { d: "Sabon", p: "Sa-bon", e: "Soap", ph: "Hygiene." },
    { d: "Shampoing", p: "Sham-pwan", e: "Shampoo", ph: "Hygiene." },
    { d: "Fouta", p: "Foo-ta", e: "Towel", ph: "Hygiene." },
    { d: "L-ma skhoun", p: "L-ma skhoun", e: "Hot water", ph: "Hygiene." }
  ], quiz: { q: "What is 'Soap'?", a: ["Fouta", "Sabon", "L-ma"], c: 1 } },
  { id: 27, title: "Want & Need", cat: "Verbs", words: [
    { d: "Bghit", p: "Breet", e: "I want", ph: "Bghit n-akol." },
    { d: "Ma-bghitsh", p: "Ma-breetsh", e: "I don't want", ph: "Refusal." },
    { d: "Khasni", p: "Khas-nee", e: "I need / I must", ph: "Obligation." },
    { d: "Momkin", p: "Mom-keen", e: "Possible", ph: "Momkin ndouz?" },
    { d: "3tini", p: "A-tee-nee", e: "Give me", ph: "Request." }
  ], quiz: { q: "How do you say 'I want'?", a: ["Bghit", "Khasni", "Momkin"], c: 0 } },
  { id: 28, title: "Nature", cat: "Basics", words: [
    { d: "Jbel", p: "Jbel", e: "Mountain", ph: "Nature." },
    { d: "B7ar", p: "Bhar", e: "Sea / Beach", ph: "Nature." },
    { d: "Shta", p: "Shta", e: "Rain", ph: "Weather." },
    { d: "Shams", p: "Shams", e: "Sun", ph: "Weather." },
    { d: "Sma", p: "Sma", e: "Sky", ph: "Nature." }
  ], quiz: { q: "What is 'Sea'?", a: ["Jbel", "B7ar", "Sma"], c: 1 } },
  { id: 29, title: "Work & Study", cat: "Social", words: [
    { d: "Khidma", p: "Khid-ma", e: "Work", ph: "Mshat l-khidma." },
    { d: "Khddam", p: "K-dam", e: "Working", ph: "Ana khddam." },
    { d: "Mdrasa", p: "Md-ra-sa", e: "School", ph: "Study." },
    { d: "Stylo", p: "Sty-lo", e: "Pen", ph: "Tools." },
    { d: "Ktab", p: "Ktab", e: "Book", ph: "Tools." }
  ], quiz: { q: "What is 'School'?", a: ["Mdrasa", "Bit", "Kouzina"], c: 0 } },
  { id: 30, title: "Marrakech Slang", cat: "Advanced", words: [
    { d: "Hanya", p: "Han-ya", e: "It's cool / No worries", ph: "Response to everything." },
    { d: "Safi", p: "Sa-fee", e: "Enough / Done", ph: "Termination word." },
    { d: "Mchiti fiha", p: "M-sheet-ee fi-ha", e: "You're done for!", ph: "Joking." },
    { d: "Dghya", p: "Der-ya", e: "Fast", ph: "Sali dghya." },
    { d: "Wallah", p: "Wal-lah", e: "I swear", ph: "Very common emphasis." }
  ], quiz: { q: "How do you say 'No worries'?", a: ["Safi", "Hanya", "Dghya"], c: 1 } }
];

// --- APP COMPONENT ---
export default function DarijaSprint() {
  const [day, setDay] = useState(0);
  const [scores, setScores] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [quizCorrectCount, setQuizCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);

  const activeDay = DAYS[day];
  const totalCorrect = Object.keys(scores).length;
  const totalPoints = totalCorrect * 10;
  const completion = Math.round((totalCorrect / DAYS.length) * 100);
  const completedDays = useMemo(() => DAYS.filter((_, i) => scores[i]).length, [scores]);

  const startChallenge = () => {
    // 1. Shuffle and pick up to 5 words from the current day
    const shuffledWords = [...activeDay.words]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    // 2. Generate questions
    const generated = shuffledWords.map((word) => {
      // Correct answer
      const correct = word.e;
      
      // 3. Get distractors from the current day's words
      const distractors = activeDay.words
        .filter(w => w.e !== correct)
        .map(w => w.e)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      return {
        q: `What is the meaning of "${word.d}"?`,
        phonetic: word.p,
        options: [correct, ...distractors].sort(() => Math.random() - 0.5),
        answer: correct
      };
    });

    setQuizQuestions(generated);
    setCurrentQuizStep(0);
    setQuizCorrectCount(0);
    setQuizFinished(false);
    setShowQuiz(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem('sprint_progress');
    if (saved) setScores(JSON.parse(saved));
  }, []);

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === quizQuestions[currentQuizStep].answer;
    const newCorrectCount = isCorrect ? quizCorrectCount + 1 : quizCorrectCount;
    
    if (isCorrect) {
      setQuizCorrectCount(newCorrectCount);
    }

    if (currentQuizStep < quizQuestions.length - 1) {
      setCurrentQuizStep(prev => prev + 1);
    } else {
      // Quiz finished
      setQuizFinished(true);
      
      // Mark day as completed if they got a passing score (3 or more)
      // We use newCorrectCount here because the state hasn't updated yet
      if (!scores[day] && newCorrectCount >= 3) {
        const newScores = { ...scores, [day]: true };
        setScores(newScores);
        localStorage.setItem('sprint_progress', JSON.stringify(newScores));
      }
    }
  };

  return (
    <div className="app-shell">
      {isMenuOpen && <div className="menu-backdrop" onClick={() => setIsMenuOpen(false)} />}
      
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className="app-shell__frame">
        <div className="app-shell__content">
          <header className="hero-header">
            <div className="hero-header__text">
              <div className="hero-header__eyebrow">Premium Darija learning experience</div>
              <h1 className="hero-header__title">DARIJA SPRINT</h1>
              <p className="hero-header__subtitle">30 Days to Marrakech Fluency — a cinematic, modern learning space with polished motion, glass surfaces, and premium focus states.</p>
            </div>
            <div className="points-badge">
              <span className="points-badge__label">Progress</span>
              <span className="points-badge__value">{totalPoints}</span>
              <span className="points-badge__label" style={{ marginTop: 12 }}>Completed {completedDays}/30 · {completion}%</span>
            </div>
          </header>

          <main className="content-grid">
            <aside className={`lesson-list ${isMenuOpen ? "lesson-list--open" : ""}`}>
              {DAYS.map((d, i) => (
                <button
                  key={i}
                  onClick={() => { setDay(i); setShowQuiz(false); setIsMenuOpen(false); }}
                  className={`lesson-card ${day === i ? "lesson-card--active" : ""}`}
                  style={{ animationDelay: `${i * 28}ms` }}
                >
                  <div className="lesson-card__meta">
                    <span className="lesson-card__day">Day {d.id}</span>
                    <span className="lesson-card__title">{d.title}</span>
                  </div>
                  {scores[i] && <span className="lesson-card__status">●</span>}
                </button>
              ))}
            </aside>

            <section>
              {!showQuiz ? (
                <div className="lesson-panel">
                  <div className="lesson-panel__header">
                    <span className="lesson-panel__category">{activeDay.cat}</span>
                    <h2 className="lesson-panel__title">"{activeDay.title}"</h2>
                  </div>

                  <div className="lesson-stack">
                    {activeDay.words.map((w, idx) => (
                      <div key={idx} className="lesson-word" style={{ animationDelay: `${idx * 90}ms` }}>
                        <span className="lesson-word__index">0{idx + 1}</span>
                        <div>
                          <div style={{ marginBottom: 4 }}>
                            <h3 className="lesson-word__term">{w.d}<span className="lesson-word__phonetic">[{w.p}]</span></h3>
                          </div>
                          <p className="lesson-word__meaning" style={{ fontSize: '18px', fontWeight: 500, marginBottom: 8 }}>{w.e}</p>
                          <p className="lesson-word__hint">💡 {w.ph}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={startChallenge}
                    className="primary-button"
                  >
                    Start Daily Challenge
                  </button>
                </div>
              ) : (
                <div className="quiz-panel">
                  {!quizFinished ? (
                    <>
                      <h3 className="quiz-panel__kicker">Challenge: Question {currentQuizStep + 1} of 5</h3>
                      <p className="quiz-panel__question">{quizQuestions[currentQuizStep]?.q}</p>
                      <div className="quiz-options">
                        {quizQuestions[currentQuizStep]?.options.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleAnswer(opt)}
                            className="quiz-option"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="quiz-results">
                      <h2 className="lesson-panel__title">Challenge Complete!</h2>
                      <p className="quiz-results__score">You scored <span>{quizCorrectCount} / 5</span></p>
                      <div className="quiz-results__actions">
                        <button onClick={startChallenge} className="primary-button">Try Again</button>
                        <button onClick={() => setShowQuiz(false)} className="secondary-button">Back to Lesson</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
