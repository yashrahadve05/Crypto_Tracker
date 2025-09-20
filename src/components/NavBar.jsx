'use client'
import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { createTheme, MenuItem, Select, ThemeProvider } from '@mui/material'
import { CryptoState } from "../context/CryptoContextProvider";
import NavLogo from "../assets/NavLogoPNG.png"
import { useNavigate } from 'react-router-dom'


const NavBar = () => {
    const { currency, setCurrency } = CryptoState("INR");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#fff",
            }
        }
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <header className="bg-white dark:bg-gray-900 fixed top-0 w-full h-20 z-50">
                <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
                    <div className="flex lg:flex-1">
                        <span className="-m-1.5 p-1.5">
                            <img className="cursor-pointer" onClick={() => navigate("/")} src={NavLogo} alt="Nav Logo" width={120} />
                        </span>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    {/* <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <span className="text-sm/6 font-semibold text-white">
                                Home
                            </span>
                        </Popover>
                        <Popover className="relative">
                            <span className="text-sm/6 font-semibold text-white">
                                News
                            </span>
                        </Popover>
                        <Popover className="relative">
                            <span className="text-sm/6 font-semibold text-white">
                                Exchanges
                            </span>
                        </Popover>
                        <Popover className="relative">
                            <span className="text-sm/6 font-semibold text-white">
                                About
                            </span>
                        </Popover>
                    </PopoverGroup> */}
                    <div className="hidden text-white border-white lg:flex lg:flex-1 lg:justify-end">
                        <Select
                            className='text-white'
                            id="demo-simple-select"
                            variant="outlined"
                            style={{
                                width: 100,
                                height: 40,
                                marginLeft: 15
                            }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"INR"}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"EUR"}>EUR</MenuItem>
                            <MenuItem value={"GBP"}>GBP</MenuItem>
                        </Select>
                    </div>
                </nav>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <img className="cursor-pointer" onClick={() => navigate("/")} src={NavLogo} alt="Nav Logo" width={100} />
                            </a>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                                <div className="space-y-2 py-6">
                                    {/* Mobile Navigation Items */}
                                    {/* <Popover className="relative">
                                        <span className="text-sm/6 font-semibold text-white">
                                            Home
                                        </span>
                                    </Popover>
                                    <Popover className="relative">
                                        <span className="text-sm/6 font-semibold text-white">
                                            News
                                        </span>
                                    </Popover>
                                    <Popover className="relative">
                                        <span className="text-sm/6 font-semibold text-white">
                                            Exchanges
                                        </span>
                                    </Popover>
                                    <Popover className="relative">
                                        <span className="text-sm/6 font-semibold text-white">
                                            About
                                        </span>
                                    </Popover> */}
                                </div>
                                <div className="py-6">
                                    <Select
                                        variant="outlined"
                                        style={{
                                            width: 100,
                                            height: 40,
                                            marginLeft: 15
                                        }}
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        <MenuItem value={"INR"}>INR</MenuItem>
                                        <MenuItem value={"USD"}>USD</MenuItem>
                                        <MenuItem value={"EUR"}>EUR</MenuItem>
                                        <MenuItem value={"GBP"}>GBP</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </ThemeProvider>
    )
}


export default NavBar;