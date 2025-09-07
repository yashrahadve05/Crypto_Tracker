import { AppBar, Toolbar, Typography, Container, Select, MenuItem, createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContextProvider";


const Header = () => {
    const {currency, setCurrency} = CryptoState("INR");

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
            <div>
                <AppBar color="transparent" position="static">
                    <Container>
                        <Toolbar className="flex justify-between">
                            <h2
                                className="font-bold text-xl text-[#FFD700] cursor-pointer"
                                onClick={() => navigate("/")}
                            >Crypto Tracker</h2>
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
