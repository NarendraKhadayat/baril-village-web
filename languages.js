/**
 * @author Narendra Khadayat
 */

//



// Language data for the website
const languageData = {
    en: {
        // Navigation
        "Home": "Home",
        "About": "About",
        "History": "History",
        "Culture": "Culture",
        "Gallery": "Gallery",
        "Map": "Map",
        "Contact": "Contact",
        
        // Hero section
        "Welcome to Baril Village": "Welcome to Baril Village",
        "Discover the beauty of our Himalayan village": "Discover the beauty of our Himalayan village",
        "Visitors": "Visitors",
        "Explore More": "Explore More",
        
        // About section
        "About Baril Village": "About Baril Village",
        "Discover our beautiful village": "Discover our beautiful village",
        "Altitude: 3100 ft": "Altitude: 3100 ft",
        "Area: 9 lakh m²": "Area: 9 lakh m²",
        "Population: ~1000": "Population: ~1000",
        "Language: Doteli": "Language: Doteli",
        
        // Weather widget
        "Current Weather": "Current Weather",
        "Loading...": "Loading...",
        "Baril Village, Darchula": "Baril Village, Darchula",
        
        // History section
        "Our History": "Our History",
        "The story of our village": "The story of our village",
        "Early Settlement": "Early Settlement",
        "First School Established": "First School Established",
        "Municipality Formation": "Municipality Formation",
        "Modern Development": "Modern Development",
        
        // Culture section
        "Culture & Traditions": "Culture & Traditions",
        "Our rich cultural heritage": "Our rich cultural heritage",
        "Festivals": "Festivals",
        "Religion": "Religion",
        "Language": "Language",
        "Occupations": "Occupations",
        "Dashain": "Dashain",
        "Goura Parva": "Goura Parva",
        "Bisu Parva": "Bisu Parva",
        "Learn Basic Doteli": "Learn Basic Doteli",
        "How are you?": "How are you?",
        "I'm fine": "I'm fine",
        "Thank you": "Thank you",
        "Learn More": "Learn More",
        "Farmers (60%)": "Farmers (60%)",
        "Government Employees (20%)": "Government Employees (20%)",
        "Military (15%)": "Military (15%)",
        "Others (5%)": "Others (5%)",
        
        // Gallery section
        "Photo Gallery": "Photo Gallery",
        "Visual journey through our village": "Visual journey through our village",
        "All": "All",
        "Landscape": "Landscape",
        "Culture": "Culture",
        "People": "People",
        "Load More": "Load More",
        
        // Map section
        "Village Map": "Village Map",
        "Explore Baril's geography": "Explore Baril's geography",
        "Legend": "Legend",
        "Residential": "Residential",
        "Farming": "Farming",
        "Temples": "Temples",
        "Forest": "Forest",
        
        // Contact section
        "Contact Us": "Contact Us",
        "Get in touch with Baril Village": "Get in touch with Baril Village",
        "Address": "Address",
        "Email": "Email",
        "Phone": "Phone",
        "Send us a message": "Send us a message",
        "Your Name": "Your Name",
        "Your Email": "Your Email",
        "Subject": "Subject",
        "Your Message": "Your Message",
        "Send Message": "Send Message",
        
        // Newsletter section
        "Stay Updated": "Stay Updated",
        "Subscribe for village news and updates": "Subscribe for village news and updates",
        "Your Email Address": "Your Email Address",
        "Subscribe": "Subscribe",
        
        // Footer
        "Preserving our heritage, celebrating our community.": "Preserving our heritage, celebrating our community.",
        "Quick Links": "Quick Links",
        "Contact Info": "Contact Info",
        "All rights reserved.": "All rights reserved.",
        
        // Chatbot
        "Baril Village Assistant": "Baril Village Assistant",
        "Hello! How can I help you today?": "Hello! How can I help you today?",
        "Type your message...": "Type your message..."
    },
    ne: {
        // Navigation
        "Home": "गृहपृष्ठ",
        "About": "बारेमा",
        "History": "इतिहास",
        "Culture": "संस्कृति",
        "Gallery": "ग्यालरी",
        "Map": "नक्सा",
        "Contact": "सम्पर्क",
        
        // Hero section
        "Welcome to Baril Village": "बरिल गाउँमा स्वागत छ",
        "Discover the beauty of our Himalayan village": "हाम्रो हिमाली गाउँको सुन्दरता अन्वेषण गर्नुहोस्",
        "Visitors": "आगन्तुक",
        "Explore More": "थप जान्नुहोस्",
        
        // About section
        "About Baril Village": "बरिल गाउँको बारेमा",
        "Discover our beautiful village": "हाम्रो सुन्दर गाउँको बारेमा जान्नुहोस्",
        "Altitude: 3100 ft": "उचाई: ३१०० फिट",
        "Area: 9 lakh m²": "क्षेत्रफल: ९ लाख मिटर²",
        "Population: ~1000": "जनसंख्या: ~१०००",
        "Language: Doteli": "भाषा: डोटेली",
        
        // Weather widget
        "Current Weather": "हालको मौसम",
        "Loading...": "लोड हुँदै...",
        "Baril Village, Darchula": "बरिल गाउँ, दार्चुला",
        
        // History section
        "Our History": "हाम्रो इतिहास",
        "The story of our village": "हाम्रो गाउँको कथा",
        "Early Settlement": "प्रारम्भिक बसोबास",
        "First School Established": "पहिलो विद्यालय स्थापना",
        "Municipality Formation": "नगरपालिका गठन",
        "Modern Development": "आधुनिक विकास",
        
        // Culture section
        "Culture & Traditions": "संस्कृति र परम्परा",
        "Our rich cultural heritage": "हाम्रो समृद्ध सांस्कृतिक विरासत",
        "Festivals": "चाडपर्व",
        "Religion": "धर्म",
        "Language": "भाषा",
        "Occupations": "पेशा",
        "Dashain": "दशैं",
        "Goura Parva": "गौरा पर्व",
        "Bisu Parva": "बिसु पर्व",
        "Learn Basic Doteli": "आधारभूत डोटेली सिक्नुहोस्",
        "How are you?": "तपाईंलाई कस्तो छ?",
        "I'm fine": "म ठिक छु",
        "Thank you": "धन्यवाद",
        "Learn More": "थप सिक्नुहोस्",
        "Farmers (60%)": "किसान (६०%)",
        "Government Employees (20%)": "सरकारी कर्मचारी (२०%)",
        "Military (15%)": "सैनिक (१५%)",
        "Others (5%)": "अन्य (५%)",
        
        // Gallery section
        "Photo Gallery": "फोटो ग्यालरी",
        "Visual journey through our village": "हाम्रो गाउँको दृश्य यात्रा",
        "All": "सबै",
        "Landscape": "दृश्य",
        "Culture": "संस्कृति",
        "People": "मानिसहरू",
        "Load More": "थप लोड गर्नुहोस्",
        
        // Map section
        "Village Map": "गाउँको नक्सा",
        "Explore Baril's geography": "बरिलको भूगोल अन्वेषण गर्नुहोस्",
        "Legend": "लेजेन्ड",
        "Residential": "आवासीय",
        "Farming": "खेती",
        "Temples": "मन्दिर",
        "Forest": "जंगल",
        
        // Contact section
        "Contact Us": "हामीलाई सम्पर्क गर्नुहोस्",
        "Get in touch with Baril Village": "बरिल गाउँसँग जोडिनुहोस्",
        "Address": "ठेगाना",
        "Email": "इमेल",
        "Phone": "फोन",
        "Send us a message": "हामीलाई सन्देश पठाउनुहोस्",
        "Your Name": "तपाईंको नाम",
        "Your Email": "तपाईंको इमेल",
        "Subject": "विषय",
        "Your Message": "तपाईंको सन्देश",
        "Send Message": "सन्देश पठाउनुहोस्",
        
        // Newsletter section
        "Stay Updated": "अद्यावधिक रहनुहोस्",
        "Subscribe for village news and updates": "गाउँको समाचार र अपडेटहरूको लागि सदस्यता लिनुहोस्",
        "Your Email Address": "तपाईंको इमेल ठेगाना",
        "Subscribe": "सदस्यता लिनुहोस्",
        
        // Footer
        "Preserving our heritage, celebrating our community.": "हाम्रो विरासत संरक्षण गर्दै, हाम्रो समुदायलाई मनाउँदै।",
        "Quick Links": "द्रुत लिंकहरू",
        "Contact Info": "सम्पर्क जानकारी",
        "All rights reserved.": "सर्वाधिकार सुरक्षित।",
        
        // Chatbot
        "Baril Village Assistant": "बरिल गाउँ सहयोगी",
        "Hello! How can I help you today?": "नमस्ते! मैले तपाईंलाई कसरी मद्दत गर्न सक्छु?",
        "Type your message...": "आफ्नो सन्देश टाइप गर्नुहोस्..."
    }
};

// Export for use in script.js
window.languageData = languageData;