import React, { useState } from "react";

const DropdownInfo = ({ title, info }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="dropdown-info">
			<div className="dropdown-title" onClick={toggleDropdown}>
				<h3>{title}</h3>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
				>
					<path d="M6 15L12 9L18 15" stroke="#2C75E4" strokeWidth="2" />
				</svg>
			</div>
			{isOpen && (
				<div className="dropdown-content">
					<p>{info}</p>
				</div>
			)}
		</div>
	);
};

export default DropdownInfo;
