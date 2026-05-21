import React from "react";

export function Button({ className = "", variant = "default", asChild = false, children, ...props }) {
  const base = "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50";

  const variants = {
    default: "bg-[#051525] text-[#F5F2EC] hover:bg-[#0D2645]",
    outline: "border border-[#B8922A] text-[#051525] hover:bg-[#F0E8D5]",
    secondary: "bg-[#B8922A] text-[#051525] hover:bg-[#9A7A20]",
    ghost: "text-[#051525] hover:bg-[#EDE8DF]",
  };

  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${base} ${variants[variant] || ""} ${className} ${child.props.className || ""}`.trim(),
      ...props,
    });
  }

  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
