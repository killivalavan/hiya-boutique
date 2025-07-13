import React from 'react';

export const TermsOfService: React.FC = () => (
  <div>
    <p className="mb-2">
      By accessing or using Hiya Fashions & Boutique’s website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
    </p>
    <p className="mb-2">
      All designs, images, and content on our site are the exclusive property of Hiya Fashions & Boutique. Any unauthorized use, reproduction, or distribution of our content is strictly prohibited and may result in legal action.
    </p>
    <p className="mb-2">
      We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services following any changes constitutes your acceptance of the new terms.
    </p>
    <p>
      For questions regarding these terms, please contact us directly. Thank you for choosing Hiya Fashions & Boutique.
    </p>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <div>
    <p className="mb-2">
      At Hiya Fashions & Boutique, your privacy is very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you interact with our website, visit our store, or communicate with us.
    </p>

    <h4 className="font-semibold mt-4 mb-2">Information We Collect</h4>
    <ul className="list-disc pl-5 mb-2">
      <li>Your name, phone number, and email address</li>
      <li>Delivery address and order preferences</li>
      <li>Details shared when contacting us on WhatsApp, phone, or email</li>
    </ul>

    <h4 className="font-semibold mt-4 mb-2">How We Use Your Information</h4>
    <ul className="list-disc pl-5 mb-2">
      <li>To process orders and custom stitching</li>
      <li>To communicate updates or handle inquiries</li>
      <li>To improve our services and tailor our collections</li>
    </ul>

    <h4 className="font-semibold mt-4 mb-2">Data Security</h4>
    <p className="mb-2">
      We never sell or share your personal information with third parties. Your data is kept secure and confidential, used only to serve you better.
    </p>

    <p>
      By using our services, you consent to this policy. For any concerns, please reach out to us directly.
    </p>
  </div>
);

export const ShippingPolicy: React.FC = () => (
  <div>
    <p className="mb-2">
      Our boutique primarily handles orders through direct visits and WhatsApp communication. For special cases requiring shipping, we will discuss and confirm delivery timelines and methods with you personally.
    </p>
    <p className="mb-2">
      We carefully package each order to ensure your items arrive in perfect condition. Shipping charges and delivery estimates will be clearly communicated before finalizing your order.
    </p>
    <p>
      For any questions about shipping, please contact us anytime.
    </p>
  </div>
);

export const RefundPolicy: React.FC = () => (
  <div>
    <p className="mb-2">
      As we specialize in custom-made and personalized boutique services, refunds are generally not applicable once an order is placed and work has commenced.
    </p>
    <p className="mb-2">
      However, customer satisfaction is extremely important to us. If there are any concerns with your order, please inform us immediately so we can address and resolve the issue.
    </p>
    <p>
      Thank you for understanding and supporting handcrafted, custom work.
    </p>
  </div>
);

export const HowToOrder: React.FC = () => (
  <div>
    <p className="mb-2">
      Ordering from Hiya Fashions & Boutique is simple and personal:
    </p>
    <ul className="list-disc pl-5 mb-2">
      <li>Browse our collections and services on the website.</li>
      <li>Contact us directly via WhatsApp or visit our boutique to discuss your needs.</li>
      <li>We’ll guide you through design selection, measurements, and timelines.</li>
    </ul>
    <p>
      We’re here to make your shopping experience comfortable and fully customized.
    </p>
  </div>
);

export const policyMap = {
  "Terms of Service": <TermsOfService />,
  "Privacy Policy": <PrivacyPolicy />,
  "Shipping Policy": <ShippingPolicy />,
  "Refund Policy": <RefundPolicy />,
  "How to Order": <HowToOrder />,
};