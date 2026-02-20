const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Best Sellers", "Offers & Deals", "Contact Us", "FAQs"],
    },
    {
      title: "Need Help?",
      links: [
        "Delivery Information",
        "Return & Refund Policy",
        "Payment Methods",
        "Track your Order",
        "Contact Us",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "Facebook", "YouTube"],
    },
  ];

  return (
    <footer className="bg-white border-t mt-20 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-700">
          {/* Brand */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              Fresh Cart
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Your one-stop shop for fresh groceries and everyday essentials.
              Enjoy seamless online shopping with fast delivery and unbeatable
              prices.
            </p>
          </div>

          {/* Links */}
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 border-t pt-6 text-center text-sm text-gray-500">
          <p>
            © 2025 <span className="text-indigo-600 font-medium">Fresh Cart</span> — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;