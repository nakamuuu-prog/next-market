// layout.jsはアプリ全体で適用したいCSSスタイルなどを書き込むファイル
import "./globals.css";

const { default: Footer } = require("./components/footer");
const { default: Header } = require("./components/header");

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
