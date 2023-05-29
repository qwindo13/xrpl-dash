import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import Footer from "../Footer/Footer";

function AppLayout({ children, showControlPanel }) {
    return (
        <>
            <main>
                <Header />
                {showControlPanel && <ControlPanel />}
                {children}
                <Footer />
            </main>
        </>
    );
}

export default AppLayout;