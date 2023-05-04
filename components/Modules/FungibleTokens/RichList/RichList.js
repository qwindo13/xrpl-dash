import Image from 'next/image';
import { useState } from 'react';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import SearchBarSwitch from '@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';

const columns = [
    { label: 'Rank', sortKey: 'rank', width: 'w-1/12' },
    { label: 'Address', sortKey: 'address', width: 'w-4/12' },
    { label: 'Amount', sortKey: 'amount', width: 'w-3/12' },
    { label: 'Change (24h)', sortKey: 'change', width: 'w-2/12' },
    { label: 'Percentage (%)', sortKey: 'percentage', width: 'w-2/12' },
];
const testData = [
    { rank: 1, address: 'rNXhU52ybru7GyhU4duZSrxNGwD2vE7Z9H', amount: 303944484806, change: 20, percentage: 35.24 },
    { rank: 2, address: 'r3RaNVLvWjqqtFAawC6jbRhgKyFH7HvRS8', amount: 192467432254, change: -10, percentage: 22.31 },
    { rank: 3, address: 'rLfP4UznJ65hYTKXjSj2UQQxWDmxmRdbL', amount: 20519920936, change: 50, percentage: 2.3 },
    { rank: 4, address: 'rLfP4UznJ65hYTKXjSj2UQQxWDmxmRdbL', amount: 20519920936, change: 50, percentage: 2.3 },
    { rank: 5, address: 'rLfP4UznJ65hYTKXjSj2UQQxWDmxmRdbL', amount: 20519920936, change: 50, percentage: 2.3 },
    { rank: 6, address: 'rLfP4UznJ65hYTKXjSj2UQQxWDmxmRdbL', amount: 20519920936, change: 50, percentage: 2.3 },
];
const RichList = ({ disableTitle }) => {

    const [data, setData] = useState(testData);
    const [sortConfig, setSortConfig] = useState(null);
    const renderSortingIcon = (key) => {
        if (!sortConfig || sortConfig.key !== key) {
            return;
        }

        const iconRotation = sortConfig.direction === 'descending' ? '0' : '180';

        return (
            <svg
                width="7"
                height="5"
                viewBox="0 0 7 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${iconRotation}deg)` }}
            >
                <path
                    d="M3.58808 0.833414L5.75475 3.00008C6.01864 3.26397 6.07753 3.56591 5.93142 3.90591C5.78586 4.24647 5.52558 4.41675 5.15058 4.41675L0.858917 4.41675C0.483917 4.41675 0.223639 4.24647 0.078084 3.90591C-0.0680275 3.56591 -0.00913858 3.26397 0.25475 3.00008L2.42142 0.833414C2.50475 0.750081 2.59503 0.687582 2.69225 0.645915C2.78947 0.604248 2.89364 0.583414 3.00475 0.583414C3.11586 0.583414 3.22003 0.604248 3.31725 0.645915C3.41447 0.687582 3.50475 0.750081 3.58808 0.833414Z"
                    fill="#fff"
                    fillOpacity="1"
                />
            </svg>
        );
    };
    const sortBy = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
                if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
                return 0;
            });
        });
    };


    return (
        <ModuleCard
            title="Richlist - HOUND"
            settings={
                <>
                    <TitleSwitch />
                    <SearchBarSwitch />
                </>
            }

        >
            <div className="w-full">
                <div className="flex flex-row justify-between pb-4 border-b border-opacity-5 border-white">
                    {columns.map((column) => {
                        const isActive = sortConfig && sortConfig.key === column.sortKey;
                        return (
                            <div
                                key={column.sortKey}
                                className={`cursor-pointer text-left text-xs font-semibold flex flex-row items-center gap-2 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-60'
                                    } ${column.width}`}
                                onClick={() => sortBy(column.sortKey)}
                            >
                                {column.label}
                                {isActive && renderSortingIcon(column.sortKey)}
                            </div>
                        );
                    })}
                </div>
                <div className='flex flex-col gap-2 pt-4'>
                    {data.map((item) => (
                        <div key={item.rank} className="flex flex-row justify-between">
                            <div className="text-left w-1/12">{item.rank}</div>
                            <div className="text-left w-4/12 truncate pr-4">{item.address}</div>
                            <div className="text-left w-3/12 truncate">{item.amount}</div>
                            <div className="text-left w-2/12">{item.change}</div>
                            <div className="text-left w-2/12">{item.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>

        </ModuleCard>
    );
};

export default RichList;
