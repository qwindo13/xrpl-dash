import Image from 'next/image';
import { useState } from 'react';
import ModuleCard from '@/components/UI/ModuleCard/ModuleCardcomponents';
import SearchBarSwitch from '@/components/UI/ModuleCard/Settings/SearchBarSwitchcomponents';
import TitleSwitch from '@/components/UI/ModuleCard/Settings/TitleSwitchcomponents';
import TokenDropdown from '@/components/UI/ModuleCard/Settings/TokenDropdowncomponents';
import SearchBar from '@/components/UI/SearchBar/SearchBarcomponents';
import FeedItem from './FeedItem';

const defaultSettings = {
    displayTitle: true,
    displaySearchBar: true,
};

const Feed = ({ data,onClickRemove, onClickStatic, isPinned=false}) => {
    const [moduleSettings, setModuleSettings] = useState(defaultSettings);
    const updateSettings = (key, value) => {
        setModuleSettings((prevSettings) => ({
            ...prevSettings,
            [key]: value,
        }));
    };
    const [searchValue, setSearchValue] = useState('');

    return (
        <ModuleCard
            onClickRemove={onClickRemove}
            onClickStatic={onClickStatic}
            isPinned={isPinned}
            title="Feed"
            settings={
                <>
                    <TitleSwitch
                        value={moduleSettings.displayTitle}
                        onChange={(value) => updateSettings("displayTitle", value)}
                    />
                    <SearchBarSwitch
                        value={moduleSettings.displaySearchBar}
                        onChange={(value) => updateSettings("displaySearchBar", value)}
                    />
                    <TokenDropdown />
                </>
            }
            disableTitle={!moduleSettings.displayTitle}
        >

            <div className="w-full flex flex-col gap-8">

                {moduleSettings.displaySearchBar && (
                    <SearchBar
                        className="!bg-[#1A1A22] rounded-xl"
                        placeholder={'Search'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                )}
                <div className='flex flex-col gap-4'>
                    {data.map(item =>
                        <FeedItem
                            key={item.id}
                            type={item.type}
                            subtype={item.subtype}
                            href={item.href}
                            user={item.user}
                            content={item.content} 
                            time={item.time}
                        />
                    )}
                </div>
            </div>

        </ModuleCard>
    );
};

export default Feed;
