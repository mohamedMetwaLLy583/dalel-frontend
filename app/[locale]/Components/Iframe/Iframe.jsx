import React from "react";

export default function Iframe() {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1830267.9923965256!2d43.148389650000006!3d26.36719995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x157f59ad6fe2be3b%3A0xe1fb621d3b0d00aa!2sAl%20Qassim%20Province%20Saudi%20Arabia!5e0!3m2!1sen!2seg!4v1735739001975!5m2!1sen!2seg"
      className="w-full h-[305px] md:h-[513px]"
      style={{ borderRadius: "8px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}
