import Link from "next/link";
import { useRouter } from 'next/router'
import AppLayout from "./AppLayout";
import Button from "../UI/Button/Button";

function SettingsLayout({ children }) {
    const { asPath } = useRouter()
    return (
        <>
            <AppLayout>
                <div className="flex flex-start">
                    <h2 className="text-4xl font-semibold">Settings</h2>
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-16 relative h-full">

                    {/* SIDEMENU */}
                    <nav className="w-64 lg:min-h-screen flex flex-row lg:flex-col gap-8  ">
                        <ul className="flex  flex-row lg:flex-col gap-4 sticky top-[134px]">
                            {[
                                { name: 'Profile', path: '/settings/profile' },
                                { name: 'Alerts', path: '/settings/alerts' },
                                { name: 'Wallet', path: '/settings/wallet' },
                            ].map(({ name, path }) => (
                                <li key={path}>
                                    <Link href={path}>
                                        <span
                                            className={`text-2xl font-semibold ${asPath === path ? 'opacity-100' : 'opacity-40'
                                                }`}
                                        >
                                            {name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* CONTENT */}
                    <div className="flex-grow">
                        {children}
                    </div>

                    {/* CALL TO ACTION */}
                    <div className="w-64">
                        <div className="w-full bg-[#21212A] rounded-2xl p-4 sticky top-[134px]">
                            <h2 className="text-2xl font-semibold mb-4">Upgrade to Premium</h2>
                            <p className="mb-6 opacity-60">Experience the full power of XRPLDash with the premium version. Unlock all features now!</p>
                            <Button className="bg-white !text-[#1A1921]">Upgrade Now</Button>
                        </div>
                    </div>

                </div>
            </AppLayout>
        </>
    );
}

export default SettingsLayout;
