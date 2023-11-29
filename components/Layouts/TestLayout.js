import Header from "../Header/Header";
import ControlPanel from "../ControlPanel/ControlPanel";
import Feed from "../Modules/Feeds/Feed/Feed";
import Footer from "../Footer/Footer";

import mockFeed from "@/data/mockFeedcomponents";

function TestLayout({ children, showControlPanel, customLayout,refreshCustomLayouts }) {
    return (
        <>
            <Header />
            <div className="flex flex-row">
            <main className="w-2/3 m-0">

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


                {showControlPanel && <ControlPanel customLayout={customLayout} refreshCustomLayouts={refreshCustomLayouts} />}
                {children}
                <Footer />
            </main>
            <div className="w-1/3 absolute top-0 right-0 bg-[#21212A] h-screen overflow-scroll"></div>
            <div className="w-1/3 bg-[#21212A] ">
                <Feed data={mockFeed}/>
            </div>
            </div>
        </>
    );
}

export default TestLayout;