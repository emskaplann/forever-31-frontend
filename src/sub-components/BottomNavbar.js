import React from "react";
import {Navbar} from "react-bootstrap";
import NavbarLinks from "./NavbarLinks.js";

export default function BottomNavbar() {
    return(
        <Navbar bg="light" sticky='bottom'>
          <NavbarLinks />
        </Navbar>
    )
}