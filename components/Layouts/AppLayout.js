import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";

function AppLayout({ children }) {
    return (
        <>
            <main>
                <Header />
                <ControlPanel />
                {children}
            </main>
        </>
    );
}

export default AppLayout;