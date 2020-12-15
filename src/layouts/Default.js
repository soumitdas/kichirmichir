import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FullLoading from "../components/FullLoading";

const DefaultLayout = ({ children }) => {
  const auth = useAuth();

  if (auth.user === null) {
    return <FullLoading />;
  }

  return (
    <>
      <div className="wrapper">
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
