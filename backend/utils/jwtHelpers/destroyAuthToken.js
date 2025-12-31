const clearAuthCookie = (res) => {
  const cookieOptions = {
    httpOnly: true,            // Prevents client-side JS access
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 0,                 // Immediately expires the cookie
  };

  res.cookie("jwt", "", cookieOptions);
};

export default clearAuthCookie;
