const SocialLinks = ({ styles, data }) => {
  return (
    <div className={` ${styles}`}>
      {data.facebook && (
        <a href={data.facebook} target="_blank">
          <img src="/Preheader/socials/facebook.svg" alt={"facebook"} />
        </a>
      )}
      {data.x && (
        <a href={data.x} target="_blank">
          <img src="/Preheader/socials/x.svg" alt={"x"} />
        </a>
      )}
      {data.instagram && (
        <a href={data.instagram} target="_blank">
          <img src="/Preheader/socials/insta.svg" alt={"instagram"} />
        </a>
      )}
      {data.linkedin && (
        <a href={data.linkedin} target="_blank">
          <img src="/Preheader/socials/linkedin.svg" alt={"instagram"} />
        </a>
      )}
      {data.whatsapp && (
        <a href={`https://wa.me/${data.whatsapp}`} target="_blank">
          <img src="/Preheader/socials/whatsapp.svg" alt={"whatsapp"} />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
