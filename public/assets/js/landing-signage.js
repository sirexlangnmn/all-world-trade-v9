// Define an array of objects containing name and image source
const signageCard = [
  {
    name: "Acrylic Signage",
    imageSrc: "uploads/signage/acrylic_signage.jpg"
  },
  {
    name: "Advertising",
    imageSrc: "uploads/signage/advertising.jpg"
  },
  {
    name: "Billboards",
    imageSrc: "uploads/signage/billboards.jpg"
  },
  {
    name: "Digital Signage",
    imageSrc: "uploads/signage/digital_signage.jpg"
  },
  {
    name: "Embroidery",
    imageSrc: "uploads/signage/embroidery.jpg"
  },
  {
    name: "Etching, Engraving & Carving",
    imageSrc: "uploads/signage/EtchingEngravingCarving.jpg"
  },
  {
    name: "Glass Signage",
    imageSrc: "uploads/signage/glass_signage.jpg"
  },
  {
    name: "LEDs / LED Walls",
    imageSrc: "uploads/signage/LED_walls.jpg"
  },
  {
    name: "Metal Signage",
    imageSrc: "uploads/signage/metal_signage.jpg"
  },
  {
    name: "Neon Sign",
    imageSrc: "uploads/signage/neon_sign.jpg"
  },
  {
    name: "Outdoor Signage",
    imageSrc: "uploads/signage/outdoor_signage.jpg"
  },
  {
    name: "Panaflex Signage",
    imageSrc: "uploads/signage/panaflex_signage.jpg"
  },
  {
    name: "Promotional Products",
    imageSrc: "uploads/signage/promotional_products.jpg"
  },
  {
    name: "Retail Signage",
    imageSrc: "uploads/signage/retail_signage.jpg"
  },
  {
    name: "Signage Supplies",
    imageSrc: "uploads/signage/signage_supplies.jpg"
  },
];

// Get a reference to the container where you want to append the cards
const container = document.getElementById("signageCardContainer");

// Loop through the signageCard array and generate HTML cards
signageCard.forEach((item) => {
  const signageCardHtml = `
    <div class="card">
      <div class="relative w-full h-56 overflow-hidden rounded-md">
        <div class="absolute z-10 w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800"></div>
        <img src="${item.imageSrc}" class="absolute object-cover w-full h-full" alt="">
        <div class="absolute bottom-0 z-20 w-full p-3 text-lg font-semibold text-black hover:text-blue-900">${item.name}</div>
      </div>
    </div>
  `;

  // Append the card HTML to the container
  container.insertAdjacentHTML('beforeend', signageCardHtml);
});
