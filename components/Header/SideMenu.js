import Button from "../UI/Button/Button";
import { Cookies } from 'react-cookie';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Modal from "../UI/Modal/Modal";

function SideMenu({ openModal, xrpAddress, truncateAddress, showModal, closeModal, className }) {
    return (
        <Modal showModal={showModal} closeModal={closeModal} className={className}>
            <div className="flex flex-col md:flex-row justify-between gap-16 ">
                <div className="w-full flex flex-row justify-between">
                    <Button onClick={openModal} className="!px-0 text-2xl bg-transparent font-semibold" disableAnimation>
                        <div className="rounded-full h-12 w-12 mr-4 bg-default-avatar" title={xrpAddress}></div>
                        <div className="flex flex-col text-left	">
                            <span className="text-lg font-semibold">Username123</span>
                            <span className="text-base font-semibold opacity-60">{truncateAddress(xrpAddress)}</span>
                        </div>
                    </Button>
                    <Button
                        onClick={() => {
                            const cookies = new Cookies()
                            cookies.remove('xrpAddress')
                            window.location.href = '/auth/login'
                        }}>
                        <LogoutRoundedIcon />
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default SideMenu;