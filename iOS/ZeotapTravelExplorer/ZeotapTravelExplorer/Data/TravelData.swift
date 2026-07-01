import UIKit

struct TravelData {

    static func getCategories() -> [Category] {
        return [
            Category(id: "beaches", name: "Beaches", icon: "\u{1F3D6}", color: UIColor(red: 0.88, green: 0.95, blue: 1.0, alpha: 1.0)),
            Category(id: "mountains", name: "Mountains", icon: "\u{1F3D4}", color: UIColor(red: 0.89, green: 0.95, blue: 0.89, alpha: 1.0)),
            Category(id: "cities", name: "Cities", icon: "\u{1F3D9}", color: UIColor(red: 0.99, green: 0.95, blue: 0.88, alpha: 1.0)),
            Category(id: "historical", name: "Historical", icon: "\u{1F3DB}", color: UIColor(red: 1.0, green: 0.93, blue: 0.88, alpha: 1.0)),
            Category(id: "adventure", name: "Adventure", icon: "\u{1F3D5}", color: UIColor(red: 0.95, green: 0.90, blue: 0.96, alpha: 1.0)),
            Category(id: "islands", name: "Islands", icon: "\u{1F334}", color: UIColor(red: 1.0, green: 0.97, blue: 0.88, alpha: 1.0))
        ]
    }

    static func getPlacesByCategory(_ categoryId: String) -> [Place] {
        return getAllPlaces().filter { $0.categoryId == categoryId }
    }

    static func getPlaceById(_ placeId: String) -> Place? {
        return getAllPlaces().first { $0.id == placeId }
    }

