function AuthLayout({ children, leftContent }) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-base-200 item-center justify-center p-12">
        <div className="max-w-md">{leftContent}</div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-base-100">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
