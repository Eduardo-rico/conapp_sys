import React from 'react';
import { Nav, NavbarContainer, NavLogo } from './NavbarElements';

const NavBar = () => {
	return (
		<>
			<Nav className="bg-gray-800">
				<NavbarContainer>
					<NavLogo>conapp</NavLogo>
				</NavbarContainer>
			</Nav>
		</>
	);
};

export default NavBar;
