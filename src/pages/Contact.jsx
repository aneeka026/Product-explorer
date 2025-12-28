import { useState } from "react";
import "./Contact.css";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times vary by region.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking link via email.",
  },
  {
    question: "How can I apply a discount or promo code?",
    answer:
      "You can enter your promo code at checkout before completing payment.",
  },
  {
    question: "What sizes do you offer and how do I choose?",
    answer:
      "We offer XS to XL. Refer to our size guide on the product page.",
  },
  {
    question: "What is your return and exchange policy?",
    answer:
      "Returns are accepted within 14 days of delivery in original condition.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can email us at hello@productexplorer.com for any assistance.",
  },
];

const Contact = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>

      <section className="contact-hero">
        <div className="contact-overlay"></div>
        <h1>Contact Us</h1>
      </section>

      {/* section1 */}
      <section className="contact-content">
        <div className="contact-left">
          <span className="contact-tag">(Contact us)</span>
          <h2>We'd Love to Hear from You</h2>
        </div>

        <div className="contact-right">
          <span className="contact-label">(Address)</span>
          <p>
            lorem 241,<br />
            lorem EA LOREM<br />
            The Netherlands
          </p>

          <span className="contact-label">(Socials)</span>
          <p>
            Instagram<br />
            Twitter (X) <br />
            Facebook
          </p>

          <span className="contact-label">(Customer Support)</span>
          <p>hello@productexplorer.com</p>

          <span className="contact-label">(Partnerships & Collaborations)</span>
          <p>collab@productexplorer.com</p>

          <span className="contact-label">(Phone)</span>
          <p>+91 99 123 4567</p>
        </div>
      </section>

      {/* section2 */}
      <section className="contact-section">
        <div className="contact-card faq1">
          <div className="overlay"></div>
        </div>

        <div className="contact-card faq2">
          <div className="overlay"></div>
        </div>
      </section>

    {/* section3 */}
    <section className="faq-section" id="faq">
      <div className="faq-left">
        <span className="faq-tag">(FAQ)</span>
        <h2>
          Quick Answers
          <br />
          to Common Questions
        </h2>
      </div>

      <div className="faq-right">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <p>{faq.question}</p>
              <span className="arrow">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>

    </>
  );
};

export default Contact;
