import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";

function AppLayout({ children, setCols }) {
    return (
        <>
            <main>
                <Header />
                <ControlPanel setCols={setCols} />
                {children}
            </main>
        </>
    );
}

export default AppLayout;