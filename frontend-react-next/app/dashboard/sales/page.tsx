"use client";

import React from "react";

function doSubmit() {
	fetch("127.0.0.1:3001/api/auth/refreshToken", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});
}

const page = () => {
	return <div onClick={doSubmit}>hello world</div>;
};

export default page;
