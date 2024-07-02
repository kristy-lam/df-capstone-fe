import fbIcon from "/assets/facebook.png";
import igIcon from "/assets/instagram.png";
import waIcon from "/assets/whatsapp.png";

const Footer = () => {
  return (
    <footer className="card" id="footer" data-testid="footer">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className=".flex-column">
            <p className="card-text ">&copy; Driving with Kristy 2024</p>
          </div>
          <div className=".flex-column">
            <a href="https://www.facebook.com/siuhinlam">
              <img
                src={fbIcon}
                className="footer-icons"
                alt="Facebook icon (by flaticon.com)"
                title="by flaticon.com"
              />
            </a>
            <a href="https://www.instagram.com/siuhinlam">
              <img
                src={igIcon}
                className="footer-icons"
                alt="Instagram icon (by flaticon.com)"
                title="by flaticon.com"
              />
            </a>
            <a href="https://wa.me/447784193627">
              <img
                src={waIcon}
                className="footer-icons"
                alt="Whatsapp icon (by flaticon.com)"
                title="by flaticon.com"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