    private static func getAllPlaces() -> [Place] {
        return [
            // Beaches
            Place(id: "BE001", name: "Maldives", categoryId: "beaches", category: "Beaches",
                  country: "Republic of Maldives", description: "A tropical paradise of 26 atolls in the Indian Ocean, known for crystal-clear waters, vibrant coral reefs, and luxurious overwater bungalows. Perfect for snorkeling, diving, and complete relaxation on pristine white-sand beaches.",
                  priceRange: "$$$", rating: 4.8, bestSeason: "November - April", durationSuggestion: "5-7 days"),
            Place(id: "BE002", name: "Bali, Indonesia", categoryId: "beaches", category: "Beaches",
                  country: "Indonesia", description: "The Island of the Gods combines stunning beaches with rich cultural heritage. From the surfing haven of Kuta to the serene shores of Nusa Dua, Bali offers world-class resorts, ancient temples, terraced rice paddies, and vibrant nightlife.",
                  priceRange: "$$", rating: 4.6, bestSeason: "April - October", durationSuggestion: "7-10 days"),
            Place(id: "BE003", name: "Santorini, Greece", categoryId: "beaches", category: "Beaches",
                  country: "Greece", description: "Famous for its dramatic caldera views, whitewashed buildings with blue domes, and stunning sunsets in Oia. Santorini offers unique volcanic beaches in red and black sand, excellent local wines, and fresh Mediterranean cuisine.",
                  priceRange: "$$$", rating: 4.7, bestSeason: "June - September", durationSuggestion: "4-5 days"),
            Place(id: "BE004", name: "Cancun, Mexico", categoryId: "beaches", category: "Beaches",
                  country: "Mexico", description: "A vibrant Caribbean destination with turquoise waters, white sandy beaches, and a bustling hotel zone. Explore nearby Mayan ruins at Chichen Itza and Tulum, swim in natural cenotes, and enjoy world-class nightlife.",
                  priceRange: "$$", rating: 4.4, bestSeason: "December - April", durationSuggestion: "5-7 days"),

            // Mountains
            Place(id: "MT001", name: "Swiss Alps", categoryId: "mountains", category: "Mountains",
                  country: "Switzerland", description: "Majestic peaks, pristine alpine lakes, and charming mountain villages define the Swiss Alps. World-class skiing in winter and spectacular hiking trails in summer, with iconic peaks like the Matterhorn and Jungfrau as breathtaking backdrops.",
                  priceRange: "$$$", rating: 4.9, bestSeason: "June - Sept / Dec - March", durationSuggestion: "7-10 days"),
            Place(id: "MT002", name: "Himalayas, Nepal", categoryId: "mountains", category: "Mountains",
                  country: "Nepal", description: "Home to eight of the world's fourteen highest peaks including Mount Everest. Nepal offers trekking adventures from the famous Annapurna Circuit to Everest Base Camp, along with ancient temples, vibrant culture, and warm Himalayan hospitality.",
                  priceRange: "$", rating: 4.7, bestSeason: "October - November", durationSuggestion: "10-14 days"),
            Place(id: "MT003", name: "Banff, Canada", categoryId: "mountains", category: "Mountains",
                  country: "Canada", description: "Stunning Canadian Rockies scenery with turquoise glacial lakes like Lake Louise and Moraine Lake. Banff National Park offers hiking, wildlife viewing, hot springs, and world-class skiing in a pristine wilderness setting.",
                  priceRange: "$$", rating: 4.6, bestSeason: "June - September", durationSuggestion: "5-7 days"),
            Place(id: "MT004", name: "Patagonia", categoryId: "mountains", category: "Mountains",
                  country: "Argentina / Chile", description: "A wild frontier of dramatic granite peaks, massive glaciers, and pristine lakes at the southern tip of South America. Torres del Paine and Los Glaciares national parks offer some of the most spectacular trekking on Earth.",
                  priceRange: "$$", rating: 4.8, bestSeason: "October - March", durationSuggestion: "7-12 days"),

            // Cities
            Place(id: "CT001", name: "Tokyo, Japan", categoryId: "cities", category: "Cities",
                  country: "Japan", description: "A dazzling blend of ultramodern and traditional, Tokyo offers neon-lit skyscrapers alongside serene temples and gardens. Experience world-class cuisine from street ramen to Michelin-starred sushi, vibrant pop culture districts, and impeccable public transit.",
                  priceRange: "$$", rating: 4.8, bestSeason: "March - May / Oct - Nov", durationSuggestion: "5-7 days"),
            Place(id: "CT002", name: "Paris, France", categoryId: "cities", category: "Cities",
                  country: "France", description: "The City of Light enchants with iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Stroll along the Seine, savor exquisite pastries in charming cafes, and explore world-class art and fashion.",
                  priceRange: "$$$", rating: 4.7, bestSeason: "April - June / Sept - Oct", durationSuggestion: "5-7 days"),
            Place(id: "CT003", name: "New York City, USA", categoryId: "cities", category: "Cities",
                  country: "United States", description: "The city that never sleeps offers iconic experiences: Times Square, Central Park, the Statue of Liberty, Broadway shows, and an incredible food scene representing every cuisine on the planet. Each borough has its own distinct character.",
                  priceRange: "$$$", rating: 4.6, bestSeason: "April - June / Sept - Nov", durationSuggestion: "5-7 days"),
            Place(id: "CT004", name: "Barcelona, Spain", categoryId: "cities", category: "Cities",
                  country: "Spain", description: "A Mediterranean gem where Gaudi's whimsical architecture meets beautiful beaches. Explore the Gothic Quarter, marvel at La Sagrada Familia, enjoy tapas on Las Ramblas, and experience the vibrant nightlife and rich Catalan culture.",
                  priceRange: "$$", rating: 4.5, bestSeason: "May - June / Sept - Oct", durationSuggestion: "4-6 days"),

            // Historical
            Place(id: "HI001", name: "Rome, Italy", categoryId: "historical", category: "Historical",
                  country: "Italy", description: "The Eternal City is a living museum with ancient ruins like the Colosseum and Roman Forum standing alongside Renaissance masterpieces. Toss a coin in the Trevi Fountain, visit Vatican City, and indulge in authentic Italian cuisine at every corner.",
                  priceRange: "$$", rating: 4.8, bestSeason: "April - June / Sept - Oct", durationSuggestion: "5-7 days"),
            Place(id: "HI002", name: "Machu Picchu, Peru", categoryId: "historical", category: "Historical",
                  country: "Peru", description: "The legendary Lost City of the Incas perched high in the Andes Mountains. This 15th-century citadel showcases remarkable Incan engineering and architecture, surrounded by mist-shrouded peaks and accessible via the iconic Inca Trail.",
                  priceRange: "$$", rating: 4.9, bestSeason: "May - September", durationSuggestion: "3-5 days"),
            Place(id: "HI003", name: "Cairo & Giza, Egypt", categoryId: "historical", category: "Historical",
                  country: "Egypt", description: "Home to the last remaining Wonder of the Ancient World, the Great Pyramids of Giza and the enigmatic Sphinx. Explore the Egyptian Museum's treasures, sail the Nile, and discover the rich history of one of the world's oldest civilizations.",
                  priceRange: "$", rating: 4.5, bestSeason: "October - April", durationSuggestion: "5-7 days"),
            Place(id: "HI004", name: "Kyoto, Japan", categoryId: "historical", category: "Historical",
                  country: "Japan", description: "Japan's cultural heart with over 2,000 temples and shrines, traditional tea houses, and stunning bamboo groves. Experience geisha culture in Gion, stroll through the iconic Fushimi Inari gates, and witness the beauty of cherry blossom season.",
                  priceRange: "$$", rating: 4.7, bestSeason: "March - May / Oct - Nov", durationSuggestion: "4-5 days"),

            // Adventure
            Place(id: "AD001", name: "Queenstown, New Zealand", categoryId: "adventure", category: "Adventure",
                  country: "New Zealand", description: "The adventure capital of the world set against stunning South Island scenery. Bungee jumping, skydiving, jet boating, white-water rafting, and paragliding are just a few of the adrenaline-pumping activities available, with the Remarkables mountain range as a backdrop.",
                  priceRange: "$$", rating: 4.7, bestSeason: "December - February", durationSuggestion: "5-7 days"),
            Place(id: "AD002", name: "Costa Rica", categoryId: "adventure", category: "Adventure",
                  country: "Costa Rica", description: "A biodiversity hotspot with dense rainforests, active volcanoes, and both Pacific and Caribbean coastlines. Zip-line through cloud forests, surf perfect waves, hike active volcanoes, and spot exotic wildlife from sloths to toucans.",
                  priceRange: "$$", rating: 4.6, bestSeason: "December - April", durationSuggestion: "7-10 days"),
            Place(id: "AD003", name: "Iceland", categoryId: "adventure", category: "Adventure",
                  country: "Iceland", description: "The Land of Fire and Ice offers otherworldly landscapes: erupting geysers, dramatic waterfalls, volcanic black sand beaches, and the mesmerizing Northern Lights. Explore ice caves, soak in geothermal hot springs, and drive the famous Ring Road.",
                  priceRange: "$$$", rating: 4.8, bestSeason: "June - Aug / Sept - March", durationSuggestion: "7-10 days"),
            Place(id: "AD004", name: "Kruger National Park", categoryId: "adventure", category: "Adventure",
                  country: "South Africa", description: "One of Africa's largest game reserves, home to the Big Five: lions, leopards, rhinos, elephants, and buffalo. Experience guided safari drives, walking safaris, and unforgettable wildlife encounters in the heart of the South African bushveld.",
                  priceRange: "$$", rating: 4.7, bestSeason: "May - September", durationSuggestion: "4-6 days"),

            // Islands
            Place(id: "IS001", name: "Bora Bora", categoryId: "islands", category: "Islands",
                  country: "French Polynesia", description: "Often called the most beautiful island in the world, Bora Bora features a stunning turquoise lagoon surrounded by motus (small islets). Iconic overwater bungalows, incredible snorkeling with manta rays, and Mount Otemanu create a dreamy paradise.",
                  priceRange: "$$$", rating: 4.9, bestSeason: "May - October", durationSuggestion: "5-7 days"),
            Place(id: "IS002", name: "Seychelles", categoryId: "islands", category: "Islands",
                  country: "Republic of Seychelles", description: "An archipelago of 115 islands in the Indian Ocean with the world's most photogenic beaches. Giant granite boulders frame pristine shores, while lush tropical forests are home to rare species like the giant Aldabra tortoise.",
                  priceRange: "$$$", rating: 4.7, bestSeason: "April - May / Oct - Nov", durationSuggestion: "7-10 days"),
            Place(id: "IS003", name: "Fiji", categoryId: "islands", category: "Islands",
                  country: "Republic of Fiji", description: "An archipelago of more than 330 islands famous for rugged landscapes, palm-lined beaches, and coral reefs with clear lagoons. Fijian culture is warm and welcoming, with traditional kava ceremonies and village visits adding cultural depth.",
                  priceRange: "$$", rating: 4.5, bestSeason: "May - October", durationSuggestion: "7-10 days"),
            Place(id: "IS004", name: "Galápagos Islands", categoryId: "islands", category: "Islands",
                  country: "Ecuador", description: "A living laboratory of evolution where unique wildlife shows no fear of humans. Swim with sea lions, walk among giant tortoises, observe blue-footed boobies, and snorkel with marine iguanas in this UNESCO World Heritage archipelago.",
                  priceRange: "$$$", rating: 4.9, bestSeason: "June - November", durationSuggestion: "7-10 days")
        ]
    }
}
