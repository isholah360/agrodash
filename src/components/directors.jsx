import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageCarousel() {
  const directors = [
    {
      image: "/h.jpg",
      name: "Mr. Olatoye W. A",
      department: "Dir. of Agricultural Engineering Services",
    },
    {
      image: "/taofic.jpg",
      name: "Mr Lawal Taofeek Dele",
      department: "Director of Fisheries",
    },
    {
      image: "/ramp.jpg",
      name: "Engr. Tunde Afolabi",
      department: "State project coordinator, RAAMP",
    },
    {
      image: "/ramon.jpg",
      name: "Mr. A. Ramoni",
      department: "Director, Rural Development",
    },
    {
      image: "/azeez.jpg",
      name: "Dr. (Mrs.) L. S. Azeez",
      department: "Director, Veterinary Services",
    },
    {
      image: "/roland.jpg",
      name: "Mr. Adekunle Rowland A.",
      department: "H. o. U. OYSAISU",
    },
    {
      image: "/statistic.jpg",
      name: "Mrs. Adeniran-Adediran F. O.",
      department: "Director, Planning Research & Statistics",
    },
    {
      image: "/ajisafe.jpg",
      name: "Mrs. Ajisafe A. A.",
      department: "Director, Crop & Farm Settlement",
    },
    {
      image: "/bunmi.jpg",
      name: "Mrs. Bunmi Aderibigbe",
      department: "Director, Finance & Accounts",
    },
    {
      image: "/bakare.jpg",
      name: "Mr Bakare O. K.",
      department: "Director, Produce Services",
    },
    {
      image: "/ewetola.jpg",
      name: "Mr. A. P. Ewetola",
      department: "Director, Rural Community Development Centre",
    },
    {
      image: "/gafar.jpg",
      name: "Mr Gbadamosi Biodun Gafar",
      department: "Coordinating Director, Tree Crops Development Unit",
    },
    {
      image: "/ezekiel.jpg",
      name: "Mr. Ezekiel O. A.",
      department: "Director, Regulation & Enforcement",
    },
  ];

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-[-3rem] z-10 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-300"
    >
      <FaChevronRight size={18} />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-[-3rem] z-10 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition duration-300"
    >
      <FaChevronLeft size={18} />
    </button>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-1 pt-5">
      <Slider {...settings}>
        {directors.map((director, index) => (
          <div key={index} className="px-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img
                src={director.image}
                alt={director.name}
                className="h-full w-full object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {director.name}
                </h3>
                <p className="text-sm text-green-600 font-medium">
                  {director.department}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
