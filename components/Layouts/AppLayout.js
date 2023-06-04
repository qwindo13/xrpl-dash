import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import Footer from "../Footer/Footer";

function AppLayout({ children, showControlPanel }) {
    return (
        <>
            <main>
                <Header />
                {/* Banner testing 
                <div className="absolute top-0 w-full h-48 overflow-hidden">
                    <div
                        className="absolute w-full h-full bg-center bg-no-repeat bg-cover"
                        style={{ backgroundImage: `url('./images/banner-test.png')` }}
                    />
                    <div
                        className="absolute w-full h-full"
                        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(26, 25, 33, 0.1), rgba(26, 25, 33, 1))' }}
                    />
                </div>
                */}


                {showControlPanel && <ControlPanel />}
                {children}
                <Footer />
            </main>
        </>
    );
}

export default AppLayout;