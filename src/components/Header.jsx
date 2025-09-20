import { AppBar, Toolbar, Container, Select, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";
import NavLogo from "../assets/NavLogoPNG.png"


const Header = () => {
    const { currency, setCurrency } = CryptoState("INR");

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
            <div >
                <AppBar color="transparent" position="static">
                    <Container className="max-sm:p-3 max-md:p-4">
                        <Toolbar className="flex justify-between !p-0">
                            <div>
                                {/* <h2
                                    className="font-bold text-xl text-[#FFD700] cursor-pointer"
                                    onClick={() => navigate("/")}
                                >Crypto Tracker</h2> */}
                                <img className="cursor-pointer" onClick={() => navigate("/")} src={NavLogo} alt="Nav Logo" width={100} />
                            </div>

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
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        </ThemeProvider>
    );
};

export default Header;
