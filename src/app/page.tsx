"use client"
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavbarLayoutFloatingOverlay from '@/components/navbar/NavbarLayoutFloatingOverlay/NavbarLayoutFloatingOverlay';
import HeroBillboard from '@/components/sections/hero/HeroBillboard';
import TextSplitAbout from '@/components/sections/about/TextSplitAbout';
import ProductCardOne from '@/components/sections/product/ProductCardOne';
import ContactCenter from '@/components/sections/contact/ContactCenter';
import FooterBaseReveal from '@/components/sections/footer/FooterBaseReveal';

const assetMap = [{"id":"hero-image","url":"https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/coffee-shop-interior-1760910347227-cddddf1d.jpg","alt":"coffee shop interior"},{"id":"about-image","url":"https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/friendly-barista-serving-coffee-1760910353081-3dc7aabe.jpg","alt":"friendly barista serving coffee"},{"id":"menu-item-1","url":"https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/latte-coffee-art-1760910356386-e5a54fa4.jpg","alt":"latte coffee art"},{"id":"menu-item-2","url":"https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/cappuccino-on-table-1760910359859-1b1fda51.jpg","alt":"cappuccino on table"},{"id":"footer-logo","url":"https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/coffee-shop-logo-1760910365613-e1b82680.jpg","alt":"coffee shop logo"}];

export default function Home() {
  return (
    <ThemeProvider
      defaultButtonVariant="slide-background"
      defaultTextAnimation="reveal-blur"
      borderRadius="sharp"
    >
      <div id="nav" data-section="nav">
        <NavbarLayoutFloatingOverlay
          navItems={[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Menu", id: "menu" },
            { name: "Contact", id: "contact" }
          ]}
          brandName="Coffee Shop"
        />
      </div>
      <div id="hero" data-section="hero" className="scroll-mt-24">
        <div className="mx-auto px-4 md:px-6">
          <HeroBillboard
            title="Welcome to Our Coffee Shop"
            description="Experience the finest coffee crafted with passion. Savor the moment with us."
            imageSrc="https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/coffee-shop-interior-1760910347227-cddddf1d.jpg"
            buttons={[{ text: "See Our Menu", href: "menu" }]}
          />
        </div>
      </div>
      <div id="about" data-section="about" className="scroll-mt-24">
        <div className="mx-auto px-4 md:px-6">
          <TextSplitAbout
            title="About Us"
            description={[
              "At our coffee shop, we believe in the art of crafting the perfect cup.",
              "Our mission is to provide a unique coffee experience to every customer."
            ]}
            buttons={[{ text: "Our Story", href: "about" }]}
          />
        </div>
      </div>
      <div id="product" data-section="product" className="scroll-mt-24">
        <div className="mx-auto px-4 md:px-6">
          <ProductCardOne
            products={[
              { id: "1", name: "Latte", price: "$3", imageSrc: "https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/latte-coffee-art-1760910356386-e5a54fa4.jpg" },
              { id: "2", name: "Cappuccino", price: "$4", imageSrc: "https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/cappuccino-on-table-1760910359859-1b1fda51.jpg" }
            ]}
            title="Our Menu"
          />
        </div>
      </div>
      <div id="contact" data-section="contact" className="scroll-mt-24">
        <div className="mx-auto px-4 md:px-6">
          <ContactCenter
            tag="Contact Us"
            title="Stay in Touch"
            description="Join our newsletter for updates and exclusive offers."
            inputPlaceholder="Your email address"
            buttonText="Subscribe"
          />
        </div>
      </div>
      <div id="footer" data-section="footer" className="scroll-mt-24">
        <div className="mx-auto px-4 md:px-6">
          <FooterBaseReveal
            columns={[
              { title: "Quick Links", items: [{ label: "Home", href: "home" }, { label: "Menu", href: "menu" }] },
              { title: "Contact", items: [{ label: "Email", href: "contact" }, { label: "Phone", href: "tel:+123456789" }] }
            ]}
            logoSrc="https://webuild-dev.s3.eu-north-1.amazonaws.com/users/user_346q1PwyWBLFgxn5R5gWYFVRO0Y/tmp/coffee-shop-logo-1760910365613-e1b82680.jpg"
            copyrightText="© 2025 Coffee Shop"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}