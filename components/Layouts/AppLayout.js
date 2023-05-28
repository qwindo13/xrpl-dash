import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";

function AppLayout({ children, showControlPanel }) {
    return (
        <>
            <main>
                <Header />
                {showControlPanel && <ControlPanel />}
                {children}
            </main>
        </>
    );
}

export default AppLayout;