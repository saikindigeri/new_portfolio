import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  const images = [
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130597/WhatsApp_Image_2024-08-08_at_8.11.37_PM_x4g86e.jpg', alt: 'Project 1' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130575/WhatsApp_Image_2024-08-08_at_8.12.13_PM_las7g3.jpg', alt: 'Project 2' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130548/WhatsApp_Image_2024-08-08_at_8.15.14_PM_ytuggy.jpg', alt: 'Project 3' },
   
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130451/WhatsApp_Image_2024-08-08_at_8.44.22_PM_n21obc.jpg', alt: 'Project 7' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130502/WhatsApp_Image_2024-08-08_at_8.17.49_PM_gs9qlc.jpg', alt: 'Project 8' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130511/WhatsApp_Image_2024-08-08_at_8.17.23_PM_mrvwyn.jpg', alt: 'Project 7' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130424/WhatsApp_Image_2024-08-08_at_8.44.22_PM_2_wtsiz4.jpg', alt: 'Project 8' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130579/WhatsApp_Image_2024-08-08_at_8.11.51_PM_hjmtjl.jpg', alt: 'Project 8' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130470/WhatsApp_Image_2024-08-08_at_8.29.05_PM_1_hz7ncx.jpg', alt: 'Project 1' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130475/WhatsApp_Image_2024-08-08_at_8.27.56_PM_txanwn.jpg', alt: 'Project 2' },
    { url: 'https://res.cloudinary.com/dyjmh036b/image/upload/v1723130555/WhatsApp_Image_2024-08-08_at_8.13.47_PM_elcqlu.jpg', alt: 'Project 3' },
   
  ];
  const duplicateImages = [...images, ...images]; 
  return (
    <section className="portfolio text-center">
      <h2 className='name-title'>My Portfolio</h2>
      <div className="portfolio-container">
        {duplicateImages.map((image, index) => (
          <div key={index} className="portfolio-item">
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
