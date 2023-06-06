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
                <div className="w-full flex flex-col lg:flex-row gap-16">
                    <nav className="w-64 lg:min-h-screen flex flex-row lg:flex-col gap-8 ">
                        <ul className="flex  flex-row lg:flex-col gap-4">
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
                    <div className="flex-grow">
                        {children}
                    </div>
                    <div className="w-64">
                        <div className="w-full bg-white rounded-2xl p-4">
                            <h2 className="text-2xl font-semibold text-black">Become Premium</h2>
                            <h2 className="text-2xl font-semibold text-black">Call to action</h2>
        
                        </div>
                    </div>

                </div>
            </AppLayout>
        </>
    );
}

export default SettingsLayout;
