const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.resolve(__dirname, 'database.db');
let db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to the SQLite database.');
        seedProducts();
    }
});

const seedProducts = () => {
  const products=  [

        {
          "id": 9,
          "name": "Bluetooth Speaker",
          "description": "Enjoy rich, immersive sound with our portable Bluetooth speaker. Engineered for superior audio performance, it features deep bass, clear mids, and crisp highs that bring your music to life. Its compact and rugged design makes it perfect for outdoor adventures, and the built-in Bluetooth connectivity allows for seamless pairing with your smartphone or tablet. The water-resistant build ensures durability in various weather conditions, making it ideal for beach trips, picnics, and more.",
          "price": 59.99,
          "stock": 180,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722685738/dd7e8a90-aa13-488d-a2fe-0e2bd4dc8f3e_d7dpkn.webp"
        },
      
        {
          "id": 11,
          "name": "Smart Home Assistant",
          "description": "Transform your home into a smart home with our voice-controlled smart assistant. This device integrates with your home automation system, allowing you to control lights, thermostats, and other smart devices using simple voice commands. The assistant also provides real-time information, such as weather updates, news, and traffic alerts, making it a valuable addition to your daily routine. Its sleek design and high-quality speaker ensure that it blends seamlessly into any room while delivering clear and accurate responses.",
          "price": 99.99,
          "stock": 220,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722689578/ultimate-guide-to-the-best-smart-home-assistant-for-him-1709176982-1280x720_mdgbyx.jpg"
        },
        {
          "id": 12,
          "name": "Electric Toothbrush",
          "description": "Achieve a superior clean with our advanced electric toothbrush. Featuring multiple brushing modes and a built-in timer, it helps you maintain optimal oral hygiene by ensuring that you brush for the recommended amount of time. The powerful motor delivers high-frequency brushing movements that effectively remove plaque and reduce gum inflammation. The rechargeable battery offers long-lasting performance, and the ergonomic handle ensures a comfortable grip. Ideal for families, this toothbrush comes with multiple brush heads for personalized care.",
          "price": 69.99,
          "stock": 300,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686104/electric-toothbrush_ckezlz.jpg"
        },
  
        {
            "id": 41,
            "name": "Apple Iphone",
            "description": "The iPhone joined several competing products in the smartphone market, and critics and fans alike noted that it offered few truly original features. The main appeal of the iPhone was its incorporation of intuitive software and a simplified appealing interface, as well as the capacity to accommodate new user-selected software. More than 100 million applications (or “apps”) were downloaded in the first 60 days after Apple opened its online iPhone App Store in 2008, and by January 2010 more than three billion apps had been downloaded from the store.",
            "price": 782000,
            "stock": 300,
            "image_url": " https://res.cloudinary.com/dyjmh036b/image/upload/v1722684774/31MZVlSW1KL._SY445_SX342_QL70_FMwebp__abcdry.webp"
          },
       

      
        {
          "id": 36,
          "name": "Instant Pot",
          "description": "Prepare delicious meals quickly with our versatile Instant Pot. This multi-function cooker combines the capabilities of a pressure cooker, slow cooker, rice cooker, and more in one compact appliance. The user-friendly interface and programmable settings make it easy to cook a variety of dishes, from soups and stews to grains and yogurt. With its energy-efficient design and fast cooking times, the Instant Pot is perfect for busy families and home cooks looking for convenience and versatility.",
          "price": 99.99,
          "stock": 55,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722689668/shopping_ywmj4z.webp"
        },
              {
          "id": 18,
          "name": "Pressure Cooker",
          "description": "Prepare meals quickly and efficiently with our stainless steel pressure cooker. Designed for durability and performance, it features a robust construction and multiple safety mechanisms to ensure safe operation. The pressure cooker allows you to cook a variety of dishes, from soups and stews to meats and grains, in a fraction of the time compared to traditional cooking methods. Its large capacity is perfect for family meals, and the included recipes provide inspiration for delicious and nutritious meals.",
          "price": 89.99,
          "stock": 120,
         "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686270/41XXUC41gpL._SX300_SY300_QL70_FMwebp__xq5lhj.webp"
        },
           {
          "id": 29,
          "name": "Bookcase",
          "description": "Organize your books and display your favorite items with our elegant bookcase. Featuring multiple shelves and a sturdy construction, it provides ample storage space for books, decor, and more. The versatile design complements various interior styles, from modern to traditional, and the high-quality finish adds a touch of sophistication to your home. Ideal for living rooms, offices, or libraries, this bookcase helps you keep your space tidy and stylish.",
          "price": 119.99,
          "stock": 70,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722684774/31MZVlSW1KL._SY445_SX342_QL70_FMwebp__abcdry.webp"
        },
        {
          "id": 38,
          "name": "Digital Picture Frame",
          "description": "Display your favorite photos in a beautiful and dynamic way with our digital picture frame. Featuring a high-resolution display, it showcases your images with vibrant colors and sharp detail. The frame supports various formats and can be updated remotely via Wi-Fi, allowing you to add and change photos effortlessly. With its sleek design and intuitive interface, it makes a thoughtful gift for family and friends, or a stylish addition to your own home decor.",
          "price": 119.99,
          "stock": 60,
           "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686262/beautiful-golden-flower-and-waves-canvas-wall-painting-PTVCH_2760_1_wiiymd.jpg"
        },
        {
          "id": 39,
          "name": "Professional Blender",
          "description": "Achieve culinary perfection with our professional-grade blender. Designed for both home cooks and chefs, it features a powerful motor and durable blades for blending, chopping, and pureeing a wide range of ingredients. The variable speed settings and pre-programmed functions offer precision and versatility, making it ideal for creating smoothies, soups, sauces, and more. The easy-to-clean pitcher and sleek design add convenience and style to your kitchen countertop.",
          "price": 159.99,
          "stock": 75,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686196/319Xp6ptC4L._SY300_SX300_QL70_FMwebp__zspa44.webp"
        },
         {
          "id": 6,
          "name": "Smartphone Case",
          "description": "Protect your smartphone with our durable and stylish case, designed to safeguard your device from drops, scratches, and daily wear. Made from high-quality materials, this case features shock-absorbing technology and a precise fit that ensures easy access to all buttons and ports. The sleek design adds minimal bulk while enhancing the overall look of your phone. Available in a variety of colors and patterns, it combines functionality with fashion to keep your smartphone looking new and feeling secure.",
          "price": 15.99,
          "stock": 300,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722685979/61NmuZk255L._SL1500__hjzxuj.jpg"
        },
       {
          "id": 4,
          "name": "Gaming Laptop",
          "description": "Take your gaming to the next level with our high-performance gaming laptop. Equipped with a powerful GPU and a fast processor, it delivers exceptional graphics and smooth gameplay for even the most demanding titles. The laptop features a high-resolution display with a fast refresh rate, ensuring that every detail is rendered with stunning clarity. With customizable RGB lighting and an advanced cooling system, this gaming laptop combines performance and style to give you the ultimate gaming experience.",
          "price": 1299.99,
          "stock": 25,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722685940/81heRX4rMaL._SX679__nvj5ab.jpg"
        },

          {
          "id": 3,
          "name": "4K Ultra HD TV",
          "description": "Transform your living room into a cinematic experience with our 55-inch 4K Ultra HD TV. Featuring stunning resolution and vivid color accuracy, this television provides breathtaking visuals and an immersive viewing experience. The smart TV functionality allows you to access popular streaming services, browse the internet, and enjoy a wide range of entertainment options. With its slim profile and elegant design, it seamlessly fits into any modern home decor, making it a centerpiece of your entertainment setup.",
          "price": 499.99,
          "stock": 30,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722685908/pd2705u-front-high_lxazoc.png"
        },

        {
          "id": 7,
          "name": "Portable Charger",
          "description": "Never run out of power on the go with our compact portable charger. Featuring high-capacity battery cells and fast charging technology, this portable charger ensures that your devices stay powered up throughout the day. Its slim design easily fits into your pocket or bag, making it convenient to carry wherever you go. With multiple charging ports, it can charge several devices simultaneously, making it a must-have accessory for travel, work, or emergencies.",
          "price": 29.99,
          "stock": 250,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686023/81Qn0AntpJL._SL1500__hgqff3.jpg"
        },

        {
          "id": 10,
          "name": "Digital Camera",
          "description": "Capture every moment in stunning detail with our high-resolution digital camera. Equipped with interchangeable lenses and advanced imaging technology, this camera delivers exceptional image quality and versatility for both amateur and professional photographers. The intuitive controls and high-definition viewfinder make it easy to frame and shoot your subject, while the built-in Wi-Fi allows for quick sharing and backup of your photos. Ideal for travel, events, and everyday photography, it is a reliable tool for capturing your memories.",
          "price": 899.99,
          "stock": 40,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686097/GW41.0104-1-518x518_v0kzop.jpg"
        },

          {
          "id": 14,
          "name": "Laptop Stand",
          "description": "Enhance your workspace ergonomics with our adjustable laptop stand. Crafted from durable materials, this stand elevates your laptop to eye level, reducing neck and back strain. The adjustable height and tilt settings allow for customizable positioning, ensuring that you maintain a comfortable and healthy posture while working. Its compact and foldable design makes it easy to transport and store, making it a practical accessory for both home and office use.",
          "price": 39.99,
          "stock": 160,
        "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722686155/51tmSHBx7PL._SX300_SY300_QL70_FMwebp__pdwl78.webp"
        },
        {
          "id": 5,
          "name": "Wireless Keyboard and Mouse Set",
          "description": "Upgrade your workspace with our ergonomic wireless keyboard and mouse set. Designed for comfort and efficiency, the keyboard features quiet, responsive keys and an adjustable tilt for optimal typing posture. The matching mouse offers precise tracking and customizable buttons to streamline your workflow. With long battery life and easy wireless connectivity, this set helps reduce cable clutter and enhances your productivity. Ideal for both home and office use, it brings a touch of modern convenience to your computer setup.",
          "price": 49.99,
          "stock": 200,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722685971/hx-kb7aqx-us-image-main-600x600_1920x_gy8ijy.jpg"
        },
     {
          "id": 8,
          "name": "Fitness Tracker",
          "description": "Stay on top of your health and fitness goals with our advanced fitness tracker. This sleek and lightweight device monitors your heart rate, tracks your steps, and provides insights into your sleep patterns. With customizable workout modes and real-time notifications, it helps you stay motivated and informed throughout your fitness journey. The waterproof design allows you to wear it while swimming or showering, and its long battery life ensures you can track your progress without frequent recharging.",
          "price": 79.99,
          "stock": 140,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722684934/MP000000014997901_437Wx649H_202210231501102_y0ycfd.jpg"
        },
         {
          "id": 17,
          "name": "Electric Kettle",
          "description": "Boil water quickly and efficiently with our electric kettle. Featuring a rapid boiling function, it heats up water in just minutes, making it perfect for tea, coffee, and instant meals. The variable temperature control allows you to select the ideal temperature for different beverages, while the automatic shut-off function ensures safety by preventing overheating. The kettle's sleek design and ergonomic handle make it easy to use, and its cordless operation provides convenient pouring without tangled cords.",
          "price": 49.99,
          "stock": 200,
          "image_url": "https://res.cloudinary.com/dyjmh036b/image/upload/v1722689754/31vZwcN6ceS._SY300_SX300_QL70_FMwebp__zn2igx.webp"
        },
  ]
        

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)');

        products.forEach(product => {
            stmt.run(product.name, product.description, product.price, product.stock, product.image_url);
        });

        stmt.finalize(() => {
            console.log('Dummy data seeded into products table.');
            db.close();
        });
    });
};