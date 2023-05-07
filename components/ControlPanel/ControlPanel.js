import SearchBar from "../UI/SearchBar/SearchBar";
import Button from "../UI/Button/Button";
import Dropdown from "../UI/Dropdown/Dropdown";
import Tabs from "../UI/Tabs/Tabs";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function ControlPanel() {
    const tabOptions = [
        {
            label:
                <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.16667 13.72C8.76944 13.72 8.42952 13.5787 8.14689 13.2961C7.86378 13.0129 7.72222 12.6728 7.72222 12.2756V2.16445C7.72222 1.76722 7.86378 1.42706 8.14689 1.14395C8.42952 0.861316 8.76944 0.720001 9.16667 0.720001H12.0556C12.4528 0.720001 12.7929 0.861316 13.0761 1.14395C13.3587 1.42706 13.5 1.76722 13.5 2.16445V12.2756C13.5 12.6728 13.3587 13.0129 13.0761 13.2961C12.7929 13.5787 12.4528 13.72 12.0556 13.72H9.16667ZM1.94444 13.72C1.54722 13.72 1.20706 13.5787 0.923944 13.2961C0.641315 13.0129 0.5 12.6728 0.5 12.2756V2.16445C0.5 1.76722 0.641315 1.42706 0.923944 1.14395C1.20706 0.861316 1.54722 0.720001 1.94444 0.720001H4.83333C5.23056 0.720001 5.57072 0.861316 5.85383 1.14395C6.13646 1.42706 6.27778 1.76722 6.27778 2.16445V12.2756C6.27778 12.6728 6.13646 13.0129 5.85383 13.2961C5.57072 13.5787 5.23056 13.72 4.83333 13.72H1.94444Z" fill="white" />
                </svg>
            , value: '1'
        },
        {
            label: <svg width="20" height="20" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.36667 13.72C1.12111 13.72 0.915422 13.6309 0.7496 13.4526C0.5832 13.2749 0.5 13.0545 0.5 12.7914V1.64857C0.5 1.38548 0.5832 1.16479 0.7496 0.986501C0.915422 0.808835 1.12111 0.720001 1.36667 0.720001H4.24833C4.49389 0.720001 4.69987 0.808835 4.86627 0.986501C5.03209 1.16479 5.115 1.38548 5.115 1.64857V12.7914C5.115 13.0545 5.03209 13.2749 4.86627 13.4526C4.69987 13.6309 4.49389 13.72 4.24833 13.72H1.36667ZM6.84833 13.72C6.60278 13.72 6.39709 13.6309 6.23127 13.4526C6.06487 13.2749 5.98167 13.0545 5.98167 12.7914V1.64857C5.98167 1.38548 6.06487 1.16479 6.23127 0.986501C6.39709 0.808835 6.60278 0.720001 6.84833 0.720001H9.73C9.97556 0.720001 10.1815 0.808835 10.3479 0.986501C10.5138 1.16479 10.5967 1.38548 10.5967 1.64857V12.7914C10.5967 13.0545 10.5138 13.2749 10.3479 13.4526C10.1815 13.6309 9.97556 13.72 9.73 13.72H6.84833ZM12.33 13.72C12.0844 13.72 11.8788 13.6309 11.7129 13.4526C11.5465 13.2749 11.4633 13.0545 11.4633 12.7914V1.64857C11.4633 1.38548 11.5465 1.16479 11.7129 0.986501C11.8788 0.808835 12.0844 0.720001 12.33 0.720001H15.2117C15.4572 0.720001 15.6632 0.808835 15.8296 0.986501C15.9954 1.16479 16.0783 1.38548 16.0783 1.64857V12.7914C16.0783 13.0545 15.9954 13.2749 15.8296 13.4526C15.6632 13.6309 15.4572 13.72 15.2117 13.72H12.33Z" fill="white" />
            </svg>
            , value: '2'
        },
    ];

    return (
        <div className="w-full flex flex-col md:flex-row gap-4 md:items-center md:h-12">
            <div className="relative pr-4">
                <div className="text-xs absolute -top-2 font-light">Choose Dash:</div>
                <Dropdown trigger={
                    <Button className="!px-0 text-2xl bg-transparent" disableAnimation endIcon={<KeyboardArrowDownRoundedIcon />}>Explore</Button>
                }>
                    <p>Dropdown item 1</p>
                    <p>Dropdown item 2</p>
                    <p>Dropdown item 3</p>
                </Dropdown>
            </div>
            <div className="flex flex-row w-full h-12 gap-4 items-center">
                <Tabs className="bg-[#21212A] h-full px-1 hidden md:flex" options={tabOptions} />
                <SearchBar className="h-full" placeholder={"Search for modules, tokens, etc..."} />
                <Dropdown className="aspect-square" position="right" trigger={
                    <Button className="h-full aspect-square	p-0 items-center flex flex-col !rounded-2xl">
                        <AddRoundedIcon />
                    </Button>
                }>
                    <p>Test 1</p> 
                </Dropdown>
            </div>
        </div>
    );
};