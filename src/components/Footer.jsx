const Footer = () => {
  return (
    <>
      <footer className="footer footer-center bg-base-200 border-t border-base-300 text-base-content/40 p-6 text-sm">
        <div>
          <p>© {new Date().getFullYear()} devTinder — Built for developers, by developers.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
